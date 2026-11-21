# 01 — Monorepo setup

Status: not started

## Goal

Create the **pnpm workspace + Turborepo** skeleton so apps and packages can live in one repo with shared scripts and caching.

At the end of this step you should have empty (or stub) workspace packages and be able to run `pnpm install` successfully.

## Why this decision

| Choice | Why |
|--------|-----|
| **Monorepo** | Web, mobile, API, and shared domain must evolve together with one PR and shared types |
| **pnpm** | Strict `node_modules`, fast installs, first-class workspaces — less “phantom dependency” drift than npm |
| **Turborepo** | Thin task runner with cache; enough for this teaching repo without Nx generators |
| **`apps/` + `packages/`** | Clear deployable edges vs reusable libraries — easy interview story |

WHY not a single app folder: Capacitor + Next + Hono as one project muddies boundaries and makes DIP harder to see.

## Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| Nx | More concepts/generators than we need for a learning blueprint |
| npm/yarn workspaces | Workable; pnpm’s isolation fits teaching “explicit deps” better |
| Polyrepo (many git repos) | Worse for shared contracts and beginner navigation |
| No Turborepo (raw pnpm `-r`) | Fine at tiny scale; Turborepo pays off once `build`/`test` graph appears |

## Prerequisites

- Node.js LTS installed (**verify** current LTS; pin in README when chosen)
- Ability to enable pnpm (`corepack enable` or `npm i -g pnpm`)
- ADRs: prefer accepting [0001-monorepo-tooling](../../tech-space/decisions/0001-monorepo-tooling.md) and deciding package scope in [0003](../../tech-space/decisions/0003-package-scope-and-boundaries.md)

## Commands

```bash
# From repo root (Windows PowerShell or Unix)

# Enable pnpm via Corepack (preferred when available)
corepack enable
corepack prepare pnpm@latest --activate

# Verify
node -v
pnpm -v

# Initialize workspace root package.json if missing
pnpm init

# Add Turborepo as a dev dependency at the root
pnpm add -Dw turbo

# Create folder structure (PowerShell)
New-Item -ItemType Directory -Force -Path apps/web, apps/mobile, apps/api,
  packages/domain, packages/application, packages/contracts, packages/db,
  packages/ui, packages/config, packages/test-kit, tooling | Out-Null

# Or bash:
# mkdir -p apps/{web,mobile,api} packages/{domain,application,contracts,db,ui,config,test-kit} tooling
```

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "tooling/*"
```

Create root `turbo.json` (minimal):

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "lint": {},
    "test": { "dependsOn": ["^build"] },
    "typecheck": { "dependsOn": ["^build"] }
  }
}
```

Add root scripts in `package.json` (example):

```json
{
  "name": "full-stack-architecture-blueprint",
  "private": true,
  "packageManager": "pnpm@9.15.0",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "typecheck": "turbo run typecheck"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

**Needs verification:** exact `pnpm` and `turbo` major versions at implementation time — pin what you install; do not invent compatibility.

Then:

```bash
pnpm install
```

Optional stub package (repeat pattern later in step 02/03):

```bash
cd packages/domain
pnpm init
# set "name": "@fsab/domain" (or agreed scope)
cd ../..
pnpm install
```

## What to create

| Path | Purpose |
|------|---------|
| `package.json` | Root scripts + `private: true` + `packageManager` |
| `pnpm-workspace.yaml` | Workspace globs |
| `turbo.json` | Task pipeline |
| `apps/*`, `packages/*`, `tooling/` | Empty directories or stub `package.json` files |
| Update root `README.md` | Real install commands once versions are pinned |

Keep `Docs/` as-is. Do **not** scaffold Next/Hono/Capacitor yet.

## Good practice

- Root package is `private: true`
- Pin `packageManager` field for Corepack
- One lockfile (`pnpm-lock.yaml`) committed
- Empty apps are OK; do not fake full frameworks in this step

## Bad / worst practice

- Installing every framework in step 01 “to save time”
- Using `npm install` inside a pnpm workspace
- Making packages depend on `apps/*`
- Skipping the workspace file and hoping nested folders “just work”

## Acceptance criteria

- [ ] `pnpm-workspace.yaml` lists `apps/*`, `packages/*`, `tooling/*`
- [ ] `pnpm install` completes at repo root
- [ ] `turbo` is available via `pnpm exec turbo --version` (or `pnpm turbo`)
- [ ] Directory tree matches the blueprint apps/packages layout
- [ ] No application business logic yet

## Agent prompt

```text
Implement Docs/walkthrough/01-monorepo-setup only.
Create pnpm workspace + Turborepo skeleton and empty apps/packages folders.
Do not scaffold Next.js, Hono, or Capacitor yet.
Follow the step README commands and acceptance criteria.
Pin real versions you install; do not invent compatibility claims.
```

## Next step

[02 — TypeScript tooling](../02-typescript-tooling/README.md)

## Related

- [../../tech-space/monorepo-structure.md](../../tech-space/monorepo-structure.md)
- [../../tech-space/tooling.md](../../tech-space/tooling.md)

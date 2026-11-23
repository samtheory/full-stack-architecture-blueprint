# 01 — Monorepo setup

Status: done

## Goal

Create the **pnpm workspace + Turborepo** skeleton for the marketplace monorepo.

At the end of this step you can run `pnpm install` at the repo root, and you have empty placeholders for:

- `apps/market-place-app` — React frontend (you scaffold in the next step)
- `clouds/market-place-server` — Hono backend (you scaffold after that)
- `packages/*` — shared libraries (contracts, UI, etc. later)

Do **not** scaffold React or Hono in this step.

## Why this decision

| Choice | Why |
|--------|-----|
| **Monorepo** | App, server, and shared packages change together with one PR and shared types |
| **pnpm** | Strict `node_modules`, fast installs, first-class workspaces |
| **Turborepo** | Simple cached task runner (`dev` / `build` / `test` / `lint`) |
| **`apps/`** | Client deployables (React storefront you will host as a frontend) |
| **`clouds/`** | Server deployables (Hono API you will host separately in the cloud) |
| **`packages/`** | Shared libraries — never depend on apps or clouds |

WHY not put Hono under `apps/`: you asked to separate **frontend apps** from **cloud servers** so deploy targets stay obvious.

## Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| Nx | More generators/concepts than needed to start |
| npm/yarn workspaces | Workable; pnpm isolation fits “explicit deps” better |
| Polyrepo | Worse for shared contracts while learning |
| `apps/api` for Hono | Conflicts with `apps` = clients, `clouds` = servers |

## Prerequisites

- Node.js installed (this repo was set up with Node v25.x; LTS is also fine)
- pnpm available (`corepack enable` then `corepack prepare pnpm@10.27.0 --activate`, or install pnpm another way)
- Read [Docs/thinking/marketplace-fa-en-architecture.md](../../thinking/marketplace-fa-en-architecture.md) for product direction (optional but useful)

## Commands

Run from the **repo root** (PowerShell or bash).

### 1. Enable pnpm

```bash
corepack enable
corepack prepare pnpm@10.27.0 --activate

node -v
pnpm -v
```

### 2. Create root `package.json`

```json
{
  "name": "full-stack-architecture-blueprint",
  "private": true,
  "packageManager": "pnpm@10.27.0",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "typecheck": "turbo run typecheck"
  },
  "devDependencies": {
    "turbo": "^2.6.1"
  }
}
```

Or initialize and add turbo:

```bash
pnpm init
pnpm add -Dw turbo
```

Then edit `package.json` so it is `private: true`, has `packageManager`, and the scripts above.

### 3. Create `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "clouds/*"
  - "packages/*"
```

### 4. Create `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    }
  }
}
```

### 5. Create folder placeholders

**PowerShell:**

```powershell
New-Item -ItemType Directory -Force -Path `
  apps/market-place-app, `
  clouds/market-place-server, `
  packages | Out-Null

# Keep empty dirs in git
New-Item -ItemType File -Force -Path `
  apps/market-place-app/.gitkeep, `
  clouds/market-place-server/.gitkeep, `
  packages/.gitkeep | Out-Null
```

**bash:**

```bash
mkdir -p apps/market-place-app clouds/market-place-server packages
touch apps/market-place-app/.gitkeep clouds/market-place-server/.gitkeep packages/.gitkeep
```

### 6. Install

```bash
pnpm install
pnpm exec turbo --version
```

## Target tree after this step

```text
.
├── apps/
│   └── market-place-app/     # empty placeholder (.gitkeep)
├── clouds/
│   └── market-place-server/  # empty placeholder (.gitkeep)
├── packages/                 # empty for now (.gitkeep)
├── Docs/
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── turbo.json
```

## What to create

| Path | Purpose |
|------|---------|
| `package.json` | Root scripts, `private: true`, `packageManager` |
| `pnpm-workspace.yaml` | Workspace globs for apps / clouds / packages |
| `turbo.json` | Task pipeline |
| `pnpm-lock.yaml` | Lockfile (created by `pnpm install`) |
| `apps/market-place-app/` | Placeholder for React app |
| `clouds/market-place-server/` | Placeholder for Hono server |
| `packages/` | Placeholder for shared packages |

## Good practice

- Root package is `private: true`
- Pin `packageManager` for Corepack
- Commit `pnpm-lock.yaml`
- Empty deployable folders are OK in step 01

## Bad / worst practice

- Scaffolding Vite/Hono/Next in this step “to save time”
- Using `npm install` inside a pnpm workspace
- Letting packages import from `apps/*` or `clouds/*`
- Putting both React and Hono under `apps/` if you want separate cloud deploy stories

## Acceptance criteria

- [x] `pnpm-workspace.yaml` lists `apps/*`, `clouds/*`, `packages/*`
- [x] `pnpm install` completes at repo root
- [x] `pnpm exec turbo --version` works
- [x] `apps/market-place-app` and `clouds/market-place-server` exist (placeholders)
- [x] No React or Hono app code yet

## Agent prompt

```text
Implement Docs/walkthrough/01-monorepo-setup only.
Create pnpm workspace + Turborepo skeleton with apps/, clouds/, packages/.
Placeholders: apps/market-place-app, clouds/market-place-server.
Do not scaffold React or Hono yet.
Pin real versions you install.
```

## Next step

[react-app-setup](../react-app-setup/README.md) — scaffold `apps/market-place-app` yourself.

## Related

- [../../thinking/marketplace-fa-en-architecture.md](../../thinking/marketplace-fa-en-architecture.md)
- [../../tech-space/tooling.md](../../tech-space/tooling.md)
- [../../knowledge/architecture-styles/monorepo.md](../../knowledge/architecture-styles/monorepo.md)

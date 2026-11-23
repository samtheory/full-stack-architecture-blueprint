# Package setup — shared `packages/*`

Status: not started (you do this manually)

## Goal

Add the first **shared packages** so `apps/market-place-app` and `clouds/market-place-server` can share types, validation, and (later) UI without copying code.

Start small. Do not create every package from the thinking doc on day one.

## Recommended first packages

| Package | Name | Purpose | Create now? |
|---------|------|---------|-------------|
| `packages/contracts` | `@marketplace/contracts` | Zod schemas / DTOs shared by app + server | **Yes — first** |
| `packages/config` | `@marketplace/config` | Env parsing helpers | Optional second |
| `packages/ui` | `@marketplace/ui` | Design-system primitives | After you have 2+ screens |
| `packages/i18n` | `@marketplace/i18n` | `fa` / `en` messages | When you start localization |
| `packages/domain` | `@marketplace/domain` | Pure business rules | When order/payment rules appear |
| `packages/tsconfig` | `@marketplace/tsconfig` | Shared TS base config | When configs start drifting |

## Why this decision

| Choice | Why |
|--------|-----|
| **Contracts first** | One Zod schema for request/response keeps React forms and Hono routes aligned |
| **Thin packages** | Avoid a god `@marketplace/common` |
| **Apps/clouds depend on packages** | Packages never depend on apps or clouds |

## Dependency direction

```text
apps/market-place-app ──► packages/*
clouds/market-place-server ──► packages/*
packages/* ──✕──► apps/* or clouds/*
```

## Prerequisites

- [01 — Monorepo setup](../01-monorepo-setup/README.md) done
- Ideally React + Hono packages already exist so you can wire a real import

## Commands — create `@marketplace/contracts`

### 1. Scaffold folder

**PowerShell:**

```powershell
New-Item -ItemType Directory -Force -Path packages/contracts/src | Out-Null
```

**bash:**

```bash
mkdir -p packages/contracts/src
```

### 2. `packages/contracts/package.json`

```json
{
  "name": "@marketplace/contracts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "typescript": "^5.7.0"
  }
}
```

Pin whatever Zod major you actually install. If you use TypeScript project references or `tsup` later, change `exports` to built `dist` — for early DX, exporting `.ts` via Vite/tsx is fine **if** both app and server can consume TS source (verify).

### 3. Minimal files

`packages/contracts/src/health.ts`:

```ts
import { z } from "zod";

export const healthResponseSchema = z.object({
  ok: z.literal(true),
  service: z.string(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
```

`packages/contracts/src/index.ts`:

```ts
export * from "./health.js";
```

(If your tooling prefers extensionless imports, use `"./health"` — stay consistent per package.)

`packages/contracts/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

### 4. Install and link

```bash
pnpm install
```

### 5. Depend from app and server

```bash
pnpm --filter @marketplace/market-place-app add @marketplace/contracts
pnpm --filter @marketplace/market-place-server add @marketplace/contracts
```

In a pnpm workspace this links the local package (no publish needed).

### 6. Use it

**Server** (validate outgoing or document the shape):

```ts
import { healthResponseSchema } from "@marketplace/contracts";

app.get("/health", (c) => {
  const body = healthResponseSchema.parse({
    ok: true,
    service: "market-place-server",
  });
  return c.json(body);
});
```

**App** (parse the response):

```ts
import { healthResponseSchema } from "@marketplace/contracts";

const data = healthResponseSchema.parse(await res.json());
```

## Optional — shared tsconfig package

```text
packages/tsconfig/
  package.json          # name: @marketplace/tsconfig
  base.json
```

Then apps extend:

```json
{
  "extends": "@marketplace/tsconfig/base.json"
}
```

Do this when you are tired of copying `compilerOptions`.

## What to create (this step)

| Path | Purpose |
|------|---------|
| `packages/contracts/` | First shared package |
| Workspace dependency edges | app + server → contracts |

## Good practice

- One package ≈ one reason to change
- Public exports only (`src/index.ts`) — no deep imports into internals from apps
- Zod at boundaries; domain packages stay pure later
- Prefer `@marketplace/contracts` over dumping types into the React app

## Bad / worst practice

- `packages/utils` that imports everything and is imported by everything
- Packages importing from `apps/` or `clouds/`
- Duplicating the same DTO in React and Hono “temporarily”
- Creating `ui`, `domain`, `i18n`, `db` all empty on day one with no consumer

## Acceptance criteria

- [ ] `packages/contracts` exists with name `@marketplace/contracts`
- [ ] `pnpm install` links it into the workspace
- [ ] At least one of app or server imports and uses a schema
- [ ] No package imports from `apps/*` or `clouds/*`

## Agent prompt

```text
Do not create every marketplace package at once.
Follow Docs/walkthrough/package-setup — start with @marketplace/contracts only unless I ask for more.
```

## Next step

Return to product work: listing/health flows, then grow packages (`ui`, `i18n`, `domain`) as real needs appear. See [marketplace thinking doc](../../thinking/marketplace-fa-en-architecture.md) §3 and §7.

## Related

- [01-monorepo-setup](../01-monorepo-setup/README.md)
- [react-app-setup](../react-app-setup/README.md)
- [hono-server-setup](../hono-server-setup/README.md)
- [../../knowledge/architecture-styles/monorepo.md](../../knowledge/architecture-styles/monorepo.md)
- [../../knowledge/architecture-styles/architecture-rules.md](../../knowledge/architecture-styles/architecture-rules.md)

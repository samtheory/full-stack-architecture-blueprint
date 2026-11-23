# React app setup — `apps/market-place-app`

Status: not started (you do this manually)

## Goal

Scaffold a **React** app inside the monorepo at `apps/market-place-app` so you can call the future Hono API and verify the workspace wiring.

Prefer a simple Vite + React + TypeScript app for this testing client. You can migrate to Next.js later for SEO/i18n if you want (see [marketplace thinking doc](../../thinking/marketplace-fa-en-architecture.md)).

## Why this decision

| Choice | Why |
|--------|-----|
| **`apps/market-place-app`** | Client lives under `apps/` — separate from cloud servers |
| **Vite + React + TS** | Fast local setup for testing the API; low ceremony |
| **Workspace package** | Becomes a real pnpm workspace member with its own `package.json` |
| **Manual scaffold** | You learn the install path; walkthrough stays accurate |

## Alternatives considered

| Alternative | When to choose it instead |
|-------------|---------------------------|
| Next.js App Router | SEO, RSC, locale routing (`fa`/`en`) from day one |
| CRA | Avoid — unmaintained |
| Put React under `clouds/` | No — clients belong in `apps/` |

## Prerequisites

- [01 — Monorepo setup](../01-monorepo-setup/README.md) done (`pnpm install` works at root)
- Empty folder `apps/market-place-app` exists (may only contain `.gitkeep`)

## Commands

Run from the **repo root**.

### 1. Clear the placeholder (optional)

If `.gitkeep` is the only file:

**PowerShell:**

```powershell
Remove-Item -Force apps/market-place-app/.gitkeep -ErrorAction SilentlyContinue
```

**bash:**

```bash
rm -f apps/market-place-app/.gitkeep
```

### 2. Scaffold with Vite (recommended)

pnpm can create the app **in place**. From repo root:

```bash
pnpm create vite@latest apps/market-place-app --template react-ts
```

If the tool complains the directory is not empty, scaffold into a temp name then move files, or remove `.gitkeep` first and retry.

### 3. Set the package name

Edit `apps/market-place-app/package.json`:

```json
{
  "name": "@marketplace/market-place-app",
  "private": true
}
```

Keep the Vite scripts (`dev`, `build`, `preview`). Add if missing:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "typecheck": "tsc -b --pretty false"
  }
}
```

Exact lint/typecheck scripts may differ by Vite template — adjust to what the scaffold generated.

### 4. Install workspace deps

```bash
pnpm install
```

### 5. Run the app

```bash
pnpm --filter @marketplace/market-place-app dev
```

Or from root once other packages exist:

```bash
pnpm dev
```

(`turbo run dev` will start every workspace package that defines `dev`.)

### 6. Smoke check against the future API

Later, when `clouds/market-place-server` is running (e.g. `http://localhost:3000`), call it from React with `fetch` or a small client. For now, seeing the Vite welcome page is enough.

Example later (do not require this yet):

```ts
const res = await fetch("http://localhost:3000/health");
const data = await res.json();
```

You will need CORS on the Hono side when you get there.

## What to create

| Path | Purpose |
|------|---------|
| `apps/market-place-app/package.json` | Workspace member `@marketplace/market-place-app` |
| `apps/market-place-app/src/` | React entry + pages |
| `apps/market-place-app/vite.config.ts` | Vite config |
| `apps/market-place-app/index.html` | Vite HTML shell |

## Good practice

- Package `name` uses a scope (`@marketplace/...`) and stays `private: true`
- App depends only on `packages/*` later — never on `clouds/*` source
- API base URL from env (`VITE_API_URL`) — not hard-coded forever
- Keep UI presentational; business rules will live in shared packages / server

## Bad / worst practice

- `npm create` + `npm install` inside a pnpm monorepo
- Importing Hono server files into the React bundle
- Putting marketplace domain rules only in React components
- Naming the package `market-place-app` without a scope if you plan many packages (optional but recommended)

## Acceptance criteria

- [ ] `apps/market-place-app/package.json` exists and is listed by `pnpm list -r --depth 0`
- [ ] `pnpm --filter @marketplace/market-place-app dev` starts the Vite app
- [ ] TypeScript React template runs in the browser
- [ ] No Hono server code inside `apps/`

## Agent prompt

```text
Do not auto-scaffold unless I ask.
I am following Docs/walkthrough/react-app-setup manually.
Only help if I paste an error from Vite/pnpm create.
```

## Next step

[hono-server-setup](../hono-server-setup/README.md) — scaffold `clouds/market-place-server`.

## Related

- [01-monorepo-setup](../01-monorepo-setup/README.md)
- [../../thinking/marketplace-fa-en-architecture.md](../../thinking/marketplace-fa-en-architecture.md)
- [../../tech-space/frontend-architecture.md](../../tech-space/frontend-architecture.md)

# Hono server setup — `clouds/market-place-server` (Bun or Node.js)

Status: not started (you do this manually)

## Goal

Scaffold a **Hono** HTTP server at `clouds/market-place-server` that you will deploy as a cloud API. Runtime can be **Node.js** or **Bun** — pick one for local dev and stick to it until you have a reason to switch.

Minimum useful outcome: `GET /health` returns JSON, and the React app can call it later.

## Why this decision

| Choice | Why |
|--------|-----|
| **`clouds/market-place-server`** | Servers live under `clouds/` — separate deploy story from `apps/` |
| **Hono** | Small, typed, explicit composition root — fits this repo’s backend style |
| **Bun *or* Node** | Both work with Hono; choose based on your machine and host |
| **Manual scaffold** | You learn runtime + entrypoint; keep walkthrough honest |

## Bun vs Node.js (pick one)

| Runtime | Good when | Watch-outs |
|---------|-----------|------------|
| **Node.js** | Max hosting compatibility, familiar tooling | Use `@hono/node-server` (or your preferred Node adapter) |
| **Bun** | Fast local DX, built-in TS | Confirm your cloud host supports Bun before locking production |

You can develop on one runtime and still keep Hono app code portable if you isolate the `serve()` entryfile.

## Alternatives considered

| Alternative | Why not first |
|-------------|---------------|
| Next.js Route Handlers as the only API | Weaker “separate cloud server” boundary for this marketplace plan |
| NestJS | Heavier DI; Hono stays explicit for learning |
| Putting Hono under `apps/` | Blurs client vs cloud folders |

## Prerequisites

- [01 — Monorepo setup](../01-monorepo-setup/README.md) done
- [react-app-setup](../react-app-setup/README.md) recommended first (so you have a client to test against), but not required
- Empty `clouds/market-place-server` (may only contain `.gitkeep`)

## Commands

Run from the **repo root** unless noted.

### 1. Clear the placeholder (optional)

**PowerShell:**

```powershell
Remove-Item -Force clouds/market-place-server/.gitkeep -ErrorAction SilentlyContinue
```

**bash:**

```bash
rm -f clouds/market-place-server/.gitkeep
```

### 2. Create the package

**PowerShell:**

```powershell
New-Item -ItemType Directory -Force -Path clouds/market-place-server/src | Out-Null
cd clouds/market-place-server
pnpm init
cd ../..
```

**bash:**

```bash
mkdir -p clouds/market-place-server/src
cd clouds/market-place-server && pnpm init && cd ../..
```

Edit `clouds/market-place-server/package.json`:

```json
{
  "name": "@marketplace/market-place-server",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

Adjust `dev`/`start` if you choose Bun (see below).

### 3A. Node.js path

```bash
pnpm --filter @marketplace/market-place-server add hono @hono/node-server
pnpm --filter @marketplace/market-place-server add -D typescript tsx @types/node
```

Create `clouds/market-place-server/tsconfig.json` (minimal):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "outDir": "dist",
    "rootDir": "src",
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src"]
}
```

Create `clouds/market-place-server/src/index.ts`:

```ts
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"],
  }),
);

app.get("/health", (c) => c.json({ ok: true, service: "market-place-server" }));

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port }, () => {
  console.log(`market-place-server listening on http://localhost:${port}`);
});
```

Dev:

```bash
pnpm --filter @marketplace/market-place-server add hono
# cors is built into hono/cors — no extra package
pnpm --filter @marketplace/market-place-server dev
```

### 3B. Bun path

```bash
pnpm --filter @marketplace/market-place-server add hono
```

`package.json` scripts example:

```json
{
  "scripts": {
    "dev": "bun run --watch src/index.ts",
    "start": "bun run src/index.ts"
  }
}
```

Create `clouds/market-place-server/src/index.ts`:

```ts
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173"],
  }),
);

app.get("/health", (c) => c.json({ ok: true, service: "market-place-server" }));

const port = Number(process.env.PORT ?? 3000);

export default {
  port,
  fetch: app.fetch,
};

console.log(`market-place-server listening on http://localhost:${port}`);
```

(Bun serves the default export; confirm against current Bun + Hono docs if the export shape differs.)

### 4. Reinstall at root

```bash
pnpm install
```

### 5. Verify

```bash
pnpm --filter @marketplace/market-place-server dev
curl http://localhost:3000/health
```

Expected JSON roughly:

```json
{ "ok": true, "service": "market-place-server" }
```

## What to create

| Path | Purpose |
|------|---------|
| `clouds/market-place-server/package.json` | Workspace member `@marketplace/market-place-server` |
| `clouds/market-place-server/src/index.ts` | Hono app + `/health` |
| `clouds/market-place-server/tsconfig.json` | TS config (Node path especially) |

## Good practice

- Thin HTTP edge: routes validate → call use cases later (not in this step)
- CORS allowlist for local Vite origin
- `PORT` from env
- Keep secrets out of the repo; use `.env` + `.env.example` later
- Composition root (`createApp(deps)`) can wait until [package-setup](../package-setup/README.md) / domain work

## Bad / worst practice

- Business rules and SQL inside route handlers from day one with no plan to extract
- Importing `apps/market-place-app` from the server package
- Committing `.env` with secrets
- Mixing Bun-only APIs deep into domain code if you might deploy on Node

## Acceptance criteria

- [ ] `clouds/market-place-server/package.json` name is `@marketplace/market-place-server`
- [ ] `pnpm --filter @marketplace/market-place-server dev` starts the server
- [ ] `GET /health` returns JSON
- [ ] Server lives under `clouds/`, not `apps/`
- [ ] You documented locally whether you chose **Bun** or **Node** (note in a comment or your own ADR)

## Agent prompt

```text
Do not auto-scaffold unless I ask.
I am following Docs/walkthrough/hono-server-setup manually (Bun or Node).
Only help if I paste an error from Hono/pnpm/Bun.
```

## Next step

[package-setup](../package-setup/README.md) — add shared `packages/*` for contracts/UI/config.

## Related

- [01-monorepo-setup](../01-monorepo-setup/README.md)
- [../../tech-space/backend-architecture.md](../../tech-space/backend-architecture.md)
- [../../thinking/marketplace-fa-en-architecture.md](../../thinking/marketplace-fa-en-architecture.md)
- [../../knowledge/architecture-styles/react-next-hono-recommendations.md](../../knowledge/architecture-styles/react-next-hono-recommendations.md)

# 06 — Hono API

Status: not started

## Goal

Scaffold `apps/api` with **Hono**: middleware (requestId, logging, security headers), Zod validation at routes, error mapper, and a **composition root** that injects ports (in-memory repo is enough until step 07).

## Why this decision

| Choice | Why |
|--------|-----|
| **Hono** | Small, explicit, typed; good teaching API without Nest DI magic |
| **Manual DI (`createApp(deps)`)** | Clear composition root; easy tests with `app.request` |
| **Thin routes** | SRP: HTTP in, use case call, HTTP out |
| **pino** | Structured logs for observability from day one |

WHY a separate API app (not only Next route handlers): clearer multi-client story (web + mobile) and stronger boundary teaching.

## Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| NestJS | Heavier IoC; hides wiring |
| Express only | Fine, but Hono’s DX/typing fits modern TS teaching |
| tRPC | Great DX; weaker “plain HTTP + contracts” lesson unless paired carefully |
| Edge-only runtime | May constrain DB drivers — **verify** before choosing; prefer Node for phase 1 |

## Prerequisites

- Steps 03–05 complete (domain, application, config, contracts)
- Decide Node runtime for local dev

## Commands

```bash
cd apps/api
pnpm init
# name: @fsab/api

cd ../..
pnpm --filter @fsab/api add hono zod pino
pnpm --filter @fsab/api add -D @types/node tsx vitest

# Workspace deps
pnpm --filter @fsab/api add @fsab/domain@workspace:* @fsab/application@workspace:* @fsab/contracts@workspace:* @fsab/config@workspace:*

# Node server adapter — verify current Hono package for Node:
# commonly `@hono/node-server` (confirm on npm / Hono docs before adding)
pnpm --filter @fsab/api add @hono/node-server
```

**Needs verification:** exact Hono Node serve import and recommended entryfile for current Hono major.

Dev script example:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "test": "vitest run",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

```bash
pnpm --filter @fsab/api dev
# health check once implemented, e.g. curl http://localhost:3001/health
```

## What to create

| Path | Purpose |
|------|---------|
| `apps/api/src/create-app.ts` | `createApp(deps)` composition |
| `apps/api/src/routes/todos.ts` | Validate + call use cases |
| `apps/api/src/middleware/*` | requestId, logger, security headers |
| `apps/api/src/errors/map-error.ts` | Domain/app errors → HTTP |
| `apps/api/src/index.ts` | Parse env, wire in-memory repo, serve |
| API tests using `app.request` | No real network required |

## Good practice

- Routes never import SQL drivers
- Error responses use stable `code` fields
- Redact secrets in logs

## Bad / worst practice

- Business invariants only in the route handler
- `try/catch` returning random strings per file
- Global mutable singleton db without injection

## Acceptance criteria

- [ ] `GET /health` (or equivalent) returns OK
- [ ] Todo routes validate with contracts schemas
- [ ] In-memory repository wired through `createApp`
- [ ] At least one API test via `app.request`
- [ ] Logger includes request id

## Agent prompt

```text
Implement Docs/walkthrough/06-hono-api only.
Scaffold apps/api with Hono, validation, error mapping, logging, and createApp(deps)
using the in-memory Todo repository from the application tests.
Do not add real database adapters yet (that is step 07).
Verify Hono Node server package names against current docs.
```

## Next step

[07 — Database port and libSQL](../07-database-port-and-libsql/README.md)

## Related

- [../../tech-space/backend-architecture.md](../../tech-space/backend-architecture.md)
- [../../knowledge/solid/05-D.md](../../knowledge/solid/05-D.md)

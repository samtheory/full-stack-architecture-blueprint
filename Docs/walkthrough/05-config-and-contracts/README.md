# 05 — Config and contracts

Status: not started

## Goal

Add `packages/config` (typed env) and `packages/contracts` (shared Zod schemas / API shapes) so the API and future web client validate the **same** payloads.

## Why this decision

| Choice | Why |
|--------|-----|
| Zod contracts package | One source of truth for request/response shapes |
| Typed config package | Fail fast on bad env; avoid scattered `process.env.X!` |
| Separate from domain | HTTP/DTO shapes can differ from pure domain models |

WHY not only infer types from Zod in the API app: mobile/web need the same schemas without importing Hono.

## Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| tRPC-only contracts | Couples clients unless carefully shared; less explicit HTTP teaching |
| OpenAPI-first codegen | Powerful; heavier for phase 1 |
| Valibot / ArkType | Viable; Zod is the provisional choice pending version check |

## Prerequisites

- Steps 01–04 complete (application use cases exist to map to)

## Commands

```bash
pnpm --filter @fsab/contracts add zod
pnpm --filter @fsab/config add zod

# From root, wire workspace deps as needed
pnpm install
```

**Needs verification:** Zod major version compatible with your TypeScript and tooling at install time.

Example env schema ideas (names TBD in implementation):

- `NODE_ENV`
- `PORT`
- `DATABASE_DRIVER`
- `DATABASE_URL`
- `LOG_LEVEL`

```bash
pnpm --filter @fsab/config test
pnpm --filter @fsab/contracts test
```

## What to create

| Path | Purpose |
|------|---------|
| `packages/config/src/env.ts` | `parseEnv(process.env)` → typed config or throw |
| `packages/contracts/src/todo.ts` | `createTodoRequestSchema`, response schemas |
| `.env.example` at root or `apps/api` | Document required vars (no secrets) |

## Good practice

- Strip/reject unknown fields intentionally at API edge
- Map contracts → domain inside application/API boundary, not in React
- Never commit real `.env`

## Bad / worst practice

- Duplicating hand-written interfaces that drift from Zod
- Reading `process.env` deep inside domain
- Putting database passwords in contracts package docs as real values

## Acceptance criteria

- [ ] Invalid env fails with a clear error in tests
- [ ] At least one Todo request schema exported from contracts
- [ ] `.env.example` exists with placeholder values
- [ ] Domain package still does not depend on contracts (or document why if you allow it — prefer mapping at edges)

## Agent prompt

```text
Implement Docs/walkthrough/05-config-and-contracts only.
Create packages/config and packages/contracts with Zod env + Todo API schemas.
Do not scaffold Hono routes yet beyond what is needed to compile packages.
```

## Next step

[06 — Hono API](../06-hono-api/README.md)

## Related

- [../../tech-space/backend-architecture.md](../../tech-space/backend-architecture.md)
- [../../tech-space/security-observability.md](../../tech-space/security-observability.md)

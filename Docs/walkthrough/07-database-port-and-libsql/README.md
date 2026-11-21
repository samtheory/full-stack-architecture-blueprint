# 07 — Database port and libSQL adapter

Status: not started

## Goal

Create `packages/db` with a **factory + libSQL adapter** that implements the application Todo port. Wire the API to use it via env (`DATABASE_DRIVER=libsql`).

## Why this decision

| Choice | Why |
|--------|-----|
| **First driver: libSQL** | Often easiest local DX (file or embedded) — **verify** on your OS |
| **Adapter in `packages/db`** | Keeps vendor SDK out of application |
| **Factory from config** | Teaches Factory + OCP without a DI container |
| **Hand-written SQL or thin helper** | Honest dialects; see ADR 0002 before switching to Kysely |

WHY not Prisma-first: faster DX, but can hide differences this repo wants to teach.

## Alternatives considered

| Alternative | Why not first |
|-------------|---------------|
| PostgreSQL first | Better “real server” story; heavier local setup |
| Kysely immediately | Good option; adopt if raw SQL boilerplate hurts (ADR) |
| Generic `query()` leaked to domain | Breaks DIP |

## Prerequisites

- Step 06 API works with in-memory repo
- ADR [0002-database-adapters](../../tech-space/decisions/0002-database-adapters.md) reviewed
- `.env.example` updated

## Commands

```bash
pnpm --filter @fsab/db add @libsql/client
# verify package name/version on npm at install time

pnpm --filter @fsab/db add @fsab/application@workspace:* @fsab/domain@workspace:* @fsab/config@workspace:*

pnpm --filter @fsab/api add @fsab/db@workspace:*
```

Local file DB example (illustrative — confirm URL scheme in libSQL docs):

```bash
# .env
DATABASE_DRIVER=libsql
DATABASE_URL=file:./data/todos.db
```

```bash
pnpm --filter @fsab/db test
pnpm --filter @fsab/api dev
```

## What to create

| Path | Purpose |
|------|---------|
| `packages/db/src/capabilities.ts` | Flags (`returning`, etc.) |
| `packages/db/src/create-db.ts` | Factory by driver |
| `packages/db/src/adapters/libsql/todo-repository.ts` | Port implementation |
| Migrations or `SCHEMA.sql` for libSQL | Explicit schema |
| Integration test | Against file/memory libSQL |

Wire `apps/api` composition root: if driver is `libsql`, use adapter; keep `memory` for tests.

## Good practice

- Vendor types stay inside adapter files
- Contract: same behavior as in-memory fake for core methods
- Document what libSQL does **not** match from Postgres yet

## Bad / worst practice

- `if (driver === 'libsql')` inside use cases
- Swallowing SQL errors into empty lists
- Claiming MariaDB/Postgres “already work” without adapters

## Acceptance criteria

- [ ] `DATABASE_DRIVER=libsql` runs Todo API against libSQL
- [ ] `DATABASE_DRIVER=memory` (or test override) still works for tests
- [ ] Adapter implements the same port as the fake
- [ ] At least one integration test for libSQL adapter
- [ ] Differences/capabilities documented in code comments or db README

## Agent prompt

```text
Implement Docs/walkthrough/07-database-port-and-libsql only.
Create packages/db with a libSQL Todo adapter and factory; wire apps/api via env.
Keep an in-memory option for tests. Do not implement Postgres/MariaDB yet.
Verify @libsql/client usage against current docs.
```

## Next step

[08 — Next.js web app](../08-nextjs-web-app/README.md)

## Related

- [../../tech-space/database-abstraction.md](../../tech-space/database-abstraction.md)
- [../../knowledge/design-patterns/adapter.md](../../knowledge/design-patterns/adapter.md)
- [../../knowledge/design-patterns/factory.md](../../knowledge/design-patterns/factory.md)
- [../../examples/multi-db-notes/README.md](../../examples/multi-db-notes/README.md)

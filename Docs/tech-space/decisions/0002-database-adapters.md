# 0002 — Database access approach

Status: Proposed  
Date: 2026-11-21

## Context

We must support libSQL, MariaDB, and PostgreSQL while teaching real dialect differences.

## Decision (proposed)

1. Define persistence **ports** in `packages/application`.
2. Implement **one adapter per vendor** in `packages/db`.
3. Start with **hand-written SQL** or a thin query helper; evaluate **Kysely** if boilerplate hurts.
4. Ship **contract tests** per adapter.
5. First local driver: **libSQL**; then Postgres; then MariaDB.

## Alternatives considered

| Option | Trade-off |
|--------|-----------|
| Prisma multi-provider | Faster DX; may hide differences we want to teach |
| Drizzle | Strong DX; verify multi-dialect + migration story |
| One ORM abstraction over all three | Risks false portability |

## Consequences

- More SQL code, clearer lessons
- Migrations may be vendor-specific folders initially
- Docs must list capability differences

## Needs verification

- `@libsql/client` + MariaDB + `pg` driver versions on Node LTS
- Windows contributor path for Docker-based integration tests

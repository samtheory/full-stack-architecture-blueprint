# 12 — MariaDB adapter

Status: not started

## Goal

Add **MariaDB** adapter + compose service + contract tests. Complete the three-engine story without hiding dialect differences (UPSERT, booleans, JSON).

## Why this decision

| Choice | Why |
|--------|-----|
| Third adapter | Proves the factory/port design was not theoretical |
| Explicit differences | Interview-ready “portability” honesty |

## Alternatives considered

| Alternative | Why not |
|-------------|---------|
| MySQL-only naming | MariaDB is in scope; note compatibility carefully and **verify** |
| Shared “MySQL dialect” abstraction too early | Only if tests prove it is safe |

## Prerequisites

- Step 11 Postgres adapter green

## Commands

```bash
pnpm --filter @fsab/db add mysql2
# or mariadb driver — verify which client you standardize on

docker compose up -d mariadb

DATABASE_DRIVER=mariadb
DATABASE_URL=mysql://user:pass@localhost:3306/fsab
```

```bash
pnpm --filter @fsab/db test
```

## What to create

| Path | Purpose |
|------|---------|
| `adapters/mariadb/todo-repository.ts` | Port impl |
| `migrations/mariadb/*` | Schema |
| Compose service | Local/CI |
| Differences doc section | UPSERT / bool / JSON |

## Good practice

- Reuse contract harness from `test-kit`
- Document `ON DUPLICATE KEY` vs `ON CONFLICT` explicitly

## Bad / worst practice

- Branching vendor SQL inside use cases
- Claiming drop-in compatibility with Postgres

## Acceptance criteria

- [ ] MariaDB driver path works for Todo API
- [ ] Contract tests pass
- [ ] Three-driver matrix documented in README or db package README
- [ ] Multi-db example doc updated

## Agent prompt

```text
Implement Docs/walkthrough/12-mariadb-adapter only.
Add MariaDB Todo adapter, migrations, compose, and contract tests.
Document dialect differences vs libSQL and Postgres.
Verify the MySQL/MariaDB client library against current docs.
```

## Next step

[13 — Capacitor mobile](../13-capacitor-mobile/README.md)

## Related

- [../../tech-space/database-abstraction.md](../../tech-space/database-abstraction.md)
- [../../knowledge/solid/03-L.md](../../knowledge/solid/03-L.md)

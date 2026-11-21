# 11 — PostgreSQL adapter

Status: not started

## Goal

Add a **PostgreSQL** implementation of the Todo port, Docker Compose for local/CI, and run the **same contract tests** as libSQL.

## Why this decision

| Choice | Why |
|--------|-----|
| Second adapter = Postgres | Common production engine; strong interview relevance |
| Separate SQL/migrations | Do not pretend libSQL SQL is identical |
| Contract tests | Enforce LSP across adapters |

## Alternatives considered

| Alternative | Why not |
|-------------|---------|
| Only document Postgres without code | Weak teaching |
| Prisma for Postgres only | Splits approaches awkwardly mid-repo |

## Prerequisites

- Steps 07 + 10 complete
- Docker available **or** documented CI-only path for Windows contributors

## Commands

```bash
pnpm --filter @fsab/db add pg
pnpm --filter @fsab/db add -D @types/pg
# verify driver package names/versions

# Example compose (create docker-compose.yml) — verify image tags:
# services: postgres: image: postgres:16-alpine, ports, POSTGRES_password, etc.

docker compose up -d postgres

# .env
DATABASE_DRIVER=postgres
DATABASE_URL=postgres://user:pass@localhost:5432/fsab
```

```bash
pnpm --filter @fsab/db test
# ensure contract suite runs with DRIVER=postgres
```

## What to create

| Path | Purpose |
|------|---------|
| `adapters/postgres/todo-repository.ts` | Port impl |
| `migrations/postgres/*` | Schema |
| `docker-compose.yml` service | Local DB |
| Capability flags update | Honest Postgres features |
| Docs note | Differences vs libSQL |

## Good practice

- Parameterized queries only
- Same error semantics as other adapters where the port promises them

## Bad / worst practice

- Copy-pasting libSQL SQL and hoping
- Sharing one migration file across vendors without verification

## Acceptance criteria

- [ ] `DATABASE_DRIVER=postgres` serves Todo API
- [ ] Contract tests pass on Postgres
- [ ] Compose (or CI service) documented
- [ ] Differences table updated

## Agent prompt

```text
Implement Docs/walkthrough/11-postgres-adapter only.
Add PostgreSQL Todo adapter, migrations, compose service, and contract tests.
Do not add MariaDB yet. Verify pg driver usage against current docs.
```

## Next step

[12 — MariaDB adapter](../12-mariadb-adapter/README.md)

## Related

- [../../examples/multi-db-notes/README.md](../../examples/multi-db-notes/README.md)
- [../../tech-space/decisions/0002-database-adapters.md](../../tech-space/decisions/0002-database-adapters.md)

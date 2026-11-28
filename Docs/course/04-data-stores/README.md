# 04 — Data: Postgres / MariaDB / SQLite

Multi-engine literacy + port/adapter design. Links: [`../../tech-space/database-abstraction.md`](../../tech-space/database-abstraction.md), [ADR 0002](../../tech-space/decisions/0002-database-adapters.md).

Topic IDs follow [`../PLAN.md`](../PLAN.md) Phase 4 waves.

| ID | Topic | Status | Lesson |
|----|--------|--------|--------|
| DB-01 | Relational model & SQL core | complete | [DB-01-sql-core.md](DB-01-sql-core.md) |
| DB-02 | PostgreSQL essentials | complete | [DB-02-postgres-essentials.md](DB-02-postgres-essentials.md) |
| DB-03 | MariaDB / MySQL differences | complete | [DB-03-mariadb-differences.md](DB-03-mariadb-differences.md) |
| DB-04 | SQLite & libSQL (local / edge) | complete | [DB-04-sqlite-libsql.md](DB-04-sqlite-libsql.md) |
| DB-05 | Migrations (expand/contract) | complete | [DB-05-migrations.md](DB-05-migrations.md) |
| DB-06 | Indexes & reading EXPLAIN | complete | [DB-06-indexes-explain.md](DB-06-indexes-explain.md) |
| DB-07 | Transactions & isolation | planned | Wave 4.3 |
| DB-08 | Port + adapters (ADR 0002) | planned | Wave 4.3 |
| DB-09 | Backups, PITR, HA | planned | Wave 4.4 |
| DB-10 | CTO: pick engine per environment | planned | Wave 4.4 |

## Study order

**Wave 4.1:** [DB-01](DB-01-sql-core.md) → [DB-02](DB-02-postgres-essentials.md) → [DB-03](DB-03-mariadb-differences.md)

**Wave 4.2:** [DB-04](DB-04-sqlite-libsql.md) → [DB-05](DB-05-migrations.md) → [DB-06](DB-06-indexes-explain.md)

**Phase:** 4.2 ✅ · **Next:** Phase 4.3 — DB-07 · DB-08  

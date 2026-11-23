# 02 — Postgres with Docker (`infra/`)

Status: not started

## Goal

Run a **local PostgreSQL** that the marketplace server will use. Infra lives in the monorepo’s `infra/` folder (already scaffolded in this repo).

## Why `infra/` (not root, not `clouds/`)

| Location | When |
|----------|------|
| **`infra/`** | Default here — shared DB/redis/etc., clear ownership |
| Repo root compose | OK for a single service forever; clutters root as stack grows |
| Inside `clouds/market-place-server` | Wrong — the database is not the API package |

## What you should have

```text
infra/
  README.md
  docker-compose.yml
  .env.example
  .env                 # you create locally (gitignored)
```

## Do this

### 1. Prerequisites

- Docker Desktop (or compatible engine) running on Windows
- From repo root, confirm:

```bash
docker version
docker compose version
```

### 2. Create local env

```powershell
Copy-Item infra/.env.example infra/.env
```

Edit `infra/.env` if you want different passwords (defaults are fine for local learning):

```env
POSTGRES_USER=marketplace
POSTGRES_PASSWORD=marketplace
POSTGRES_DB=marketplace
POSTGRES_PORT=5432
```

### 3. Start Postgres

From **repo root**:

```bash
docker compose -f infra/docker-compose.yml --env-file infra/.env up -d
```

Check:

```bash
docker compose -f infra/docker-compose.yml ps
docker compose -f infra/docker-compose.yml logs -f postgres
```

Stop (keeps data volume):

```bash
docker compose -f infra/docker-compose.yml down
```

Wipe data (destructive):

```bash
docker compose -f infra/docker-compose.yml down -v
```

### 4. Point the Hono server at Postgres

Add to `clouds/market-place-server/.env` and `.env.example`:

```env
DATABASE_URL=postgresql://marketplace:marketplace@localhost:5432/marketplace
```

If you changed user/password/port in `infra/.env`, mirror them in `DATABASE_URL`.

You will **use** this URL in step 03 (Drizzle). For this step, starting the container + documenting the URL is enough.

### 5. Optional connectivity smoke test

If you have `psql`:

```bash
psql "postgresql://marketplace:marketplace@localhost:5432/marketplace" -c "select 1;"
```

Or with Docker:

```bash
docker compose -f infra/docker-compose.yml exec postgres psql -U marketplace -d marketplace -c "select 1;"
```

## Good practice

- Commit `.env.example`; never commit `infra/.env` or server `.env`
- One named volume for Postgres data so restarts keep tables
- Same `DATABASE_URL` shape you will use in production (provider will differ)

## Bad practice

- Hard-coding passwords only inside `docker-compose.yml` with no `.env.example`
- Running Postgres in the same container as Hono for “simplicity”
- Using libSQL for the marketplace long-term while documenting Postgres as the source of truth (pick one primary path)

## Acceptance

- [ ] `docker compose -f infra/docker-compose.yml up -d` succeeds
- [ ] `postgres` container is healthy / running
- [ ] `DATABASE_URL` is in `clouds/market-place-server/.env.example`
- [ ] You can `select 1` via exec or psql

## Next

[03 — Drizzle setup](03-drizzle-setup.md)

## Related

- [../../infra/README.md](../../../infra/README.md)
- [../../thinking/marketplace-fa-en-architecture.md](../../thinking/marketplace-fa-en-architecture.md) (Postgres default for marketplace)

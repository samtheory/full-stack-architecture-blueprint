# market-place-server — build guide

Hands-on path to grow `clouds/market-place-server` from a health-check Hono app into a modular marketplace API.

You already have: Bun/Hono, `/health`, env (`PORT`, `CORS_ORIGIN`).  
This guide teaches **what to build next**, in order, with why.

Architecture stance: [../../thinking/marketplace-fa-en-architecture.md](../../thinking/marketplace-fa-en-architecture.md)

## How to use

1. Open the next step.
2. Read **Goal → Why → Do this → Acceptance**.
3. Implement it yourself in `clouds/market-place-server` (and `infra/` when the step says so).
4. Check acceptance before moving on.

## Path

| Step | Doc | You build |
|------|-----|-----------|
| 01 | [01-folder-structure](01-folder-structure.md) | Composition root + module folders (listing first) |
| 02 | [02-postgres-docker](02-postgres-docker.md) | Local Postgres via `infra/docker-compose.yml` |
| 03 | [03-drizzle-setup](03-drizzle-setup.md) | Drizzle client, schema, migrations |
| 04 | [04-listing-slice](04-listing-slice.md) | First vertical slice: create/list listings (FA/EN fields) |

## Why Postgres lives in `infra/`, not under `clouds/`

| Place | Verdict |
|-------|---------|
| `infra/` ✅ | Shared local/cloud-adjacent infra; DB is not the Hono package |
| Repo root `docker-compose.yml` | Fine for tiny repos; gets noisy as Redis/mail/minio appear |
| `clouds/market-place-server/docker-compose.yml` | Couples DB lifecycle to one app; awkward if workers need the same DB |

From repo root:

```bash
docker compose -f infra/docker-compose.yml up -d
```

## Map to code

```text
clouds/market-place-server/     # this guide’s target
infra/                          # Postgres (and later Redis, etc.)
packages/contracts/             # shared Zod (from walkthrough package-setup)
Docs/clouds/market-place-server # you are here
```

## Status legend

- `not started` — you have not done the step yet
- `in progress`
- `done`

# Infra

Local (and later shared) infrastructure for the monorepo.

| Piece | Purpose |
|-------|---------|
| `docker-compose.yml` | Postgres for marketplace development |
| `.env.example` | Documented variables — copy to `.env` |

## Why here

- **`infra/`** = databases, brokers, emulators shared by `clouds/*` and later workers  
- Not inside `clouds/market-place-server` (that package is the API)  
- Not forced at repo root (keeps root for workspace tooling)

## Postgres quick start

```bash
# from repo root
Copy-Item infra/.env.example infra/.env   # PowerShell once

docker compose -f infra/docker-compose.yml --env-file infra/.env up -d
docker compose -f infra/docker-compose.yml ps
```

Connection string for the Hono server:

```text
postgresql://marketplace:marketplace@localhost:5432/marketplace
```

Teaching guide: [Docs/clouds/market-place-server/02-postgres-docker.md](../Docs/clouds/market-place-server/02-postgres-docker.md)

# Walkthrough

Step-by-step build guide. Prefer the **Marketplace path** below for the current product. Older numbered blueprint steps remain as a teaching reference.

## How to use

1. Open the next step folder.
2. Read **Goal → Why → Commands → Acceptance**.
3. Run the commands yourself (or ask an agent to implement **only** that step).
4. Check the acceptance list before moving on.

---

## Marketplace path (current)

| Step | Folder | You do | Builds |
|------|--------|--------|--------|
| 01 | [01-monorepo-setup](01-monorepo-setup/README.md) | Done in repo | pnpm + Turborepo; `apps/` + `clouds/` + `packages/` |
| 02 | [react-app-setup](react-app-setup/README.md) | Manual | Vite React app → `apps/market-place-app` |
| 03 | [hono-server-setup](hono-server-setup/README.md) | Manual | Hono on Bun or Node → `clouds/market-place-server` |
| 04 | [package-setup](package-setup/README.md) | Manual | First shared package `@marketplace/contracts` |

### Target layout

```text
apps/
  market-place-app/          # React client
clouds/
  market-place-server/       # Hono API (cloud deployable)
packages/
  contracts/                 # shared Zod DTOs (after package-setup)
```

Product architecture notes: [../thinking/marketplace-fa-en-architecture.md](../thinking/marketplace-fa-en-architecture.md)

---

## Blueprint teaching path (reference)

Earlier learning sequence for the architecture blueprint (todo slice, multi-DB adapters, etc.). Use when studying the teaching curriculum — not required to start the marketplace.

| Step | Folder | Builds |
|------|--------|--------|
| 02 | [02-typescript-tooling](02-typescript-tooling/README.md) | Shared TS / ESLint / Prettier / scripts |
| 03 | [03-domain-package](03-domain-package/README.md) | Pure domain (`packages/domain`) |
| 04 | [04-application-layer](04-application-layer/README.md) | Use cases + ports |
| 05 | [05-config-and-contracts](05-config-and-contracts/README.md) | Env config + Zod contracts |
| 06 | [06-hono-api](06-hono-api/README.md) | Hono API edge + DI root |
| 07 | [07-database-port-and-libsql](07-database-port-and-libsql/README.md) | DB package + first libSQL adapter |
| 08 | [08-nextjs-web-app](08-nextjs-web-app/README.md) | Next.js web app shell |
| 09 | [09-vertical-slice-wiring](09-vertical-slice-wiring/README.md) | End-to-end Todo slice |
| 10 | [10-testing-strategy](10-testing-strategy/README.md) | Unit, API, integration tests |
| 11 | [11-postgres-adapter](11-postgres-adapter/README.md) | PostgreSQL adapter |
| 12 | [12-mariadb-adapter](12-mariadb-adapter/README.md) | MariaDB adapter |
| 13 | [13-capacitor-mobile](13-capacitor-mobile/README.md) | Capacitor + React mobile |
| 14 | [14-auth-session](14-auth-session/README.md) | Auth session example |
| 15 | [15-optimistic-ui-sync](15-optimistic-ui-sync/README.md) | Optimistic UI sync |
| 16 | [16-ci-and-graphify](16-ci-and-graphify/README.md) | CI + Graphify refresh |

> Note: marketplace uses `clouds/market-place-server` and `apps/market-place-app`. Blueprint steps that say `apps/api` / `apps/web` are the older teaching names.

---

## Document template (every step)

```markdown
# NN — Title

## Goal
## Why this decision
## Alternatives considered
## Prerequisites
## Commands
## What to create
## Good practice
## Bad / worst practice
## Acceptance criteria
## Agent prompt
## Next step
```

## Status legend

- `Status: not started` — you have not done it yet
- `Status: in progress`
- `Status: done`

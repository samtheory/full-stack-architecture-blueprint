# Walkthrough

Step-by-step build guide for **Full-Stack Architecture Blueprint**.

Use this when you (or an agent) implement the repo: **one step → one folder → do only that step**.

Unlike [`../tech-space/`](../tech-space/README.md) (architecture *why* at the system level) and [`../knowledge/`](../knowledge/README.md) (concepts), this folder is an **ordered construction manual**: commands, decisions, files, and acceptance checks.

## How to use

1. Finish open ADRs in [`../tech-space/decisions/`](../tech-space/decisions/README.md) if the step depends on them.
2. Open the next numbered folder.
3. Read **Goal → Why → Commands → Acceptance**.
4. Implement only that step (or ask the agent: *“Implement walkthrough step NN”*).
5. Check the acceptance list before moving on.

## Step index

| Step | Folder | Builds |
|------|--------|--------|
| 01 | [01-monorepo-setup](01-monorepo-setup/README.md) | pnpm workspace + Turborepo skeleton |
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

## Agent usage

Paste the **Agent prompt** from a step folder, or say:

```text
Implement Docs/walkthrough/01-monorepo-setup only.
Follow its README. Do not skip ahead.
```

## Status legend

Each step README ends with a status line:

- `Status: not started` — no code yet
- `Status: in progress`
- `Status: done`

Update the status when you complete a step.

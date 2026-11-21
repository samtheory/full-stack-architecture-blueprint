# 10 — Testing strategy

Status: not started

## Goal

Formalize **unit, API, integration, and first E2E** tests so every later adapter/feature has a place to plug in.

## Why this decision

| Choice | Why |
|--------|-----|
| **Vitest** for unit/API/integration | Fast, ESM, monorepo-friendly |
| **Playwright** for web E2E | Stable browser automation |
| **Port contract tests** | Same suite will run against libSQL/Postgres/MariaDB |
| **Test pyramid** | Many fast unit tests; fewer E2E |

WHY not E2E-only: slow feedback and poor design signal for domain rules.

## Alternatives considered

| Alternative | Why not first |
|-------------|---------------|
| Cypress | Fine; Playwright chosen for API+browser tooling |
| Testing only in apps | Misses package-level isolation |

## Prerequisites

- Step 09 vertical slice works manually

## Commands

```bash
pnpm add -Dw @playwright/test
pnpm exec playwright install   # browsers — needs network

# Run layers
pnpm --filter @fsab/domain test
pnpm --filter @fsab/application test
pnpm --filter @fsab/api test
pnpm --filter @fsab/db test
pnpm --filter @fsab/web test    # if any
pnpm exec playwright test       # e2e — configure project first
```

## What to create

| Layer | Location | Proves |
|-------|----------|--------|
| Unit | `packages/domain`, `application` | Rules + use cases + fakes |
| API | `apps/api` | Validation, errors, wiring via `app.request` |
| Integration | `packages/db` | libSQL adapter honors port |
| E2E | `e2e/` or `apps/web/e2e` | Create todo in browser against API |
| Contract harness | `packages/test-kit` | Shared port test runner for adapters |

## Good practice

- Do not mock the unit under test
- Prefer fakes at application boundary
- One Playwright smoke for the Todo happy path

## Bad / worst practice

- 100% E2E coverage dreams
- Snapshot-only tests that never assert behavior
- Disabling failing tests to go green

## Acceptance criteria

- [ ] `pnpm test` runs unit/API/db tests in CI-able form
- [ ] Port contract test exists and passes on libSQL (+ memory)
- [ ] At least one Playwright smoke test documented
- [ ] `packages/test-kit` started if shared helpers are needed

## Agent prompt

```text
Implement Docs/walkthrough/10-testing-strategy only.
Add/normalize Vitest suites and a Playwright smoke for the Todo slice.
Create a port contract test harness usable by future DB adapters.
Do not add new product features.
```

## Next step

[11 — PostgreSQL adapter](../11-postgres-adapter/README.md)

## Related

- [../../tech-space/project-blueprint.md](../../tech-space/project-blueprint.md) § Testing strategy
- [../../tech-space/database-abstraction.md](../../tech-space/database-abstraction.md)

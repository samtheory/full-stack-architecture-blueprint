# 04 — Application layer

Status: not started

## Goal

Create `packages/application` with **use cases** and **ports** (e.g. `TodoRepository`) that depend on domain, not on Hono or SQL.

## Why this decision

| Choice | Why |
|--------|-----|
| Application package | Orchestrates workflows; keeps HTTP handlers thin |
| Ports as interfaces | Enables in-memory fakes and later DB adapters (DIP) |
| Depend on `domain` only | Clear inward dependency rule |

WHY not put ports in `db`: ports are owned by the inside; adapters live outside.

## Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| Use cases inside Hono routes | Harder to test; couples to HTTP |
| CQRS/MediatR-style bus | Extra ceremony for a Todo slice |
| Generic `IRepository<T>` | Weak domain language; often violates ISP |

## Prerequisites

- Step 03 domain package exists and tests pass

## Commands

```bash
mkdir -p packages/application/src
# init package @fsab/application
# depend on @fsab/domain via workspace protocol
pnpm --filter @fsab/application add @fsab/domain@workspace:*
```

**Needs verification:** exact pnpm workspace dependency syntax for your pnpm major (`workspace:*` is standard).

```bash
pnpm --filter @fsab/application test
pnpm --filter @fsab/application typecheck
```

## What to create

| Path | Purpose |
|------|---------|
| `ports/todo-repository.ts` | Interface: `add`, `list`, `get`, `save` (keep small) |
| `use-cases/create-todo.ts` | Orchestrates domain + port |
| `use-cases/list-todos.ts` | … |
| `use-cases/complete-todo.ts` | … |
| In-memory fake + tests | Prove use cases without DB |

## Good practice

- Use cases accept ports via function args or constructor
- Return domain types or application DTOs — not HTTP status codes
- ISP: do not force unused methods on every caller

## Bad / worst practice

- Importing `pg` / `@libsql/client` in application
- Mapping Zod HTTP schemas inside domain
- God `TodoService` with email + PDF + SQL

## Acceptance criteria

- [ ] Port interface defined without vendor types
- [ ] At least two use cases implemented
- [ ] Tests pass with an in-memory fake repository
- [ ] Package depends on domain, not on apps

## Agent prompt

```text
Implement Docs/walkthrough/04-application-layer only.
Create packages/application with Todo ports, use cases, and in-memory fake tests.
Do not add Hono or real database adapters yet.
```

## Next step

[05 — Config and contracts](../05-config-and-contracts/README.md)

## Related

- [../../knowledge/design-patterns/repository.md](../../knowledge/design-patterns/repository.md)
- [../../knowledge/design-patterns/dependency-injection.md](../../knowledge/design-patterns/dependency-injection.md)
- [../../knowledge/architecture-styles/hexagonal.md](../../knowledge/architecture-styles/hexagonal.md)

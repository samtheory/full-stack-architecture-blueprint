# Example: Vertical slice — Todo

## What it is

The **smallest useful full-stack slice**: create/list/complete todos through UI → Hono API → persistence port → one DB adapter.

## Goals

- Prove monorepo wiring
- Teach SRP + DIP without extra patterns
- Establish test + run scripts for later examples

## When to use this shape

- Bootstrapping the repo
- Interview walkthrough of “follow a request through the stack”

## Layers (planned)

| Layer | Responsibility |
|-------|----------------|
| Web / Mobile | List + form; call API |
| API | Validate; invoke use cases |
| Application | `createTodo`, `listTodos`, `completeTodo` |
| Domain | Todo invariants (e.g. title non-empty) |
| DB adapter | Persist; start with libSQL |

## Good practice

- In-memory fake for unit tests; real adapter for integration
- Shared contract for `CreateTodoRequest`

## Bad / worst practice

- SQL inside the React click handler
- Skipping validation because “the UI already checks”
- Adding Strategy/Factory/Observer here without need

## Trade-offs

Small domain — intentionally. Depth comes from boundaries, not feature count.

## Related concepts

Vertical Slice, Dependency Inversion, Repository, Hono Backend API

## Run (planned)

```bash
pnpm install
pnpm --filter @fsab/api dev
pnpm --filter @fsab/web dev
pnpm test
```

Exact filter names TBD after ADR 0003.

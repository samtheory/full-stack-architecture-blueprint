# Hono backend architecture

## What it is

A thin HTTP edge over application use cases. Hono handles routing and middleware; business rules live in `packages/application` + `packages/domain`.

## Request pipeline

```text
middleware: requestId → logger → security headers → cors
route: parse params/body → Zod validate (contracts)
handler: call use case with injected ports
map: Result/DTO → JSON status
on error: typed error → HTTP problem response
```

## API validation

- **Good:** Zod (or shared contracts) at the boundary; reject unknown fields intentionally
- **Bad:** Manual `typeof` checks scattered in handlers
- **Worst:** Trusting client input and “cleaning” later in SQL

## Error handling

| Layer | Responsibility |
|-------|----------------|
| Domain | Throw/return domain errors (`NotFound`, `Conflict`, `Validation`) |
| Application | Preserve meaning; do not map to HTTP |
| API mapper | Status code + stable `code` + safe message |

**Good:** one mapper. **Bad:** `try/catch` returning random strings per route.

## Dependency injection

Prefer **constructor or factory injection** from a composition root:

```text
const db = createDb(config)
const notes = createNotesRepository(db)
const app = createApp({ notes, logger, clock })
```

**Good:** `createApp(deps)` testable with fakes.  
**Bad:** service locator globals.  
**Worst:** importing `packages/db` adapters directly inside use cases.

## Logging & configuration

- **Logging:** pino child logger with `requestId`; redact tokens/passwords
- **Config:** parse env once at startup; crash on invalid config
- **Observability hooks:** structured fields for route, status, latency

## When to use this style

- Teaching clean boundaries with a small API
- Multiple clients (web/mobile) on one HTTP contract

## When not to use

- Ultra-simple single-file demo with no domain
- If you truly need full Nest-like module DI for a huge org codebase (different trade-off)

## Related

- [database-abstraction.md](database-abstraction.md)
- [../knowledge/design-patterns/dependency-injection.md](../knowledge/design-patterns/dependency-injection.md)
- [../knowledge/solid/dip.md](../knowledge/solid/dip.md)

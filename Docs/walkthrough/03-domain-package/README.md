# 03 — Domain package

Status: not started

## Goal

Create `packages/domain` with **pure Todo (or Note) business rules** — no HTTP, no SQL, no React.

## Why this decision

| Choice | Why |
|--------|-----|
| Separate `domain` package | Makes DIP visible; interviewers can ask “what can this import?” |
| Pure functions / entities | Unit-testable without mocks of frameworks |
| Start with Todo | Matches [vertical-slice-todo](../../examples/vertical-slice-todo/README.md); small invariants |

WHY not put rules in Next.js or Hono: frameworks change; rules should not.

## Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| “Domain” folder inside `apps/api` only | Hides reuse for mobile/web clients of the same rules |
| Rich DDD with many aggregates | Too much ceremony for the first slice |
| No domain package (logic in routes) | Teaches the opposite of this repo’s goal |

## Prerequisites

- Steps 01–02 complete
- ESLint boundary plan ready (forbid framework imports)

## Commands

```bash
# If stub not created in step 01:
mkdir -p packages/domain/src
cd packages/domain
pnpm init
```

Set `package.json` name to `@fsab/domain` (or agreed scope), add scripts:

```json
{
  "name": "@fsab/domain",
  "private": true,
  "type": "module",
  "exports": { ".": "./src/index.ts" },
  "scripts": {
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run",
    "lint": "eslint ."
  }
}
```

**Needs verification:** whether apps consume TypeScript source via workspace exports or need `tsup` build — decide in ADR / step 02 follow-up. For early DX, TS source exports + bundler resolution is common; confirm with Next/Hono/Vite.

```bash
cd ../..
pnpm install
pnpm --filter @fsab/domain test
pnpm --filter @fsab/domain typecheck
```

## What to create

| Path | Purpose |
|------|---------|
| `packages/domain/src/todo.ts` (or similar) | Entity + invariants (e.g. non-empty title) |
| `packages/domain/src/index.ts` | Public exports |
| `packages/domain/src/*.test.ts` | Pure unit tests |
| ESLint restricted imports | Block `react`, `hono`, `next`, DB drivers |

Example responsibilities (illustrative):

- `createTodo({ title })` → validates and returns a Todo value
- `completeTodo(todo)` → returns completed todo / error

No repository interfaces here if you prefer them in `application` (recommended in this blueprint).

## Good practice

- Zero framework imports
- Tests without mocks
- Small public API surface

## Bad / worst practice

- Fetching inside domain
- Passing `Request` / `Response` objects into domain functions
- Anemic “entities” that are only TypeScript interfaces with all logic in React

## Acceptance criteria

- [ ] `@fsab/domain` (or agreed name) installs in the workspace
- [ ] At least one invariant enforced in code + unit test
- [ ] No imports of UI/HTTP/DB libraries
- [ ] `pnpm --filter <domain> test` passes

## Agent prompt

```text
Implement Docs/walkthrough/03-domain-package only.
Create packages/domain with pure Todo rules and unit tests.
No Hono, React, or database code.
Follow the step README and acceptance criteria.
```

## Next step

[04 — Application layer](../04-application-layer/README.md)

## Related

- [../../knowledge/solid/01-S.md](../../knowledge/solid/01-S.md)
- [../../knowledge/solid/05-D.md](../../knowledge/solid/05-D.md)

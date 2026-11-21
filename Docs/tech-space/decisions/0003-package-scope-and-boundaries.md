# 0003 — Package scope and boundaries

Status: Proposed  
Date: 2026-11-21

## Context

Shared packages need a consistent npm scope and lintable import rules so domain stays framework-free.

## Decision (proposed)

- Scope: `@fsab/*` (Full-Stack Architecture Blueprint) — open to rename
- Enforce: `domain` ← nothing framework-specific; apps may import packages; packages must not import apps
- `packages/ui` is client-safe React only (no Next server APIs)

## Alternatives considered

| Option | Trade-off |
|--------|-----------|
| `@blueprint/*` | More generic; possibly ambiguous |
| No scope | Harder to teach workspace mental model |
| Allow UI to import application directly | Couples rendering to use cases too early; prefer hooks in apps |

## Consequences

- Clear interview story: “where does this import arrow point?”
- ESLint restricted imports required in phase 1

## Needs verification

- Exact scope name availability / preference
- Path alias strategy (`tsconfig` paths vs Node exports)

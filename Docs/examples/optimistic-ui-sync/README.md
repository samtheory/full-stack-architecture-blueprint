# Example: Optimistic UI sync

## What it is

Client updates UI before the server confirms, then reconciles success/failure/conflicts. Domain conflict rules stay out of JSX.

## When to use

- After API contracts are stable
- Teaching perceived performance vs consistency

## When not to use

- When server authority is trivial and optimistic paths add confusion for learners

## Good practice

- Rollback on failure; surface conflicts clearly
- Version/ETag or `updatedAt` for conditional updates
- Shared mutation policy usable by web and mobile

## Bad / worst practice

- **Bad:** mark success in UI and ignore API errors
- **Worst:** duplicate conflicting merge logic in every component

## Patterns

Observer/invalidation, Separation of UI and Domain

## Related concepts

Optimistic UI Sync Example, React Modern Rendering Model

## Where in this repo

Phase 4 — docs stub until Todo + API exist.

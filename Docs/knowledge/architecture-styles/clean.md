# Clean architecture

## What it is

A dependency rule: source code dependencies point **inward** toward entities/use cases. Frameworks and DB are outer details. Closely related to hexagonal; different vocabulary and ring diagram.

## When to use

- Long-lived domain with changing delivery mechanisms
- Teams that want strict import rules

## When not to use

- Over-layering a simple feature into entities/use-cases/gateways/presenters when a function would do
- Cargo-cult folder names without dependency discipline

## Good practice

- Enforce import boundaries in ESLint/TS
- Map DTOs at the edges

## Bad / worst practice

- **Bad:** “clean” folders that still import Prisma in entities
- **Worst:** presenter/view-model ceremony with no UI complexity

## Trade-offs

Discipline and ceremony vs framework independence.

## Related concepts

Hexagonal, DIP

## Where in this repo

We adopt the **dependency rule** without requiring every Uncle Bob folder name.

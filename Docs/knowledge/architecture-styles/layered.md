# Layered architecture

## What it is

Organize code into technical layers (e.g. presentation → application → domain → infrastructure), typically calling **downward**.

## When to use

- Small/medium apps
- Team already thinks in controllers/services/repositories
- Teaching first separation of concerns

## When not to use

- Layers become dumping grounds (`service` does everything)
- You need multiple entry points with strong domain isolation (consider hexagonal)

## Good practice

- Dependencies point inward/down to domain
- Keep layers thin; name by responsibility

## Bad / worst practice

- **Bad:** domain calling UI helpers
- **Worst:** every feature touches all layers with copy-paste

## Trade-offs

Easy to explain; can encourage anemic “pass-through” services.

## Related concepts

Clean Architecture, SRP

## Where in this repo

Mental model for early vertical slice before introducing ports language.

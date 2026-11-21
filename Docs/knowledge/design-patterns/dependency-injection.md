# Dependency injection (DI)

## What it is

A technique to supply a module’s dependencies from the outside rather than constructing them internally. **DI is how we often deliver DIP** — they are not the same thing.

## When to use

- Use cases need repositories/loggers/clocks
- Tests replace deps with fakes

## When not to use

- Passing every transitive dependency through 10 layers (fix with composition)
- Container-heavy frameworks for a 3-route teaching API

## Good practice

- Manual injection in `createApp(deps)` for this repo’s scale
- Composition root only in apps

## Bad / worst practice

- **Bad:** importing concrete adapters inside use cases “just this once”
- **Worst:** ambient global `container.get` scattered in domain

## Trade-offs

Wiring code vs hard-wired dependencies that resist tests.

## Related concepts

DIP, Factory, Hexagonal

## Where in this repo

Hono API composition root (planned).

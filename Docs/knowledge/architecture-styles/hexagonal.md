# Hexagonal architecture (ports & adapters)

## What it is

The domain/application sits in the center. **Ports** are interfaces; **adapters** connect HTTP, UI, and databases at the edges.

## When to use

- Multiple adapters (web, mobile, CLI, several DBs)
- Heavy testing of business rules without infrastructure
- Interview discussions of dependency direction

## When not to use

- CRUD app with one DB and no domain logic — overhead may not pay off
- When the “port” is invented only to name the pattern

## Good practice

- Ports owned by application/domain
- Adapters in infrastructure packages
- Composition root wires edges

## Bad / worst practice

- **Bad:** ports that leak SQL or HTTP types
- **Worst:** adapter-to-adapter calls bypassing the center

## Trade-offs

More types and wiring; clearer boundaries and test fakes.

## Related concepts

DIP, Adapter, Clean Architecture

## Where in this repo

Primary style for API ↔ DB and future auth strategies.

# Dependency Inversion Principle (DIP)

## What it is

High-level modules should not depend on low-level modules. **Both depend on abstractions** (ports). Abstractions should not depend on details; details (adapters) depend on abstractions.

## When to use

- Business rules must not import Hono, React, or `pg`
- You need to test use cases with in-memory fakes
- Multiple delivery mechanisms (web, mobile, CLI) share rules

## When not to use

- A throwaway script with one IO call
- Abstracting a stable, single dependency that never changes

## Good practice

- Use cases depend on `NotesRepository` port
- Composition root in `apps/api` wires Postgres/libSQL adapters
- UI calls API/clients; domain stays pure

## Bad / worst practice

- **Bad:** use case imports `@libsql/client` directly
- **Worst:** domain imports React components “for convenience”

## Trade-offs

Indirection and wiring code vs testability and replaceability.

## Related concepts

Dependency Injection (delivery mechanism), Hexagonal Architecture, Adapter

## Where in this repo

Core teaching goal of the monorepo — see backend + database tech-space docs.

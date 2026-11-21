# Single Responsibility Principle (SRP)

## What it is

A module should have **one reason to change** — one cohesive responsibility, not “one function” literally.

## When to use

- Route handlers growing SQL + validation + email + HTML
- Classes named `Manager`/`Utils` with unrelated methods

## When not to use

- Splitting a five-line helper into three files “for SRP”
- Micro-modules that increase navigation cost without change isolation

## Good practice

- Hono route: validate + call use case
- Use case: orchestrate domain + ports
- Adapter: talk to one external system

## Bad / worst practice

- **Bad:** `UserService` that authenticates, invoices, and renders PDF
- **Worst:** God object updated for every feature in the product

## Trade-offs

More files and indirection vs clearer change boundaries.

## Related concepts

Dependency Inversion, Repository

## Where in this repo

Vertical slice Todo: separate route / use case / DB adapter (planned).

# Open-Closed Principle (OCP)

## What it is

Modules should be **open for extension, closed for modification** — add behavior via new code (strategies, adapters), not endless edits to a switch in a core file.

## When to use

- New payment/session/DB vendors keep appearing
- Core workflow is stable but variants multiply

## When not to use

- You have one variant and no second is planned — premature strategy hierarchy
- Spec is still discovering the core flow (expect modification)

## Good practice

- New DB vendor = new adapter implementing the same port
- Auth mode = strategy behind a port

## Bad / worst practice

- **Bad:** 40-case `switch (type)` in a domain service edited weekly
- **Worst:** Copy-paste the whole service per vendor

## Trade-offs

Extension points need a stable interface; wrong abstractions are expensive.

## Related concepts

Strategy, Adapter, Dependency Inversion

## Where in this repo

Database adapters; auth session strategies (planned).

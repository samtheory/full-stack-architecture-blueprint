# Interface Segregation Principle (ISP)

## What it is

Prefer **small, focused interfaces** over fat ones that force clients to depend on methods they do not use.

## When to use

- Callers only need `get`/`save` but the interface requires `analytics`, `reindex`, `bulkImport`
- Mocking a fat interface is painful in tests

## When not to use

- Exploding into dozens of one-method interfaces with no coherence
- When one client truly uses the whole surface

## Good practice

- Read vs write ports if clients differ (`NotesReader`, `NotesWriter`)
- Separate admin operations from user-facing repository methods

## Bad / worst practice

- **Bad:** `IUnitOfWorkAndEverything` injected everywhere
- **Worst:** Empty method stubs “to satisfy the interface”

## Trade-offs

More types to name and wire vs leaner dependents and fakes.

## Related concepts

Repository, Dependency Inversion

## Where in this repo

Keep first Todo port small; split only when a second client needs a subset (planned discipline).

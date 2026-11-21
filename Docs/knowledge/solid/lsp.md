# Liskov Substitution Principle (LSP)

## What it is

Subtypes (or adapters implementing a port) must be **usable wherever the contract is expected** without breaking callers’ assumptions.

## When to use

- Multiple adapters behind one interface
- Inheritance or “is-a” modeling

## When not to use

- Forcing unrelated types under one interface to “reuse” a helper
- Inheritance when composition is clearer

## Good practice

- All DB adapters honor the same repository contract (including error semantics)
- Document capability gaps with flags — do not silently no-op

## Bad / worst practice

- **Bad:** `delete()` throws in one adapter and no-ops in another
- **Worst:** Base class with methods children must “not call”

## Trade-offs

Strict contracts may require splitting ports (see ISP) instead of one fat interface.

## Related concepts

Interface Segregation, Adapter, Repository

## Where in this repo

Contract tests across libSQL / MariaDB / PostgreSQL adapters (planned).

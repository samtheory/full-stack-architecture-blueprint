# Factory pattern

## What it is

Centralizes creation logic so callers request a product without knowing the concrete class.

## When to use

- `createDb(config)` returns the correct vendor client/adapter
- Test suites swap in-memory implementations via factory

## When not to use

- `new` is clear and singular
- Abstract factory trees with one product ever

## Good practice

- Factory lives near composition/config, not inside domain entities
- Fail fast on unknown `DATABASE_DRIVER`

## Bad / worst practice

- **Bad:** factory hidden behind service locator globals
- **Worst:** reflection magic to invent classes by string everywhere

## Trade-offs

Single creation point vs indirection.

## Related concepts

Adapter, DI

## Where in this repo

DB driver selection; see multi-db notes example.

# Strategy pattern

## What it is

Define a family of interchangeable algorithms behind a common interface; select at runtime.

## When to use

- Auth modes (session cookie vs bearer) with shared application flow
- Pricing/tax variants, retry policies

## When not to use

- Two near-identical functions that will never vary independently
- Replacing a simple `if` that runs once at startup with a hierarchy

## Good practice

- Strategy interface owned by application layer
- Selection in composition root / config

## Bad / worst practice

- **Bad:** strategies that need to know Hono `Context`
- **Worst:** strategy explosion for every boolean flag

## Trade-offs

Flexibility vs number of types.

## Related concepts

OCP, DIP

## Where in this repo

Auth session example (planned).

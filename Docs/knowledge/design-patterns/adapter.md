# Adapter pattern

## What it is

Converts one interface into another the client expects. In hexagonal terms: **implements a port** for an external technology.

## When to use

- Vendor SDKs (pg, mysql, libsql) behind a stable port
- Capacitor plugin wrapped for the app

## When not to use

- Wrapping your own simple function with no mismatch
- Adapter that only renames methods without isolating anything

## Good practice

- Keep vendor types inside the adapter file/package
- Document behavioral differences honestly

## Bad / worst practice

- **Bad:** “adapter” that re-exports the SDK unchanged into domain
- **Worst:** catching all errors and returning null everywhere

## Trade-offs

Boilerplate vs isolation and replaceability.

## Related concepts

Hexagonal, LSP, OCP

## Where in this repo

`packages/db` vendor adapters; mobile secure storage (planned).

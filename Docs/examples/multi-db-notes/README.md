# Example: Multi-DB notes

## What it is

Same Notes feature running against **libSQL, MariaDB, and PostgreSQL** via adapters. Emphasizes **meaningful differences** (UPSERT, JSON, booleans, RETURNING).

## When to use

- After one adapter works end-to-end
- Interview question: “How would you support multiple databases?”

## Good practice

- Contract test suite shared across adapters
- Capability flags instead of fake universal SQL
- Factory: `DATABASE_DRIVER` → adapter

## Bad / worst practice

- **Bad:** `if (driver)` inside use cases
- **Worst:** claiming portable SQL without running three engines

## Patterns

Adapter, Factory, LSP, Repository

## Related concepts

Database Adapter Package, Multi-DB Notes Example

## Needs verification

- Docker/testcontainers on contributor OS
- Migration approach per vendor

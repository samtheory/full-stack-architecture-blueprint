# Repository pattern

## What it is

Mediates between domain and data mapping; presents a **collection-like interface** for aggregates/entities.

## When to use

- You want use cases free of SQL/SDK details
- Multiple data sources behind one contract

## When not to use

- Single trivial query in a script
- Generic `Repository<T>` with no domain meaning

## Good practice

- Methods named in domain language (`listIncompleteTodos`)
- One repository per aggregate/consistency boundary

## Bad / worst practice

- **Bad:** repository that returns HTTP DTOs and sends emails
- **Worst:** leaking `DbConnection` through the repository API

## Trade-offs

Extra layer vs testability and swap-ability.

## Related concepts

Adapter, ISP, DIP

## Where in this repo

Todo and notes persistence ports (planned).

# Modular monolith

## What it is

One deployable unit with **hard module boundaries** (packages/domains) and clear APIs between modules — without network calls between them.

## When to use

- Product still exploring bounded contexts
- Team wants microservice-like boundaries without ops cost
- Teaching modularity before distributed systems

## When not to use

- Hard requirement for independent deploy/scale per domain
- Modules secretly share a tangled database with no ownership

## Good practice

- Package boundaries + ownership of tables
- Synchronous in-process calls; explicit public module API

## Bad / worst practice

- **Bad:** “modules” that import each other’s internals freely
- **Worst:** distributed monolith later without fixing boundaries first

## Trade-offs

Simpler ops than microservices; requires discipline so it does not rot into a blob.

## Related concepts

Microservices, Monorepo Structure

## Where in this repo

Default packaging story: one API deployable, multiple packages.

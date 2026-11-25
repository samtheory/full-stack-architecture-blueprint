# SOLID principles

SOLID is five design guidelines for maintainable modular code. None is absolute; each has costs when over-applied.

Study with the **dummy → CTO** ladder on each page (diagram → worst/best → seams → trade-offs). Full path: [`../COURSE.md`](../COURSE.md) Track A. Page shape: [`../_PAGE-TEMPLATE.md`](../_PAGE-TEMPLATE.md).

| Order | Letter | Principle | Page | Dummy takeaway |
|-------|--------|-----------|------|----------------|
| 01 | S | Single Responsibility | [01-S.md](01-S.md) | One reason to change per module |
| 02 | O | Open-Closed | [02-O.md](02-O.md) | Extend via new adapters/strategies, not edits |
| 03 | L | Liskov Substitution | [03-L.md](03-L.md) | Adapters must honor the port contract |
| 04 | I | Interface Segregation | [04-I.md](04-I.md) | Small ports (read vs write) |
| 05 | D | Dependency Inversion | [05-D.md](05-D.md) | High-level policy owns the abstractions |

Each principle page includes **when to use**, **Hono worst/best**, **React worst/best**, and trade-offs.

**Interview tip:** explain a violation you fixed and the trade-off — not a memorized acronym list.

**Related:** [../design-patterns/dependency-injection.md](../design-patterns/dependency-injection.md) · [../architecture-styles/hexagonal.md](../architecture-styles/hexagonal.md) · [../../tech-space/backend-architecture.md](../../tech-space/backend-architecture.md)

# Knowledge tracks index (architecture depth)

Wave **1.2** wiring page: study **judgment** lessons in this folder, then dive into [`../../knowledge/COURSE.md`](../../knowledge/COURSE.md) for styles and patterns. Do **not** duplicate those essays here.

## How to use

1. Complete [SA-01](SA-01-what-architecture-is.md) → [SA-02](SA-02-nfrs.md) → [SA-03](SA-03-c4.md) → [SA-10](SA-10-capacity.md).
2. Walk knowledge tracks below (Dummy→CTO already on most pages).
3. Return here for SA-09/11/14 when those lessons are implemented.

---

## Map: course SA-* ↔ knowledge COURSE

| Course topic | Knowledge track / page | Status |
|--------------|------------------------|--------|
| SA-04 Styles catalog | [architecture-styles README](../../knowledge/architecture-styles/README.md) · COURSE Track B–E | link |
| SA-05 Modular monolith vs microservices | [modular-monolith](../../knowledge/architecture-styles/modular-monolith.md) · [microservices](../../knowledge/architecture-styles/microservices.md) | link |
| SA-06 Hexagonal / Clean / layered | [hexagonal](../../knowledge/architecture-styles/hexagonal.md) · [clean](../../knowledge/architecture-styles/clean.md) · [layered](../../knowledge/architecture-styles/layered.md) | link |
| SA-07 DDD | [domain-driven-design](../../knowledge/architecture-styles/domain-driven-design.md) · COURSE Track C | link |
| SA-08 Events / CQRS / ES | [event-driven](../../knowledge/architecture-styles/event-driven.md) · [cqrs](../../knowledge/architecture-styles/cqrs.md) · [event-sourcing](../../knowledge/architecture-styles/event-sourcing.md) | link |
| SA-12 Rules enforcement | [architecture-rules](../../knowledge/architecture-styles/architecture-rules.md) | link |
| SA-13 Combinations + stack | [combination guide](../../knowledge/architecture-styles/architecture-combination-guide.md) · [react-next-hono recommendations](../../knowledge/architecture-styles/react-next-hono-recommendations.md) | link |
| Patterns / SOLID | COURSE Tracks A + F · [`../../knowledge/solid`](../../knowledge/solid/README.md) · [`../../knowledge/design-patterns`](../../knowledge/design-patterns/README.md) | link |

---

## Recommended study sprint (1–2 weeks)

| Day focus | Do |
|-----------|----|
| 1 | SA-01, SA-02 |
| 2 | SA-03 + draw L1/L2 for this repo |
| 3 | Knowledge Track A (SOLID + DI + Repository) |
| 4 | Track B: layered → vertical slice → hexagonal → modular monolith |
| 5 | SA-10 + skim microservices (contrast only) |
| 6 | Track G: rules + recommendations |
| 7 | Skim Track C/D as interest; note questions for ADRs |

```mermaid
flowchart LR
  SA[SA-01..03, SA-10] --> KA[knowledge COURSE A–B]
  KA --> Rules[architecture-rules]
  Rules --> Cap[Later SA-14 capstone]
```

## Gaps filled by this category (not only knowledge)

| Gap | Lesson |
|-----|--------|
| What architecture means | SA-01 |
| NFRs / quality attributes | SA-02 |
| C4 diagramming | SA-03 |
| Capacity / bottlenecks | SA-10 |
| Integration patterns | SA-09 — planned |
| Evolutionary architecture | SA-11 — planned |
| Capstone C4 + ADRs | SA-14 — Phase 1.3 |

## Related

- [`../../knowledge/COURSE.md`](../../knowledge/COURSE.md)
- [`../../tech-space/project-blueprint.md`](../../tech-space/project-blueprint.md)
- [`../TRACKS.md`](../TRACKS.md) Track A

# Architecture course — dummy → CTO

Ordered path through `Docs/knowledge/` so you can **understand, choose, and implement** architectures — from a toy diagram to CTO-grade trade-offs.

For the **full career curriculum** (Hono/Bun, React/Next, databases, Docker/K8s/Terraform, CI/CD, soft skills, CTO), use [`../course/`](../course/README.md) and implement waves via [`../course/PLAN.md`](../course/PLAN.md). This file remains the architecture/knowledge track.

**Default stack in examples:** pnpm monorepo · Next.js web · Capacitor mobile · Hono API · domain/application packages · DB port + adapters.

**Teaching stance of this repo:** modular monolith + vertical slices + hexagonal edges + DDD only where complexity pays · logical CQRS before physical split · events for async side effects.

---

## How to study each page

1. **Dummy** — read the 30-second picture and diagram first.
2. **Working** — sketch the folders; rewrite the “worst” snippet into the “best”.
3. **Rich** — write one unit test that needs no DB/HTTP.
4. **CTO** — answer: adopt now, defer, or reject? What ADR would you open?

Template: [`_PAGE-TEMPLATE.md`](_PAGE-TEMPLATE.md).

---

## Track A — Foundations (start here)

| # | Topic | Page | Outcome |
|---|--------|------|---------|
| A1 | SOLID overview | [solid/README.md](solid/README.md) | Name the five pressures |
| A2 | SRP | [solid/01-S.md](solid/01-S.md) | Split HTTP / use case / domain / UI |
| A3 | OCP | [solid/02-O.md](solid/02-O.md) | Extend via ports, not edits |
| A4 | LSP | [solid/03-L.md](solid/03-L.md) | Adapters keep contracts |
| A5 | ISP | [solid/04-I.md](solid/04-I.md) | Small ports for readers vs writers |
| A6 | DIP | [solid/05-D.md](solid/05-D.md) | Depend on abstractions you own |
| A7 | DI | [design-patterns/dependency-injection.md](design-patterns/dependency-injection.md) | Wire at composition root |
| A8 | Repository | [design-patterns/repository.md](design-patterns/repository.md) | Persist aggregates without SQL leak |
| A9 | Adapter | [design-patterns/adapter.md](design-patterns/adapter.md) | Vendor SDKs stay at the edge |
| A10 | Strategy | [design-patterns/strategy.md](design-patterns/strategy.md) | Swap algorithms behind an interface |

---

## Track B — Core architecture styles

| # | Topic | Page | Outcome |
|---|--------|------|---------|
| B1 | Layered | [architecture-styles/layered.md](architecture-styles/layered.md) | First separation by technical job |
| B2 | Vertical slice | [architecture-styles/vertical-slice.md](architecture-styles/vertical-slice.md) | Organize by feature use case |
| B3 | Hexagonal | [architecture-styles/hexagonal.md](architecture-styles/hexagonal.md) | Ports & adapters; multi-DB ready |
| B4 | Clean | [architecture-styles/clean.md](architecture-styles/clean.md) | Dependency rule toward entities |
| B5 | Modular monolith | [architecture-styles/modular-monolith.md](architecture-styles/modular-monolith.md) | Business modules, one deploy |
| B6 | Monorepo | [architecture-styles/monorepo.md](architecture-styles/monorepo.md) | Apps + packages boundaries |
| B7 | Microservices | [architecture-styles/microservices.md](architecture-styles/microservices.md) | When split is worth the cost |

---

## Track C — Domain & communication

| # | Topic | Page |
|---|--------|------|
| C1 | DDD | [architecture-styles/domain-driven-design.md](architecture-styles/domain-driven-design.md) |
| C2 | Event-driven | [architecture-styles/event-driven.md](architecture-styles/event-driven.md) |
| C3 | CQRS | [architecture-styles/cqrs.md](architecture-styles/cqrs.md) |
| C4 | Event sourcing | [architecture-styles/event-sourcing.md](architecture-styles/event-sourcing.md) |
| C5 | Plugin / microkernel | [architecture-styles/plugin-microkernel.md](architecture-styles/plugin-microkernel.md) |

---

## Track D — Frontend organization

| # | Topic | Page |
|---|--------|------|
| D1 | Feature-Sliced Design | [architecture-styles/feature-sliced-design.md](architecture-styles/feature-sliced-design.md) |
| D2 | Modular frontend | [architecture-styles/modular-frontend.md](architecture-styles/modular-frontend.md) |
| D3 | BFF | [architecture-styles/bff.md](architecture-styles/bff.md) |
| D4 | React modern rendering | [react-rendering/modern-lifecycle.md](react-rendering/modern-lifecycle.md) |
| D5 | Legacy class lifecycle | [react-rendering/legacy-class-lifecycle.md](react-rendering/legacy-class-lifecycle.md) |

---

## Track E — Edges, scale, migration

| # | Topic | Page |
|---|--------|------|
| E1 | API Gateway | [architecture-styles/api-gateway.md](architecture-styles/api-gateway.md) |
| E2 | Serverless | [architecture-styles/serverless.md](architecture-styles/serverless.md) |
| E3 | SOA | [architecture-styles/soa.md](architecture-styles/soa.md) |
| E4 | Self-contained systems | [architecture-styles/self-contained-systems.md](architecture-styles/self-contained-systems.md) |
| E5 | Strangler fig | [architecture-styles/strangler-fig.md](architecture-styles/strangler-fig.md) |

---

## Track F — Design pattern catalog

Study by need, not by memorizing the catalog. Index: [design-patterns/README.md](design-patterns/README.md).

Suggested order after Track A: Factory → Facade → Decorator → Proxy → Command → Observer → State → Chain of Responsibility → then the rest as you hit the problem.

---

## Track G — Decide and enforce (CTO close)

| # | Topic | Page |
|---|--------|------|
| G1 | Combination guide | [architecture-styles/architecture-combination-guide.md](architecture-styles/architecture-combination-guide.md) |
| G2 | Stack recommendations | [architecture-styles/react-next-hono-recommendations.md](architecture-styles/react-next-hono-recommendations.md) |
| G3 | Architecture rules | [architecture-styles/architecture-rules.md](architecture-styles/architecture-rules.md) |
| G4 | Project blueprint | [../tech-space/project-blueprint.md](../tech-space/project-blueprint.md) |
| G5 | ADRs | [../tech-space/decisions/README.md](../tech-space/decisions/README.md) |

---

## Capstone exercises

1. **Dummy → Working:** Add a “rename listing title” slice across web + Hono without leaking SQL into the route.
2. **Working → Rich:** Introduce a DB port; add an in-memory adapter test and a Postgres adapter.
3. **Rich → CTO:** Write an ADR: stay modular monolith vs extract `billing` as a service — include cost and rollback.
4. **Diagram:** Produce C4 context + container for this blueprint’s apps and packages.

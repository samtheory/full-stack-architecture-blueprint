# Architecture styles

Styles are **organizational patterns for the whole system**, not drop-in libraries. This repo demonstrates several and explains **when each fits**. None is universally best.

Most pages include fit tables for React / Next.js / Hono, core rules, Mermaid diagrams, folder structures, TypeScript examples, testing, mistakes, migration, and related styles.

## Core styles (this repo’s originals)

| Style | Page | One-line fit | What the folders follow |
|-------|------|--------------|-------------------------|
| Layered | [layered.md](layered.md) | Simple apps with clear technical layers | Technical job: presentation, application, domain, infrastructure |
| Hexagonal | [hexagonal.md](hexagonal.md) | Domain isolated from UI/DB/HTTP | A center of ports, plus driving and driven adapters |
| Clean | [clean.md](clean.md) | Strict dependency rule toward domain | Rings: entities, use cases, interface adapters, frameworks |
| Modular monolith | [modular-monolith.md](modular-monolith.md) | One deployable, strong module boundaries | Business module, in-process calls, one deploy |
| Microservices | [microservices.md](microservices.md) | Independent deploy/scale — costly | Same business modules, each with its own deploy and database |

## Additional styles and patterns

| Style | Page | One-line fit | Primary category |
|-------|------|--------------|------------------|
| Vertical Slice | [vertical-slice.md](vertical-slice.md) | Organize by feature use case end-to-end | Internal backend / frontend design |
| Feature-Sliced Design | [feature-sliced-design.md](feature-sliced-design.md) | Frontend layers with strict import rules | Frontend organization |
| Domain-Driven Design | [domain-driven-design.md](domain-driven-design.md) | Model software after complex business domains | Domain modeling |
| Event-Driven | [event-driven.md](event-driven.md) | Async facts connect modules/services | Communication style |
| CQRS | [cqrs.md](cqrs.md) | Separate write commands from read queries | Read/write design |
| Event Sourcing | [event-sourcing.md](event-sourcing.md) | Store events as source of truth | Read/write design |
| Serverless / Function-Oriented | [serverless.md](serverless.md) | Deploy discrete functions that scale per use | Deployment topology |
| Backend for Frontend | [bff.md](bff.md) | Client-specific API façade | Integration boundary |
| Plugin / Microkernel | [plugin-microkernel.md](plugin-microkernel.md) | Stable core + registerable extensions | Extensibility |
| Service-Oriented Architecture | [soa.md](soa.md) | Coarse reusable business capability services | Deployment / integration |
| Self-Contained Systems | [self-contained-systems.md](self-contained-systems.md) | Autonomous UI+API+DB verticals | Deployment topology |
| Monorepo | [monorepo.md](monorepo.md) | Multiple apps/packages in one repository | Repository organization |
| Modular frontend | [modular-frontend.md](modular-frontend.md) | Owned UI modules with public APIs | Frontend organization |
| API Gateway | [api-gateway.md](api-gateway.md) | Edge entry for routing and policy | Integration boundary |
| Strangler Fig | [strangler-fig.md](strangler-fig.md) | Incremental legacy cutover behind a façade | Migration strategy |

## Guides

| Guide | Page | Purpose |
|-------|------|---------|
| Combination guide | [architecture-combination-guide.md](architecture-combination-guide.md) | Which architectures combine, at what level, with compatibility matrix |
| Stack recommendations | [react-next-hono-recommendations.md](react-next-hono-recommendations.md) | Opinionated defaults for React + Next.js + Hono by product size |
| Architecture rules | [architecture-rules.md](architecture-rules.md) | Enforceable dependency, module, testing, and communication rules |

**This repo’s default teaching stance:** modular monolith with vertical slices, hexagonal ports/adapters at persistence and HTTP edges, DDD only where the domain is truly complex, events for async side effects, logical CQRS before physical separation — still one (or few) deployables unless a lesson needs services.

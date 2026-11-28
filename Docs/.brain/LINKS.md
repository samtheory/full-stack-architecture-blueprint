# Explicit concept links

Edges for humans and Graphify. Prefer these over inventing new relationships.

Relation types: `teaches`, `uses`, `implements`, `contrasts`, `contains`, `depends-on`, `demonstrates`.

## Project → architecture

| From | Relation | To | Note |
|------|----------|----|------|
| Project Blueprint | contains | Monorepo Structure | Proposed apps/packages |
| Project Blueprint | contains | Tooling Stack | pnpm, Turborepo, Vitest, etc. |
| Project Blueprint | contains | Hono Backend API | Validation, DI, errors, logging |
| Project Blueprint | contains | Database Adapter Package | libSQL / MariaDB / PostgreSQL |
| Learning Path | uses | Vertical Slice | First runnable story |
| Learning Path | uses | Walkthrough | Ordered implementation steps |
| Learning Path | uses | Architecture Course | Narrative curriculum in Docs/knowledge/COURSE.md |
| Learning Path | uses | Career Course | Full stack + platform + soft skills + CTO plans |
| Career Course | contains | Career Course Plan | Phased lesson implementation |
| Career Course | uses | Architecture Course | Architecture depth stays in knowledge/ |
| Career Course | teaches | Foundations HTTP | Wave 1.1 |
| Career Course | teaches | TypeScript for Architects | Wave 1.1 |
| Career Course | teaches | Git Workflows | Wave 1.1 |
| Career Course | teaches | Debugging Discipline | Wave 1.1 |
| Foundations HTTP | depends-on | TypeScript for Architects | Contracts at HTTP edge |
| Debugging Discipline | uses | Git Workflows | bisect / revert |
| Debugging Discipline | uses | Foundations HTTP | status + request_id |
| Career Course | teaches | What Architecture Is | Wave 1.2 |
| Career Course | teaches | Quality Attributes NFRs | Wave 1.2 |
| Career Course | teaches | C4 Model | Wave 1.2 |
| Career Course | teaches | Capacity Planning | Wave 1.2 |
| Knowledge Tracks Index | uses | Architecture Course | Links COURSE tracks A–G |
| What Architecture Is | depends-on | Quality Attributes NFRs | NFRs drive decisions |
| C4 Model | demonstrates | Project Blueprint | L1/L2 map to apps/packages |
| Capacity Planning | depends-on | Quality Attributes NFRs | Targets before sizing |
| Career Course | teaches | Architecture Capstone C4 ADR | Phase 1.3 |
| Architecture Capstone C4 ADR | uses | C4 Model | L1/L2 deliverables |
| Architecture Capstone C4 ADR | uses | Project Blueprint | Container map |
| Architecture Capstone C4 ADR | uses | Architecture Course | Styles judgment before ADR |
| Career Course | teaches | Bun Runtime Course | Phase 2.1 |
| Career Course | teaches | Hono Hello Course | Phase 2.1 |
| Career Course | teaches | Hono Routing Middleware Course | Phase 2.1 |
| Hono Hello Course | depends-on | Bun Runtime Course | Runtime entry |
| Hono Routing Middleware Course | depends-on | Hono Hello Course | createApp mounts |
| Hono Hello Course | demonstrates | Hono Backend API | clouds/market-place-server |
| Career Course | teaches | Zod Validation Course | Phase 2.2 |
| Career Course | teaches | Hono Error Model Course | Phase 2.2 |
| Career Course | teaches | Auth Session JWT Course | Phase 2.2 |
| Zod Validation Course | depends-on | Hono Routing Middleware Course | Parse at route edge |
| Hono Error Model Course | depends-on | Zod Validation Course | Map VALIDATION → 400 |
| Auth Session JWT Course | depends-on | Hono Error Model Course | 401/403 envelope |
| Auth Session JWT Course | uses | Auth Session Example | Docs/examples/auth-session |
| Career Course | teaches | Composition Root DI Course | Phase 2.3 |
| Career Course | teaches | Workers Queues Course | Phase 2.3 |
| Career Course | teaches | API Versioning Course | Phase 2.3 |
| Composition Root DI Course | demonstrates | createApp() | Expand CreateAppDeps |
| Composition Root DI Course | uses | Dependency Injection | Manual DI |
| Workers Queues Course | depends-on | Composition Root DI Course | Worker shares ports |
| API Versioning Course | depends-on | Hono Routing Middleware Course | /v1 mounts |
| Career Course | teaches | Uploads Webhooks Course | Phase 2.4 |
| Career Course | teaches | Rate Limits Idempotency Course | Phase 2.4 |
| Career Course | teaches | Testing Hono Course | Phase 2.4 |
| Career Course | teaches | Hono Observability Course | Phase 2.4 |
| Career Course | teaches | Bun CTO Course | Phase 2.4 |
| Uploads Webhooks Course | depends-on | Workers Queues Course | Async webhook handling |
| Rate Limits Idempotency Course | depends-on | Foundations HTTP | Headers / 429 |
| Testing Hono Course | depends-on | Composition Root DI Course | Fake deps |
| Hono Observability Course | depends-on | Hono Error Model Course | requestId on errors |
| Bun CTO Course | depends-on | Bun Runtime Course | Local vs prod ADR |
| Career Course | teaches | React Mental Model Course | Phase 3.1 |
| Career Course | teaches | React Hooks State Course | Phase 3.1 |
| Career Course | teaches | React Data Fetching Course | Phase 3.1 |
| React Mental Model Course | uses | React Modern Rendering Model | knowledge deep dive |
| React Hooks State Course | depends-on | React Mental Model Course | State after render model |
| React Data Fetching Course | depends-on | React Hooks State Course | Server vs UI state |
| React Data Fetching Course | depends-on | Hono Hello Course | /v1 API client |
| Career Course | teaches | Next App Router Course | Phase 3.2 |
| Career Course | teaches | RSC Client Components Course | Phase 3.2 |
| Career Course | teaches | Forms Mutations Course | Phase 3.2 |
| Next App Router Course | depends-on | React Mental Model Course | Routing after React basics |
| RSC Client Components Course | depends-on | Next App Router Course | app/ defaults |
| Forms Mutations Course | depends-on | React Data Fetching Course | Mutations + cache |
| Forms Mutations Course | depends-on | Zod Validation Course | Shared contracts |
| Career Course | teaches | FSD Feature Folders Course | Phase 3.3 |
| Career Course | teaches | Frontend Performance Course | Phase 3.3 |
| Career Course | teaches | A11y i18n Course | Phase 3.3 |
| FSD Feature Folders Course | depends-on | Next App Router Course | Thin routes |
| FSD Feature Folders Course | related-to | Feature-Sliced Design (FSD) | Knowledge depth |
| Frontend Performance Course | depends-on | RSC Client Components Course | JS boundaries |
| Frontend Performance Course | depends-on | React Data Fetching Course | Waterfalls |
| A11y i18n Course | depends-on | Forms Mutations Course | Form a11y |
| Career Course | teaches | Auth UX BFF Course | Phase 3.4 |
| Career Course | teaches | CTO SPA Next Mobile Course | Phase 3.4 |
| Auth UX BFF Course | depends-on | Auth Session JWT Course | Server verifies |
| Auth UX BFF Course | related-to | BFF Knowledge | Client façade |
| CTO SPA Next Mobile Course | depends-on | Auth UX BFF Course | Shell + auth |
| CTO SPA Next Mobile Course | related-to | Project Blueprint | Default apps |
| Career Course | teaches | SQL Core Course | Phase 4.1 |
| Career Course | teaches | Postgres Essentials Course | Phase 4.1 |
| Career Course | teaches | MariaDB Differences Course | Phase 4.1 |
| SQL Core Course | related-to | Database Adapter Package | Port preview |
| Postgres Essentials Course | depends-on | SQL Core Course | Types after model |
| MariaDB Differences Course | depends-on | Postgres Essentials Course | Dialect contrast |
| MariaDB Differences Course | related-to | Database Adapter Package | Multi-engine |
| Career Course | teaches | SQLite libSQL Course | Phase 4.2 |
| Career Course | teaches | Migrations Course | Phase 4.2 |
| Career Course | teaches | Indexes EXPLAIN Course | Phase 4.2 |
| SQLite libSQL Course | depends-on | SQL Core Course | Embedded SQL |
| SQLite libSQL Course | related-to | libSQL Adapter | Walkthrough 07 |
| Migrations Course | depends-on | Postgres Essentials Course | Server DDL |
| Indexes EXPLAIN Course | depends-on | Migrations Course | Indexes as migrations |
| Indexes EXPLAIN Course | related-to | Capacity Planning | Realistic cardinality |
| Career Course | teaches | Transactions Isolation Course | Phase 4.3 |
| Career Course | teaches | Port Adapters DB Course | Phase 4.3 |
| Transactions Isolation Course | depends-on | SQL Core Course | Multi-write integrity |
| Port Adapters DB Course | depends-on | Transactions Isolation Course | UoW on ports |
| Port Adapters DB Course | related-to | Database Adapter Package | ADR 0002 |
| Port Adapters DB Course | related-to | Dependency Inversion | Ports inward |
| Walkthrough | contains | Monorepo Setup Step | Step 01 |
| Walkthrough | demonstrates | Monorepo Structure | Built in steps 01–02 |
| Vertical Slice | demonstrates | Dependency Inversion | Domain independent of Hono/UI/DB |
| Vertical Slice | demonstrates | Adapter | DB vendor adapters |
| Vertical Slice | demonstrates | Repository | Optional persistence port |

## Styles → when

| From | Relation | To | Note |
|------|----------|----|------|
| Layered Architecture | contrasts | Hexagonal Architecture | Direction of dependencies |
| Hexagonal Architecture | teaches | Port and Adapter Boundary | Ports = interfaces |
| Clean Architecture | uses | Dependency Inversion | Inner domain, outer frameworks |
| Modular Monolith | contrasts | Microservices | Deploy unit vs module boundary |
| Microservices | contrasts | Modular Monolith | Network cost vs isolation |

## SOLID → patterns

| From | Relation | To | Note |
|------|----------|----|------|
| Dependency Inversion | uses | Dependency Injection | DI is a delivery mechanism for DIP |
| Dependency Inversion | uses | Adapter | Adapters sit at the edge |
| Open-Closed | uses | Strategy | Swap behavior without editing callers |
| Interface Segregation | contrasts | Repository | Fat repos violate ISP |
| Liskov Substitution | depends-on | Adapter | Vendor adapters must honor the port contract |
| Single Responsibility | teaches | Hono Backend API | Route ≠ use-case ≠ persistence |

## Frontend

| From | Relation | To | Note |
|------|----------|----|------|
| React Modern Rendering Model | contrasts | Legacy Class Lifecycle | Legacy is comparison-only |
| Next.js Web App | depends-on | Shared Domain Package | No business rules in JSX |
| Capacitor Mobile App | depends-on | Shared Domain Package | Same use-cases as web where practical |
| Optimistic UI Sync Example | uses | Observer | Local state / invalidation patterns |

## Backend / data

| From | Relation | To | Note |
|------|----------|----|------|
| Hono Backend API | depends-on | API Validation | Zod (planned) at the edge |
| Hono Backend API | depends-on | Error Handling | Typed app errors → HTTP mapping |
| Hono Backend API | depends-on | Dependency Injection | Compose ports in composition root |
| Database Adapter Package | implements | Port and Adapter Boundary | One port, three adapters |
| libSQL Adapter | contrasts | PostgreSQL Adapter | SQL dialects and features differ |
| MariaDB Adapter | contrasts | PostgreSQL Adapter | Do not hide meaningful differences |
| Multi-DB Notes Example | demonstrates | Database Adapter Package | Same feature, swap driver |

## Examples → teaching goals

| From | Relation | To | Note |
|------|----------|----|------|
| Auth Session Example | demonstrates | Strategy | Session vs token strategies (planned) |
| Auth Session Example | teaches | Security & observability | Cookies, CSRF, logging redaction |
| Multi-DB Notes Example | demonstrates | Factory | Adapter factory from config |
| Optimistic UI Sync Example | demonstrates | Separation of UI and Domain | Retry/conflict policy outside components |

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

# Concept registry

Canonical nodes for this repository. Prefer these names in docs, code comments (`# NOTE:` / `# WHY:` once code exists), and Graphify queries.

Status: `doc` = documented only; `planned` = will appear in code; `code` = implemented (none yet).

## Project hubs

| Concept | Status | Primary doc |
|---------|--------|-------------|
| Full-Stack Architecture Blueprint | doc | [../../README.md](../../README.md) |
| Project Blueprint | doc | [../tech-space/project-blueprint.md](../tech-space/project-blueprint.md) |
| Monorepo Structure | doc | [../tech-space/monorepo-structure.md](../tech-space/monorepo-structure.md) |
| Tooling Stack | doc | [../tech-space/tooling.md](../tech-space/tooling.md) |
| Learning Path | doc | Blueprint § Learning path |
| Walkthrough | doc | [../walkthrough/README.md](../walkthrough/README.md) |
| Monorepo Setup Step | doc | [../walkthrough/01-monorepo-setup/README.md](../walkthrough/01-monorepo-setup/README.md) |
| Vertical Slice | doc | [../examples/vertical-slice-todo/README.md](../examples/vertical-slice-todo/README.md) |

## Applications (planned)

| Concept | Status | Primary doc |
|---------|--------|-------------|
| Next.js Web App | planned | [../tech-space/frontend-architecture.md](../tech-space/frontend-architecture.md) |
| Capacitor Mobile App | planned | [../tech-space/mobile-architecture.md](../tech-space/mobile-architecture.md) |
| Hono Backend API | planned | [../tech-space/backend-architecture.md](../tech-space/backend-architecture.md) |
| Shared Domain Package | planned | Monorepo structure |
| Database Adapter Package | planned | [../tech-space/database-abstraction.md](../tech-space/database-abstraction.md) |

## Architecture styles

| Concept | Status | Primary doc |
|---------|--------|-------------|
| Layered Architecture | doc | [../knowledge/architecture-styles/layered.md](../knowledge/architecture-styles/layered.md) |
| Hexagonal Architecture | doc | [../knowledge/architecture-styles/hexagonal.md](../knowledge/architecture-styles/hexagonal.md) |
| Clean Architecture | doc | [../knowledge/architecture-styles/clean.md](../knowledge/architecture-styles/clean.md) |
| Modular Monolith | doc | [../knowledge/architecture-styles/modular-monolith.md](../knowledge/architecture-styles/modular-monolith.md) |
| Microservices | doc | [../knowledge/architecture-styles/microservices.md](../knowledge/architecture-styles/microservices.md) |

## SOLID

| Concept | Status | Primary doc |
|---------|--------|-------------|
| Single Responsibility | doc | [../knowledge/solid/01-S.md](../knowledge/solid/01-S.md) |
| Open-Closed | doc | [../knowledge/solid/02-O.md](../knowledge/solid/02-O.md) |
| Liskov Substitution | doc | [../knowledge/solid/03-L.md](../knowledge/solid/03-L.md) |
| Interface Segregation | doc | [../knowledge/solid/04-I.md](../knowledge/solid/04-I.md) |
| Dependency Inversion | doc | [../knowledge/solid/05-D.md](../knowledge/solid/05-D.md) |

## Design patterns (in scope)

| Concept | Status | Primary doc |
|---------|--------|-------------|
| Repository | doc | [../knowledge/design-patterns/repository.md](../knowledge/design-patterns/repository.md) |
| Adapter | doc | [../knowledge/design-patterns/adapter.md](../knowledge/design-patterns/adapter.md) |
| Strategy | doc | [../knowledge/design-patterns/strategy.md](../knowledge/design-patterns/strategy.md) |
| Factory | doc | [../knowledge/design-patterns/factory.md](../knowledge/design-patterns/factory.md) |
| Observer | doc | [../knowledge/design-patterns/observer.md](../knowledge/design-patterns/observer.md) |
| Dependency Injection | doc | [../knowledge/design-patterns/dependency-injection.md](../knowledge/design-patterns/dependency-injection.md) |

## Frontend / React

| Concept | Status | Primary doc |
|---------|--------|-------------|
| React Modern Rendering Model | doc | [../knowledge/react-rendering/modern-lifecycle.md](../knowledge/react-rendering/modern-lifecycle.md) |
| Legacy Class Lifecycle | doc | [../knowledge/react-rendering/legacy-class-lifecycle.md](../knowledge/react-rendering/legacy-class-lifecycle.md) |
| Separation of UI and Domain | doc | Frontend architecture |

## Backend / data

| Concept | Status | Primary doc |
|---------|--------|-------------|
| API Validation | planned | Backend architecture |
| Error Handling | planned | Backend architecture |
| Structured Logging | planned | Security & observability |
| Configuration | planned | Backend architecture |
| libSQL Adapter | planned | Database abstraction |
| MariaDB Adapter | planned | Database abstraction |
| PostgreSQL Adapter | planned | Database abstraction |
| Port and Adapter Boundary | doc | Hexagonal + database abstraction |

## Cross-cutting examples

| Concept | Status | Primary doc |
|---------|--------|-------------|
| Auth Session Example | doc | [../examples/auth-session/README.md](../examples/auth-session/README.md) |
| Multi-DB Notes Example | doc | [../examples/multi-db-notes/README.md](../examples/multi-db-notes/README.md) |
| Optimistic UI Sync Example | doc | [../examples/optimistic-ui-sync/README.md](../examples/optimistic-ui-sync/README.md) |

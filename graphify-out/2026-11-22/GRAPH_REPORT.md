# Graph Report - full-stack-architecture-blueprint  (2026-11-22)

## Corpus Check
- 103 files · ~63,939 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 2)

## Summary
- 803 nodes · 809 edges · 63 communities (43 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `33468937`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- SOLID and design patterns
- Blueprint backend and DB
- Architecture concepts registry
- react-next-hono-recommendations.md
- Auth security and OCP
- Combination Deep Dives
- API Gateway Architecture
- Event Sourcing
- Modular Frontend Architecture
- Web and mobile apps
- Database vendor adapters
- Testing strategy
- CI and Graphify
- Configuration
- Project hub
- Structured logging
- ADR glossary
- Boundary glossary
- Domain glossary
- Driver glossary
- Interview-ready glossary
- Legacy section glossary
- Meaningful difference glossary
- Use case glossary
- TodoStore port
- TodoAdmin port
- TodoWriter port
- KeyValueStore port
- TodoApi port
- Phase 1 vertical slice
- Serverless / Function-Oriented Architecture
- Service-Oriented Architecture (SOA)
- Strangler Fig Migration Pattern
- Backend for Frontend (BFF)
- CQRS (Command Query Responsibility Segregation)
- Domain-Driven Design (DDD)
- Event-Driven Architecture
- Feature-Sliced Design (FSD)
- Plugin / Microkernel Architecture
- Self-Contained Systems (SCS)
- Vertical Slice Architecture
- Monorepo Architecture
- Architecture Rules
- Abstract Factory pattern
- Bridge pattern
- Builder pattern
- Chain of Responsibility pattern
- Command pattern
- Composite pattern
- Decorator pattern
- Facade pattern
- Factory Method pattern
- Flyweight pattern
- Iterator pattern
- Mediator pattern
- Memento pattern
- Prototype pattern
- Proxy pattern
- Singleton pattern
- State pattern
- Template Method pattern
- Visitor pattern

## God Nodes (most connected - your core abstractions)
1. `Combination Deep Dives` - 21 edges
2. `API Gateway Architecture` - 15 edges
3. `Backend for Frontend (BFF)` - 15 edges
4. `CQRS (Command Query Responsibility Segregation)` - 15 edges
5. `Domain-Driven Design (DDD)` - 15 edges
6. `Event-Driven Architecture` - 15 edges
7. `Event Sourcing` - 15 edges
8. `Feature-Sliced Design (FSD)` - 15 edges
9. `Modular Frontend Architecture` - 15 edges
10. `Monorepo Architecture` - 15 edges

## Surprising Connections (you probably didn't know these)
- `TodoReader port` --semantically_similar_to--> `Repository pattern`  [INFERRED] [semantically similar]
  Docs/knowledge/solid/04-I.md → Docs/knowledge/design-patterns/repository.md
- `Graphify knowledge graph workflow` --conceptually_related_to--> `Step 16 GitHub Actions CI and Graphify`  [INFERRED]
  README.md → Docs/walkthrough/16-ci-and-graphify/README.md
- `Adapter` --semantically_similar_to--> `Adapter`  [INFERRED] [semantically similar]
  Docs/.brain/GLOSSARY.md → Docs/.brain/CONCEPTS.md
- `Vertical slice` --semantically_similar_to--> `Vertical Slice`  [INFERRED] [semantically similar]
  Docs/.brain/GLOSSARY.md → Docs/.brain/CONCEPTS.md
- `Strategy pattern` --semantically_similar_to--> `Adapter pattern`  [INFERRED] [semantically similar]
  Docs/knowledge/design-patterns/strategy.md → Docs/knowledge/design-patterns/repository.md

## Hyperedges (group relationships)
- **Architecture styles in this repo** — docs_knowledge_architecture_styles_layered_concept, docs_knowledge_architecture_styles_hexagonal_concept, docs_knowledge_architecture_styles_clean_concept, docs_knowledge_architecture_styles_modular_monolith_concept, docs_knowledge_architecture_styles_microservices_concept [EXTRACTED 1.00]
- **.brain navigation graph** — docs_brain_index_brain_documentation_index, docs_brain_concepts_concept_registry, docs_brain_links_explicit_concept_links, docs_brain_glossary_glossary, docs_brain_query_guide_graphify_query_guide [EXTRACTED 1.00]
- **Cross-layer teaching examples** — docs_examples_vertical_slice_todo_example, docs_examples_auth_session_example, docs_examples_multi_db_notes_example, docs_examples_optimistic_ui_sync_example [EXTRACTED 1.00]
- **Three-engine database adapter family** — docs_walkthrough_07_database_port_and_libsql_readme_libsql_adapter, docs_walkthrough_11_postgres_adapter_readme_postgresql_adapter, docs_walkthrough_12_mariadb_adapter_readme_mariadb_adapter, docs_walkthrough_04_application_layer_readme_todo_repository_port [EXTRACTED 1.00]
- **Walkthrough steps 03-09 Todo vertical slice chain** — docs_walkthrough_03_domain_package_readme_pure_domain, docs_walkthrough_04_application_layer_readme_use_cases_ports, docs_walkthrough_06_hono_api_readme_create_app, docs_walkthrough_07_database_port_and_libsql_readme_libsql_adapter, docs_walkthrough_08_nextjs_web_app_readme_nextjs_edge, docs_walkthrough_09_vertical_slice_wiring_readme_e2e_todo_milestone [EXTRACTED 1.00]
- **Multi-database port and adapters** — docs_tech_space_database_abstraction_database_abstraction, docs_tech_space_database_abstraction_libsql, docs_tech_space_database_abstraction_mariadb, docs_tech_space_database_abstraction_postgresql, docs_knowledge_design_patterns_repository_repository_pattern [EXTRACTED 1.00]
- **React modern vs legacy rendering teaching path** — docs_knowledge_react_rendering_readme_react_rendering_model, docs_knowledge_react_rendering_modern_lifecycle_react_modern_rendering_model, docs_knowledge_react_rendering_legacy_class_lifecycle_legacy_class_lifecycle [EXTRACTED 1.00]
- **SOLID five principles** — docs_knowledge_solid_01_s_single_responsibility_principle, docs_knowledge_solid_02_o_open_closed_principle, docs_knowledge_solid_03_l_liskov_substitution_principle, docs_knowledge_solid_04_i_interface_segregation_principle, docs_knowledge_solid_05_d_dependency_inversion_principle [EXTRACTED 1.00]
- **Core hexagonal packages** — docs_tech_space_project_blueprint_packages_domain, docs_tech_space_project_blueprint_packages_application, docs_walkthrough_05_config_and_contracts_readme_zod_contracts, docs_tech_space_project_blueprint_packages_db, docs_walkthrough_06_hono_api_readme_create_app [INFERRED 0.85]

## Communities (63 total, 20 thin omitted)

### Community 0 - "SOLID and design patterns"
Cohesion: 0.10
Nodes (34): Observer pattern, Optimistic UI Sync Example, Adapter pattern, Repository pattern, Strategy pattern, Legacy class lifecycle, Client Components, React modern rendering model (+26 more)

### Community 1 - "Blueprint backend and DB"
Cohesion: 0.07
Nodes (26): Project blueprint, apps/api Hono, Manual DI createApp(deps), packages/application, packages/db, packages/domain, Todo vertical slice feature, pnpm package manager (+18 more)

### Community 2 - "Architecture concepts registry"
Cohesion: 0.08
Nodes (29): Adapter, API Validation, Clean Architecture, Database Adapter Package, Dependency Injection, Dependency Inversion, Error Handling, Factory (+21 more)

### Community 3 - "react-next-hono-recommendations.md"
Cohesion: 0.07
Nodes (22): Architecture Combination Guide, Compatibility Matrix, Practical Default Stack (Combination), Separate Concerns First, What Not to Combine at the Same Boundary, 1. Small MVP, 2. Growing SaaS, 3. Marketplace / booking platform (+14 more)

### Community 4 - "Auth security and OCP"
Cohesion: 0.10
Nodes (22): Auth Session Example, Concept registry, Legacy Class Lifecycle, Microservices, Modular Monolith, Observer, Open-Closed, Optimistic UI Sync Example (+14 more)

### Community 5 - "Combination Deep Dives"
Cohesion: 0.10
Nodes (21): BFF + Next.js, Clean + DDD, Clean + Hexagonal, Combination Deep Dives, CQRS + Event Sourcing, CQRS without Event Sourcing, DDD + CQRS, DDD + Event-Driven (+13 more)

### Community 6 - "API Gateway Architecture"
Cohesion: 0.10
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend (services behind gateway), 4. Gateway config in monorepo, API Gateway Architecture, Best Fit by Application Type, Common Mistakes, Core Rules (+11 more)

### Community 7 - "Event Sourcing"
Cohesion: 0.10
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend, 4. Monorepo, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 8 - "Modular Frontend Architecture"
Cohesion: 0.10
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend, 4. Monorepo (optional package-per-module), Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 9 - "Web and mobile apps"
Cohesion: 0.67
Nodes (3): Capacitor Mobile App, Next.js Web App, Shared Domain Package

### Community 10 - "Database vendor adapters"
Cohesion: 0.67
Nodes (3): libSQL Adapter, MariaDB Adapter, PostgreSQL Adapter

### Community 31 - "Serverless / Function-Oriented Architecture"
Cohesion: 0.10
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend (function-oriented deploy, modular code), 4. Monorepo, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 32 - "Service-Oriented Architecture (SOA)"
Cohesion: 0.10
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend (one capability service), 4. Monorepo (enterprise-style), Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 33 - "Strangler Fig Migration Pattern"
Cohesion: 0.10
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend, 4. Monorepo, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 34 - "Backend for Frontend (BFF)"
Cohesion: 0.11
Nodes (19): 1. React frontend (SPA calling BFF), 2. Next.js App Router frontend (BFF-in-Next), 3. Hono backend, 4. Monorepo, Backend for Frontend (BFF), Best Fit by Application Type, Common Mistakes, Core Rules (+11 more)

### Community 35 - "CQRS (Command Query Responsibility Segregation)"
Cohesion: 0.11
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend, 4. Monorepo, Best Fit by Application Type, Common Mistakes, Core Rules, CQRS (Command Query Responsibility Segregation) (+11 more)

### Community 36 - "Domain-Driven Design (DDD)"
Cohesion: 0.11
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend (tactical DDD inside a module), 4. Monorepo, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 37 - "Event-Driven Architecture"
Cohesion: 0.11
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend + worker, 4. Monorepo, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 38 - "Feature-Sliced Design (FSD)"
Cohesion: 0.11
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend, 4. Monorepo, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 39 - "Plugin / Microkernel Architecture"
Cohesion: 0.11
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend, 4. Monorepo, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 40 - "Self-Contained Systems (SCS)"
Cohesion: 0.11
Nodes (18): 1–2. React / Next.js per system, 3. Hono per system, 4. Monorepo of systems, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram, Frontend, Backend, or Both? (+10 more)

### Community 41 - "Vertical Slice Architecture"
Cohesion: 0.11
Nodes (19): 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend, 4. Monorepo (relevant), Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram (+11 more)

### Community 42 - "Monorepo Architecture"
Cohesion: 0.11
Nodes (17): 1–3. React / Next / Hono together, 4. Monorepo tooling example, Best Fit by Application Type, Common Mistakes, Core Rules, Dependency Diagram, Frontend, Backend, or Both?, Implementation Example (+9 more)

### Community 43 - "Architecture Rules"
Cohesion: 0.12
Nodes (17): Allowed exceptions, Architecture Rules, Auth and Security Rules, Backend Rules (Hono), Communication Rules, Data and Persistence Rules, Dependency Rules, Event rules (+9 more)

### Community 44 - "Abstract Factory pattern"
Cohesion: 0.13
Nodes (14): Abstract Factory pattern, Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Real example — Marketplace payment kit, Related concepts, Side-by-side (+6 more)

### Community 45 - "Bridge pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Bridge pattern, Frontend (React), Good practice, Real example — Chat notifications × channels, Related concepts, Side-by-side (+6 more)

### Community 46 - "Builder pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Builder pattern, Frontend (React), Good practice, Real example — Notion page export, Related concepts, Side-by-side (+6 more)

### Community 47 - "Chain of Responsibility pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Chain of Responsibility pattern, Frontend (React), Good practice, Real example — Chat message moderation + Hono middleware, Related concepts, Side-by-side (+6 more)

### Community 48 - "Command pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono) — persistable commands / outbox, Bad / worst practice, Command pattern, Frontend (React), Good practice, Real example — Notion editor undo, Related concepts, Side-by-side (+6 more)

### Community 49 - "Composite pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Composite pattern, Frontend (React), Good practice, Real example — Notion block tree, Related concepts, Side-by-side (+6 more)

### Community 50 - "Decorator pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Decorator pattern, Frontend (React), Good practice, Real example — Chat API guards + message bubble chrome, Related concepts, Side-by-side (+6 more)

### Community 51 - "Facade pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Facade pattern, Frontend (React), Good practice, Real example — Marketplace “place order”, Related concepts, Side-by-side (+6 more)

### Community 52 - "Factory Method pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Factory Method pattern, Frontend (React), Good practice, Real example — Chat notification channels, Related concepts, Side-by-side (+6 more)

### Community 53 - "Flyweight pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Flyweight pattern, Frontend (React), Good practice, Real example — Chat reactions, Related concepts, Side-by-side (+6 more)

### Community 54 - "Iterator pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Iterator pattern, Real example — Cursor pagination over chat messages, Related concepts, Side-by-side (+6 more)

### Community 55 - "Mediator pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Mediator pattern, Real example — Chat room coordinator, Related concepts, Side-by-side (+6 more)

### Community 56 - "Memento pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Memento pattern, Real example — Notion draft autosave + version restore, Related concepts, Side-by-side (+6 more)

### Community 57 - "Prototype pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Prototype pattern, Real example — Duplicate Notion page, Related concepts, Side-by-side (+6 more)

### Community 58 - "Proxy pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Proxy pattern, Real example — Signed attachment URLs + lazy Notion page, Related concepts, Side-by-side (+6 more)

### Community 59 - "Singleton pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono) — prefer DI over classic Singleton, Bad / worst practice, Frontend (React), Good practice, Real example — One DB pool / one logger, Related concepts, Side-by-side, Singleton pattern (+6 more)

### Community 60 - "State pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Real example — Marketplace order lifecycle, Related concepts, Side-by-side, State pattern (+6 more)

### Community 61 - "Template Method pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Real example — Import pages from CSV or Notion export, Related concepts, Side-by-side, Template Method pattern (+6 more)

### Community 62 - "Visitor pattern"
Cohesion: 0.13
Nodes (14): Backend (Hono), Bad / worst practice, Frontend (React), Good practice, Real example — Operations over Notion block tree, Related concepts, Side-by-side, Trade-offs (+6 more)

## Knowledge Gaps
- **65 isolated node(s):** `TodoRepository (SRP teaching port)`, `TodoRepository port (OCP)`, `TodoReader port`, `libSQL adapter`, `MariaDB adapter` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 634 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Architecture Combination Guide` connect `react-next-hono-recommendations.md` to `Combination Deep Dives`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `TodoRepository (SRP teaching port)`, `TodoRepository port (OCP)`, `TodoReader port` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SOLID and design patterns` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Why does `Combination Deep Dives` connect `Combination Deep Dives` to `react-next-hono-recommendations.md`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Should `Blueprint backend and DB` be split into smaller, more focused modules?**
  _Cohesion score 0.06881720430107527 - nodes in this community are weakly interconnected._
- **Why does `Backend for Frontend (BFF)` connect `Backend for Frontend (BFF)` to `react-next-hono-recommendations.md`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Should `Architecture concepts registry` be split into smaller, more focused modules?**
  _Cohesion score 0.08108108108108109 - nodes in this community are weakly interconnected._
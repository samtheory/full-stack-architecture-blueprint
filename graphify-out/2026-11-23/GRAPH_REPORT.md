# Graph Report - full-stack-architecture-blueprint  (2026-11-23)

## Corpus Check
- 122 files · ~71,183 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 4, .example 3)

## Summary
- 1048 nodes · 1140 edges · 77 communities (56 shown, 21 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `01661056`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- SOLID and design patterns
- Blueprint backend and DB
- Architecture concepts registry
- react-next-hono-recommendations.md
- Optimistic UI sync example
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
- marketplace-fa-en-architecture.md
- Marketplace (FA + EN) — React + Hono Monorepo Suggestion
- Package setup — shared `packages/*`
- Hono server setup — `clouds/market-place-server` (Bun or Node.js)
- React app setup — `apps/market-place-app`
- tasks
- package.json
- pnpm-workspace.yaml
- 02 — Postgres with Docker (`infra/`)
- postgres
- market-place-server/package.json
- 03 — Drizzle + Postgres
- 01 — Folder structure + composition root
- compilerOptions

## God Nodes (most connected - your core abstractions)
1. `Design patterns` - 23 edges
2. `Combination Deep Dives` - 21 edges
3. `Architecture styles` - 21 edges
4. `API Gateway Architecture` - 15 edges
5. `Backend for Frontend (BFF)` - 15 edges
6. `CQRS (Command Query Responsibility Segregation)` - 15 edges
7. `Domain-Driven Design (DDD)` - 15 edges
8. `Event-Driven Architecture` - 15 edges
9. `Event Sourcing` - 15 edges
10. `Feature-Sliced Design (FSD)` - 15 edges

## Surprising Connections (you probably didn't know these)
- `TodoReader port` --semantically_similar_to--> `Repository pattern`  [INFERRED] [semantically similar]
  Docs/knowledge/solid/04-I.md → Docs/knowledge/design-patterns/repository.md
- `Full-Stack Architecture Blueprint` --references--> `Walkthrough construction manual`  [EXTRACTED]
  README.md → Docs/walkthrough/README.md
- `Graphify knowledge graph workflow` --conceptually_related_to--> `Step 16 GitHub Actions CI and Graphify`  [INFERRED]
  README.md → Docs/walkthrough/16-ci-and-graphify/README.md
- `Adapter` --semantically_similar_to--> `Adapter`  [INFERRED] [semantically similar]
  Docs/.brain/GLOSSARY.md → Docs/.brain/CONCEPTS.md
- `Vertical slice` --semantically_similar_to--> `Vertical Slice`  [INFERRED] [semantically similar]
  Docs/.brain/GLOSSARY.md → Docs/.brain/CONCEPTS.md

## Import Cycles
- None detected.

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

## Communities (77 total, 21 thin omitted)

### Community 0 - "SOLID and design patterns"
Cohesion: 0.06
Nodes (56): Auth Session Example, Concept registry, Open-Closed, Security & observability, Strategy, Glossary, God node, Commands (from repo root) (+48 more)

### Community 1 - "Blueprint backend and DB"
Cohesion: 0.08
Nodes (23): apps/api Hono, Manual DI createApp(deps), packages/application, packages/db, packages/domain, Todo vertical slice feature, pnpm package manager, Turborepo task graph (+15 more)

### Community 2 - "Architecture concepts registry"
Cohesion: 0.08
Nodes (29): Adapter, API Validation, Clean Architecture, Database Adapter Package, Dependency Injection, Dependency Inversion, Error Handling, Factory (+21 more)

### Community 3 - "react-next-hono-recommendations.md"
Cohesion: 0.12
Nodes (17): 1. Small MVP, 2. Growing SaaS, 3. Marketplace / booking platform, 4. Large multi-team product, 5. Platform with plugins, automations, and integrations, Async, Cross-Cutting Stack Rules, Data (+9 more)

### Community 4 - "Optimistic UI sync example"
Cohesion: 0.47
Nodes (5): Legacy Class Lifecycle, Observer, Optimistic UI Sync Example, React Modern Rendering Model, Separation of UI and Domain

### Community 5 - "Combination Deep Dives"
Cohesion: 0.08
Nodes (26): Architecture Combination Guide, BFF + Next.js, Clean + DDD, Clean + Hexagonal, Combination Deep Dives, Compatibility Matrix, CQRS + Event Sourcing, CQRS without Event Sourcing (+18 more)

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
Cohesion: 0.12
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

### Community 63 - "marketplace-fa-en-architecture.md"
Cohesion: 0.19
Nodes (5): Microservices, Modular Monolith, Architecture styles, Thinking, Walkthrough construction manual

### Community 64 - "Marketplace (FA + EN) — React + Hono Monorepo Suggestion"
Cohesion: 0.09
Nodes (23): 10. One-sentence summary, 1. Verdict (what to build), 2. System shape, 3. Monorepo layout (marketplace-shaped), 4.1 Architecture style, 4.2 Suggested `apps/web` shape, 4.3 Multilingual (FA + EN) — treat as a first-class product concern, 4.4 React “fast development” habits (+15 more)

### Community 65 - "Package setup — shared `packages/*`"
Cohesion: 0.10
Nodes (21): 1. Scaffold folder, 2. `packages/contracts/package.json`, 3. Minimal files, 4. Install and link, 5. Depend from app and server, 6. Use it, Acceptance criteria, Agent prompt (+13 more)

### Community 66 - "Hono server setup — `clouds/market-place-server` (Bun or Node.js)"
Cohesion: 0.10
Nodes (20): 1. Clear the placeholder (optional), 2. Create the package, 3A. Node.js path, 3B. Bun path, 4. Reinstall at root, 5. Verify, Acceptance criteria, Agent prompt (+12 more)

### Community 67 - "React app setup — `apps/market-place-app`"
Cohesion: 0.11
Nodes (19): 1. Clear the placeholder (optional), 2. Scaffold with Vite (recommended), 3. Set the package name, 4. Install workspace deps, 5. Run the app, 6. Smoke check against the future API, Acceptance criteria, Agent prompt (+11 more)

### Community 68 - "tasks"
Cohesion: 0.13
Nodes (14): dependsOn, outputs, cache, persistent, $schema, tasks, build, dev (+6 more)

### Community 69 - "package.json"
Cohesion: 0.17
Nodes (12): devDependencies, turbo@^2.6.1, name, packageManager, private, scripts, build, dev (+4 more)

### Community 71 - "02 — Postgres with Docker (`infra/`)"
Cohesion: 0.05
Nodes (36): 02 — Postgres with Docker (`infra/`), 1. Prerequisites, 2. Create local env, 3. Start Postgres, 4. Point the Hono server at Postgres, 5. Optional connectivity smoke test, Acceptance, Bad practice (+28 more)

### Community 72 - "postgres"
Cohesion: 0.11
Nodes (18): POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, interval, retries, test, timeout, container_name (+10 more)

### Community 73 - "market-place-server/package.json"
Cohesion: 0.13
Nodes (16): dependencies, hono@^4.13.20, devDependencies, @types/bun@^1.4.5, typescript@^7.0.2, name, private, scripts (+8 more)

### Community 74 - "03 — Drizzle + Postgres"
Cohesion: 0.13
Nodes (15): 03 — Drizzle + Postgres, 1. Install deps (from repo root), 2. Add Drizzle config, 3. Create client + schema, 4. Scripts in `package.json`, 5. Generate + migrate, 6. Wire db into `createApp` (composition root), Acceptance (+7 more)

### Community 75 - "01 — Folder structure + composition root"
Cohesion: 0.14
Nodes (14): 01 — Folder structure + composition root, 1. Create folders, 2. Add `create-app.ts`, 3. Add listing stub, 4. Slim `index.ts`, 5. Run and verify, Acceptance, Bad practice (+6 more)

### Community 76 - "compilerOptions"
Cohesion: 0.20
Nodes (9): compilerOptions, module, moduleResolution, noEmit, skipLibCheck, strict, target, types (+1 more)

## Knowledge Gaps
- **63 isolated node(s):** `Open-Closed`, `Security & observability`, `God node`, `Observer pattern`, `Client Components` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 786 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design patterns` connect `SOLID and design patterns` to `Abstract Factory pattern`, `Bridge pattern`, `Builder pattern`, `Chain of Responsibility pattern`, `Command pattern`, `Composite pattern`, `Decorator pattern`, `Facade pattern`, `Factory Method pattern`, `Flyweight pattern`, `Iterator pattern`, `Mediator pattern`, `Memento pattern`, `Prototype pattern`, `Proxy pattern`, `Singleton pattern`, `State pattern`, `Template Method pattern`, `Visitor pattern`?**
  _High betweenness centrality (0.434) - this node is a cross-community bridge._
- **What connects `Open-Closed`, `Security & observability`, `God node` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SOLID and design patterns` be split into smaller, more focused modules?**
  _Cohesion score 0.06327683615819209 - nodes in this community are weakly interconnected._
- **Why does `Architecture styles` connect `marketplace-fa-en-architecture.md` to `Service-Oriented Architecture (SOA)`, `Strangler Fig Migration Pattern`, `Architecture concepts registry`, `SOLID and design patterns`, `API Gateway Architecture`, `Event Sourcing`, `Modular Frontend Architecture`, `Self-Contained Systems (SCS)`, `Serverless / Function-Oriented Architecture`?**
  _High betweenness centrality (0.378) - this node is a cross-community bridge._
- **Should `Blueprint backend and DB` be split into smaller, more focused modules?**
  _Cohesion score 0.07671957671957672 - nodes in this community are weakly interconnected._
- **Why does `Knowledge` connect `SOLID and design patterns` to `marketplace-fa-en-architecture.md`?**
  _High betweenness centrality (0.220) - this node is a cross-community bridge._
- **Should `Architecture concepts registry` be split into smaller, more focused modules?**
  _Cohesion score 0.08108108108108109 - nodes in this community are weakly interconnected._
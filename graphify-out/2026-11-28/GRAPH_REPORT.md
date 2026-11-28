# Graph Report - full-stack-architecture-blueprint  (2026-11-28)

## Corpus Check
- 193 files · ~120,041 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 6, .mdc 2, .example 2)

## Summary
- 2131 nodes · 2581 edges · 136 communities (111 shown, 25 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 52 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `349d836d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- SA-10 — Capacity, back-of-envelope, bottlenecks
- Blueprint backend and DB
- Architecture concepts registry
- react-next-hono-recommendations.md
- SA-01 — What architecture is (and is not)
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
- Design patterns
- Bridge pattern
- Builder pattern
- Chain of Responsibility pattern
- Command pattern
- Composite pattern
- Decorator pattern
- Facade pattern
- Factory Method pattern
- FE-02 — Hooks & state
- Iterator pattern
- Mediator pattern
- Memento pattern
- Prototype pattern
- Proxy pattern
- Singleton pattern
- State pattern
- Template Method pattern
- Visitor pattern
- COURSE.md
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
- 04 — Listing vertical slice
- Software Architect Agent
- Architecture course — dummy → CTO
- Software Architect — skill pack reference
- Software Architect — example prompts
- SA-02 — Quality attributes / NFRs
- Course implementation plan
- SOLID principles
- FD-02 — Networks & HTTP
- SA-03 — C4 model (context → code)
- createApp
- BE-02 — Hono hello & project layout
- SA-14 — Capstone: C4 + ADR set for this blueprint
- BE-11 — Rate limits, idempotency & timeouts
- market-place-server — build guide
- FD-03 — TypeScript for architects
- FD-06 — Debugging & reproduction discipline
- FD-05 — Git workflows
- BE-09 — API versioning & compatibility
- BE-13 — Observability hooks at the edge
- BE-10 — File uploads, streams & webhooks
- Resume — Software Architect course & agent
- BE-12 — Testing Hono (unit + integration)
- FE-09 — Accessibility & i18n basics
- BE-14 — CTO: Bun adoption risks & lock-in
- Flyweight pattern
- BE-06 — Auth: session cookies vs JWT
- BE-05 — Error model & HTTP mapping
- BE-04 — Validation with Zod & typed routes
- DB-02 — PostgreSQL essentials
- BE-08 — Background work: queues / cron
- BE-07 — Composition root & DI
- FE-01 — React mental model (modern)
- DB-01 — Relational model & SQL core
- BE-03 — Routing, groups & middleware pipeline
- {Topic title}
- FE-08 — Performance (bundle, waterfalls, CWV)
- FE-07 — Feature folders / FSD
- Design patterns
- FE-04 — Next.js App Router fundamentals
- FE-06 — Forms, mutations & optimistic UI
- FE-05 — RSC vs Client Components
- public.ts
- DB-03 — MariaDB / MySQL differences
- FE-10 — Auth UX & BFF role of Next
- Tech space documentation
- Full-Stack Architecture Blueprint
- Optimistic UI sync example
- Study tracks
- FE-11 — CTO: SPA vs Next vs mobile shell
- Page template (dummy → CTO)
- Graphify setup status
- clouds/README.md
- Knowledge tracks index (architecture depth)
- Auth Session Example
- create-app.ts
- Modular Monolith
- Course — Senior Engineer → Architect → CTO

## God Nodes (most connected - your core abstractions)
1. `Design patterns` - 25 edges
2. `Vertical Slice Architecture` - 23 edges
3. `Architecture styles` - 22 edges
4. `Combination Deep Dives` - 21 edges
5. `Project blueprint` - 17 edges
6. `createApp()` - 16 edges
7. `Package setup — shared `packages/*`` - 15 edges
8. `Architecture Rules` - 14 edges
9. `Hono server setup — `clouds/market-place-server` (Bun or Node.js)` - 14 edges
10. `Course implementation plan` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Test seams` --references--> `listListings()`  [INFERRED]
  Docs/course/03-frontend-react-next/FE-03-data-fetching.md → clouds/market-place-server/src/modules/listing/list-listings/list-listings.ts
- `Exercises` --references--> `createApp()`  [INFERRED]
  Docs/course/02-backend-hono-bun/BE-02-hono-hello.md → clouds/market-place-server/src/create-app.ts
- `DIP vs DI reminder` --references--> `createApp()`  [INFERRED]
  Docs/course/02-backend-hono-bun/BE-07-composition-root-di.md → clouds/market-place-server/src/create-app.ts
- `Exercises` --references--> `createApp()`  [INFERRED]
  Docs/course/02-backend-hono-bun/BE-12-testing-hono.md → clouds/market-place-server/src/create-app.ts
- `Current facts (this repo)` --references--> `createApp()`  [INFERRED]
  Docs/course/02-backend-hono-bun/BE-14-bun-cto.md → clouds/market-place-server/src/create-app.ts

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

## Communities (136 total, 25 thin omitted)

### Community 0 - "SA-10 — Capacity, back-of-envelope, bottlenecks"
Cohesion: 0.11
Nodes (19): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Back-of-envelope recipe, Bottleneck cheat sheet, Connection pool sketch (+11 more)

### Community 1 - "Blueprint backend and DB"
Cohesion: 0.08
Nodes (23): apps/api Hono, Manual DI createApp(deps), packages/application, packages/db, packages/domain, Todo vertical slice feature, pnpm package manager, Turborepo task graph (+15 more)

### Community 2 - "Architecture concepts registry"
Cohesion: 0.08
Nodes (29): Adapter, API Validation, Clean Architecture, Database Adapter Package, Dependency Injection, Dependency Inversion, Error Handling, Factory (+21 more)

### Community 3 - "react-next-hono-recommendations.md"
Cohesion: 0.12
Nodes (17): 1. Small MVP, 2. Growing SaaS, 3. Marketplace / booking platform, 4. Large multi-team product, 5. Platform with plugins, automations, and integrations, Async, Cross-Cutting Stack Rules, Data (+9 more)

### Community 4 - "SA-01 — What architecture is (and is not)"
Cohesion: 0.12
Nodes (17): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Architecture *is*, Architecture *is not* (by itself), Decision checklist (use before coding a “big” change) (+9 more)

### Community 5 - "Combination Deep Dives"
Cohesion: 0.08
Nodes (26): Architecture Combination Guide, BFF + Next.js, Clean + DDD, Clean + Hexagonal, Combination Deep Dives, Compatibility Matrix, CQRS + Event Sourcing, CQRS without Event Sourcing (+18 more)

### Community 6 - "API Gateway Architecture"
Cohesion: 0.07
Nodes (29): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend (services behind gateway), 3. Working — folders and a thin example, 4. Gateway config in monorepo, 4. Rich — seams, failures, tests (+21 more)

### Community 7 - "Event Sourcing"
Cohesion: 0.07
Nodes (30): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend, 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+22 more)

### Community 8 - "Modular Frontend Architecture"
Cohesion: 0.07
Nodes (29): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend, 3. Working — folders and a thin example, 4. Monorepo (optional package-per-module), 4. Rich — seams, failures, tests (+21 more)

### Community 9 - "Web and mobile apps"
Cohesion: 0.67
Nodes (3): Capacitor Mobile App, Next.js Web App, Shared Domain Package

### Community 10 - "Database vendor adapters"
Cohesion: 0.67
Nodes (3): libSQL Adapter, MariaDB Adapter, PostgreSQL Adapter

### Community 31 - "Serverless / Function-Oriented Architecture"
Cohesion: 0.07
Nodes (29): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend (function-oriented deploy, modular code), 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+21 more)

### Community 32 - "Service-Oriented Architecture (SOA)"
Cohesion: 0.07
Nodes (29): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend (one capability service), 3. Working — folders and a thin example, 4. Monorepo (enterprise-style), 4. Rich — seams, failures, tests (+21 more)

### Community 33 - "Strangler Fig Migration Pattern"
Cohesion: 0.07
Nodes (29): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend, 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+21 more)

### Community 34 - "Backend for Frontend (BFF)"
Cohesion: 0.07
Nodes (29): 1. Dummy — 30-second picture, 1. React frontend (SPA calling BFF), 2. Next.js App Router frontend (BFF-in-Next), 2. When to use / when not, 3. Hono backend, 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+21 more)

### Community 35 - "CQRS (Command Query Responsibility Segregation)"
Cohesion: 0.07
Nodes (30): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend, 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+22 more)

### Community 36 - "Domain-Driven Design (DDD)"
Cohesion: 0.07
Nodes (30): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend (tactical DDD inside a module), 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+22 more)

### Community 37 - "Event-Driven Architecture"
Cohesion: 0.07
Nodes (30): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend + worker, 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+22 more)

### Community 38 - "Feature-Sliced Design (FSD)"
Cohesion: 0.07
Nodes (30): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend, 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+22 more)

### Community 39 - "Plugin / Microkernel Architecture"
Cohesion: 0.07
Nodes (29): 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 2. When to use / when not, 3. Hono backend, 3. Working — folders and a thin example, 4. Monorepo, 4. Rich — seams, failures, tests (+21 more)

### Community 40 - "Self-Contained Systems (SCS)"
Cohesion: 0.07
Nodes (28): 1–2. React / Next.js per system, 1. Dummy — 30-second picture, 2. When to use / when not, 3. Hono per system, 3. Working — folders and a thin example, 4. Monorepo of systems, 4. Rich — seams, failures, tests, 5. Professional / CTO (+20 more)

### Community 41 - "Vertical Slice Architecture"
Cohesion: 0.07
Nodes (27): 1. Dummy — 30-second picture, 1. Dummy — 30-second picture, 1. React frontend, 2. Next.js App Router frontend, 3. Hono backend, 4. Monorepo (relevant), 4. Rich — failure & seams (extra), 4. Rich — failure & seams (extra) (+19 more)

### Community 42 - "Monorepo Architecture"
Cohesion: 0.07
Nodes (27): 1–3. React / Next / Hono together, 1. Dummy — 30-second picture, 2. When to use / when not, 3. Working — folders and a thin example, 4. Monorepo tooling example, 4. Rich — seams, failures, tests, 5. Professional / CTO, ADR triggers (+19 more)

### Community 43 - "Architecture Rules"
Cohesion: 0.12
Nodes (17): Allowed exceptions, Architecture Rules, Auth and Security Rules, Backend Rules (Hono), Communication Rules, Data and Persistence Rules, Dependency Rules, Event rules (+9 more)

### Community 44 - "Design patterns"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Abstract Factory pattern, Alternatives, Backend (Hono) — best practice (+12 more)

### Community 45 - "Bridge pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 46 - "Builder pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 47 - "Chain of Responsibility pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 48 - "Command pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 49 - "Composite pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 50 - "Decorator pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 51 - "Facade pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 52 - "Factory Method pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 53 - "FE-02 — Hooks & state"
Cohesion: 0.12
Nodes (16): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Custom hooks, Exercises, Failure modes (+8 more)

### Community 54 - "Iterator pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 55 - "Mediator pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 56 - "Memento pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 57 - "Prototype pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 58 - "Proxy pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 59 - "Singleton pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 60 - "State pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono), Bad / worst practice (+12 more)

### Community 61 - "Template Method pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 62 - "Visitor pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono), Bad / worst practice (+12 more)

### Community 63 - "COURSE.md"
Cohesion: 0.07
Nodes (23): 00 — Foundations, Study order (wave 1.1), 01 — System architecture, Study order, 02 — Backend: Hono / Bun, Study order, 03 — Frontend: React / Next.js, Study order (+15 more)

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
Cohesion: 0.13
Nodes (15): 02 — Postgres with Docker (`infra/`), 1. Prerequisites, 2. Create local env, 3. Start Postgres, 4. Point the Hono server at Postgres, 5. Optional connectivity smoke test, Acceptance, Bad practice (+7 more)

### Community 72 - "postgres"
Cohesion: 0.11
Nodes (18): POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, interval, retries, test, timeout, container_name (+10 more)

### Community 73 - "market-place-server/package.json"
Cohesion: 0.16
Nodes (13): dependencies, hono@^4.13.20, devDependencies, @types/bun@^1.4.5, typescript@^7.0.2, name, private, scripts (+5 more)

### Community 74 - "03 — Drizzle + Postgres"
Cohesion: 0.13
Nodes (15): 03 — Drizzle + Postgres, 1. Install deps (from repo root), 2. Add Drizzle config, 3. Create client + schema, 4. Scripts in `package.json`, 5. Generate + migrate, 6. Wire db into `createApp` (composition root), Acceptance (+7 more)

### Community 75 - "01 — Folder structure + composition root"
Cohesion: 0.10
Nodes (20): 01 — Folder structure + composition root, 1. Create folders, 2. List-listings slice (stub), 3. Create-listing slice (stub), 4. Module public API, 5. Composition root, 6. Boot file only, 7. Verify (+12 more)

### Community 76 - "compilerOptions"
Cohesion: 0.20
Nodes (9): compilerOptions, module, moduleResolution, noEmit, skipLibCheck, strict, target, types (+1 more)

### Community 77 - "04 — Listing vertical slice"
Cohesion: 0.18
Nodes (11): 04 — Listing vertical slice, Acceptance, After this, Bad practice, Do this (outline), Example curl, Goal, Good practice (+3 more)

### Community 78 - "Software Architect Agent"
Cohesion: 0.20
Nodes (9): Anti-patterns, Before you write anything, Companion skills (load when relevant), Doc quality bar, Modes (pick one per request), Response shape for architecture work, Software Architect Agent, Stack defaults (do not silently replace) (+1 more)

### Community 79 - "Architecture course — dummy → CTO"
Cohesion: 0.20
Nodes (10): Architecture course — dummy → CTO, Capstone exercises, How to study each page, Track A — Foundations (start here), Track B — Core architecture styles, Track C — Domain & communication, Track D — Frontend organization, Track E — Edges, scale, migration (+2 more)

### Community 80 - "Software Architect — skill pack reference"
Cohesion: 0.29
Nodes (6): Core architecture, Docs & diagrams, How to invoke, Layer specialists, Optional next installs, Software Architect — skill pack reference

### Community 81 - "Software Architect — example prompts"
Cohesion: 0.33
Nodes (5): Design & docs, Diagrams, Implement, Software Architect — example prompts, Teach (course ladder)

### Community 83 - "SA-02 — Quality attributes / NFRs"
Cohesion: 0.12
Nodes (17): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Core attribute set (architect’s short list), Exercises, Failure modes (+9 more)

### Community 84 - "Course implementation plan"
Cohesion: 0.15
Nodes (13): Course implementation plan, Phase 0 — Scaffold (done when this folder exists), Phase 1 — Foundations + System architecture wiring, Phase 2 — Backend (Hono / Bun), Phase 3 — Frontend (React / Next.js), Phase 4 — Data stores, Phase 5 — Platform (Docker → K8s → Terraform), Phase 6 — CI/CD (+5 more)

### Community 85 - "SOLID principles"
Cohesion: 0.19
Nodes (18): Adapter pattern, Repository pattern, Strategy pattern, Single Responsibility Principle (SRP), TodoRepository (SRP teaching port), Open-Closed Principle (OCP), TodoRepository port (OCP), Liskov Substitution Principle (LSP) (+10 more)

### Community 86 - "FD-02 — Networks & HTTP"
Cohesion: 0.11
Nodes (19): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Exercises, Failure modes, FD-02 — Networks & HTTP (+11 more)

### Community 87 - "SA-03 — C4 model (context → code)"
Cohesion: 0.12
Nodes (17): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Exercises, Failure modes, L1 — Context (this blueprint) (+9 more)

### Community 88 - "createApp"
Cohesion: 0.13
Nodes (19): createApp(), 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-01 — Bun runtime, Entrypoint pattern (runtime-specific) (+11 more)

### Community 89 - "BE-02 — Hono hello & project layout"
Cohesion: 0.11
Nodes (18): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-02 — Hono hello & project layout, Exercises, Failure modes (+10 more)

### Community 90 - "SA-14 — Capstone: C4 + ADR set for this blueprint"
Cohesion: 0.10
Nodes (21): 1. Dummy, 2. When to use / when not, 3. Working — deliverables, 4. Rich — worked reference (this repo), 5. Professional / CTO, Deliverable A — C4 Context (L1), Deliverable B — C4 Container (L2), Deliverable C — Component sketch (L3, optional but recommended) (+13 more)

### Community 91 - "BE-11 — Rate limits, idempotency & timeouts"
Cohesion: 0.13
Nodes (15): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-11 — Rate limits, idempotency & timeouts, Exercises, Failure modes (+7 more)

### Community 92 - "market-place-server — build guide"
Cohesion: 0.33
Nodes (6): How to use, Map to code, market-place-server — build guide, Path, Status legend, Why Postgres lives in `infra/`, not under `clouds/`

### Community 93 - "FD-03 — TypeScript for architects"
Cohesion: 0.12
Nodes (16): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Architect toolkit (minimum), Contracts package (this monorepo), Exercises (+8 more)

### Community 94 - "FD-06 — Debugging & reproduction discipline"
Cohesion: 0.12
Nodes (16): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Exercises, Failure modes, FD-06 — Debugging & reproduction discipline (+8 more)

### Community 95 - "FD-05 — Git workflows"
Cohesion: 0.13
Nodes (15): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Bisect (find the break), Commit message bar, Exercises (+7 more)

### Community 96 - "BE-09 — API versioning & compatibility"
Cohesion: 0.11
Nodes (19): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-09 — API versioning & compatibility, Breaking change → v2 mount (only if needed), Compatibility checklist (+11 more)

### Community 97 - "BE-13 — Observability hooks at the edge"
Cohesion: 0.13
Nodes (15): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-13 — Observability hooks at the edge, Error path, Exercises (+7 more)

### Community 98 - "BE-10 — File uploads, streams & webhooks"
Cohesion: 0.14
Nodes (14): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-10 — File uploads, streams & webhooks, Exercises, Failure modes (+6 more)

### Community 99 - "Resume — Software Architect course & agent"
Cohesion: 0.18
Nodes (11): 1. Sync code, 2. Open in Cursor, 3. Optional — global skills (once per machine), 4. Graphify (if you use codebase queries), Canonical docs (don’t invent a second plan), Handoff checklist, How to continue in chat, On the other PC — setup (+3 more)

### Community 100 - "BE-12 — Testing Hono (unit + integration)"
Cohesion: 0.14
Nodes (14): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-12 — Testing Hono (unit + integration), Exercises, Failure modes (+6 more)

### Community 101 - "FE-09 — Accessibility & i18n basics"
Cohesion: 0.11
Nodes (19): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Checklist (ship bar for FE forms), Color & motion, Exercises (+11 more)

### Community 102 - "BE-14 — CTO: Bun adoption risks & lock-in"
Cohesion: 0.12
Nodes (16): 1. Dummy, 2. When to use / when not, 3. Working — decision record sketch, 4. Rich, 5. Professional / CTO, BE-14 — CTO: Bun adoption risks & lock-in, Current facts (this repo), Exercises (+8 more)

### Community 103 - "Flyweight pattern"
Cohesion: 0.10
Nodes (20): 1. Dummy — Mermaid diagram + one sentence why, 2. When / when not · Good · Bad, 3. Working — Hono worst/best + React worst/best TypeScript examples, 4. Rich — edge cases · testing seams, 5. CTO — overuse signals · monorepo placement, Alternatives, Backend (Hono) — best practice, Backend (Hono) — worst practice (+12 more)

### Community 104 - "BE-06 — Auth: session cookies vs JWT"
Cohesion: 0.11
Nodes (18): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Authn vs authz, BE-06 — Auth: session cookies vs JWT, Exercises (+10 more)

### Community 105 - "BE-05 — Error model & HTTP mapping"
Cohesion: 0.06
Nodes (32): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-05 — Error model & HTTP mapping, Domain error (portable), Error taxonomy (teaching default) (+24 more)

### Community 106 - "BE-04 — Validation with Zod & typed routes"
Cohesion: 0.12
Nodes (16): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-04 — Validation with Zod & typed routes, Contracts package (this monorepo), Domain vs DTO (+8 more)

### Community 107 - "DB-02 — PostgreSQL essentials"
Cohesion: 0.11
Nodes (18): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Capability row (Postgres), DB-02 — PostgreSQL essentials, Exercises (+10 more)

### Community 108 - "BE-08 — Background work: queues / cron"
Cohesion: 0.11
Nodes (18): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-08 — Background work: queues / cron, Cron, Exercises (+10 more)

### Community 109 - "BE-07 — Composition root & DI"
Cohesion: 0.12
Nodes (17): CreateAppDeps, 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, BE-07 — Composition root & DI, DIP vs DI reminder (+9 more)

### Community 110 - "FE-01 — React mental model (modern)"
Cohesion: 0.13
Nodes (15): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Exercises, Failure modes, FE-01 — React mental model (modern) (+7 more)

### Community 111 - "DB-01 — Relational model & SQL core"
Cohesion: 0.12
Nodes (17): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, CRUD (parameterized), DB-01 — Relational model & SQL core, Exercises (+9 more)

### Community 112 - "BE-03 — Routing, groups & middleware pipeline"
Cohesion: 0.12
Nodes (17): createListingModule(), 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Add request id (pattern for later code), BE-03 — Routing, groups & middleware pipeline (+9 more)

### Community 113 - "{Topic title}"
Cohesion: 0.20
Nodes (9): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Exercises, Learning outcomes, Related (+1 more)

### Community 114 - "FE-08 — Performance (bundle, waterfalls, CWV)"
Cohesion: 0.11
Nodes (18): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Bundle hygiene, Core Web Vitals (architect glossary), Exercises (+10 more)

### Community 115 - "FE-07 — Feature folders / FSD"
Cohesion: 0.12
Nodes (17): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Exercises, Failure modes, FE-07 — Feature folders / FSD (+9 more)

### Community 117 - "FE-04 — Next.js App Router fundamentals"
Cohesion: 0.12
Nodes (16): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, App vs Pages Router, Exercises, Failure modes (+8 more)

### Community 118 - "FE-06 — Forms, mutations & optimistic UI"
Cohesion: 0.12
Nodes (16): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Exercises, Failure modes, FE-06 — Forms, mutations & optimistic UI (+8 more)

### Community 119 - "FE-05 — RSC vs Client Components"
Cohesion: 0.13
Nodes (15): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Exercises, Failure modes, FE-05 — RSC vs Client Components (+7 more)

### Community 120 - "public.ts"
Cohesion: 0.19
Nodes (11): createListing(), CreateListingInput, createListingHandler(), createListingRoute, listListingsHandler(), listListings(), ListListingsResult, listListingsRoute (+3 more)

### Community 121 - "DB-03 — MariaDB / MySQL differences"
Cohesion: 0.12
Nodes (17): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Capability row (MariaDB), DB-03 — MariaDB / MySQL differences, Exercises (+9 more)

### Community 122 - "FE-10 — Auth UX & BFF role of Next"
Cohesion: 0.11
Nodes (19): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Auth UX checklist, Auth UX vs security, Exercises (+11 more)

### Community 123 - "Tech space documentation"
Cohesion: 0.19
Nodes (15): Observer pattern, Optimistic UI Sync Example, Legacy class lifecycle, Client Components, React modern rendering model, Separation of UI and Domain, Server Components, React rendering model (+7 more)

### Community 124 - "Full-Stack Architecture Blueprint"
Cohesion: 0.36
Nodes (10): Concept registry, Glossary, God node, .brain — documentation index, Explicit concept links, Graphify query guide, Examples, Knowledge (+2 more)

### Community 125 - "Optimistic UI sync example"
Cohesion: 0.47
Nodes (5): Legacy Class Lifecycle, Observer, Optimistic UI Sync Example, React Modern Rendering Model, Separation of UI and Domain

### Community 126 - "Study tracks"
Cohesion: 0.40
Nodes (5): Study tracks, Track A — Software architect (add after S), Track C — CTO-ready (add after A), Track K — Knowledge-only architecture sprint, Track S — Senior full-stack engineer (6–10 weeks of focused study)

### Community 127 - "FE-11 — CTO: SPA vs Next vs mobile shell"
Cohesion: 0.11
Nodes (19): 1. Dummy, 2. When to use / when not, 3. Working, 4. Rich, 5. Professional / CTO, Blueprint default (do not silently replace), C4-ish containers, Cost sketch (order-of-magnitude thinking) (+11 more)

### Community 128 - "Page template (dummy → CTO)"
Cohesion: 0.25
Nodes (6): Lesson ladder — Dummy → CTO, Rules, Architecture style pages, Depth ladder, Design pattern / SOLID pages, Page template (dummy → CTO)

### Community 129 - "Graphify setup status"
Cohesion: 0.33
Nodes (6): Commands (from repo root), Graphify setup status, Optional: git hooks, Optional: hosted Graphify MCP, Outputs, What is configured

### Community 130 - "clouds/README.md"
Cohesion: 0.33
Nodes (4): Clouds docs, Infra, Postgres quick start, Why here

### Community 131 - "Knowledge tracks index (architecture depth)"
Cohesion: 0.33
Nodes (6): Gaps filled by this category (not only knowledge), How to use, Knowledge tracks index (architecture depth), Map: course SA-* ↔ knowledge COURSE, Recommended study sprint (1–2 weeks), Related

### Community 132 - "Auth Session Example"
Cohesion: 0.50
Nodes (4): Auth Session Example, Open-Closed, Security & observability, Strategy

### Community 135 - "Course — Senior Engineer → Architect → CTO"
Cohesion: 0.50
Nodes (4): Categories, Course — Senior Engineer → Architect → CTO, How we implement (steps), Status legend

## Knowledge Gaps
- **63 isolated node(s):** `apps/api Hono`, `Manual DI createApp(deps)`, `packages/application`, `packages/db`, `packages/domain` (+58 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1542 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Design patterns` connect `Design patterns` to `Singleton pattern`, `Full-Stack Architecture Blueprint`, `COURSE.md`?**
  _High betweenness centrality (0.326) - this node is a cross-community bridge._
- **What connects `apps/api Hono`, `Manual DI createApp(deps)`, `packages/application` to the rest of the system?**
  _63 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SA-10 — Capacity, back-of-envelope, bottlenecks` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Why does `Project blueprint` connect `COURSE.md` to `Design patterns`, `Tech space documentation`, `Full-Stack Architecture Blueprint`, `SOLID principles`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Should `Blueprint backend and DB` be split into smaller, more focused modules?**
  _Cohesion score 0.07671957671957672 - nodes in this community are weakly interconnected._
- **Why does `Abstract Factory pattern` connect `Design patterns` to `Design patterns`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `Architecture concepts registry` be split into smaller, more focused modules?**
  _Cohesion score 0.08108108108108109 - nodes in this community are weakly interconnected._
# Graph Report - full-stack-architecture-blueprint  (2026-11-21)

## Corpus Check
- Corpus is ~23,403 words - fits in a single context window. You may not need a graph.

## Summary
- 158 nodes · 189 edges · 31 communities (11 shown, 20 thin omitted)
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.87)
- Token cost: 75,500 input · 16,600 output

## Community Hubs (Navigation)
- SOLID and design patterns
- Blueprint backend and DB
- Architecture concepts registry
- Hono API and learning path
- Auth security and OCP
- React rendering and sync
- Monorepo tooling walkthrough
- UI domain separation
- Modular monolith vs microservices
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

## God Nodes (most connected - your core abstractions)
1. `Repository pattern` - 9 edges
2. `Dependency Inversion Principle (DIP)` - 9 edges
3. `Database abstraction (port + adapters)` - 9 edges
4. `Dependency Inversion` - 8 edges
5. `Adapter` - 8 edges
6. `Vertical Slice` - 7 edges
7. `React modern rendering model` - 7 edges
8. `Hono backend architecture` - 7 edges
9. `Hono Backend API` - 6 edges
10. `Hexagonal Architecture` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Vertical slice` --semantically_similar_to--> `Vertical Slice`  [INFERRED] [semantically similar]
  Docs/.brain/GLOSSARY.md → Docs/.brain/CONCEPTS.md
- `Adapter` --semantically_similar_to--> `Adapter`  [INFERRED] [semantically similar]
  Docs/.brain/GLOSSARY.md → Docs/.brain/CONCEPTS.md
- `TodoReader port` --semantically_similar_to--> `Repository pattern`  [INFERRED] [semantically similar]
  Docs/knowledge/solid/04-I.md → Docs/knowledge/design-patterns/repository.md
- `Graphify knowledge graph workflow` --conceptually_related_to--> `Step 16 GitHub Actions CI and Graphify`  [INFERRED]
  README.md → Docs/walkthrough/16-ci-and-graphify/README.md
- `Graphify` --conceptually_related_to--> `Vertical Slice`  [INFERRED]
  Docs/.brain/QUERY-GUIDE.md → Docs/.brain/CONCEPTS.md

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

## Communities (31 total, 20 thin omitted)

### Community 0 - "SOLID and design patterns"
Cohesion: 0.14
Nodes (25): Adapter pattern, Repository pattern, Strategy pattern, Single Responsibility Principle (SRP), TodoRepository (SRP teaching port), Open-Closed Principle (OCP), TodoRepository port (OCP), Liskov Substitution Principle (LSP) (+17 more)

### Community 1 - "Blueprint backend and DB"
Cohesion: 0.09
Nodes (20): Project blueprint, apps/api Hono, Manual DI createApp(deps), packages/application, packages/db, Todo vertical slice feature, TodoRepository port, Step 04 application use cases and TodoRepository port (+12 more)

### Community 2 - "Architecture concepts registry"
Cohesion: 0.15
Nodes (14): Adapter, Clean Architecture, Database Adapter Package, Dependency Injection, Dependency Inversion, Factory, Hexagonal Architecture, Layered Architecture (+6 more)

### Community 3 - "Hono API and learning path"
Cohesion: 0.14
Nodes (15): API Validation, Error Handling, Hono Backend API, Interface Segregation, Learning Path, Monorepo Setup Step, Monorepo Structure, Project Blueprint (+7 more)

### Community 4 - "Auth security and OCP"
Cohesion: 0.17
Nodes (14): Auth Session Example, Concept registry, Open-Closed, Security & observability, Strategy, Glossary, God node, .brain — documentation index (+6 more)

### Community 5 - "React rendering and sync"
Cohesion: 0.28
Nodes (9): Observer pattern, Optimistic UI Sync Example, Legacy class lifecycle, Client Components, React modern rendering model, Separation of UI and Domain, Server Components, React rendering model (+1 more)

### Community 6 - "Monorepo tooling walkthrough"
Cohesion: 0.29
Nodes (6): packages/domain, pnpm package manager, Turborepo task graph, Step 01 pnpm workspace and Turborepo skeleton, Step 02 shared TypeScript ESLint Prettier Vitest, Step 03 packages/domain pure Todo rules

### Community 7 - "UI domain separation"
Cohesion: 0.47
Nodes (5): Legacy Class Lifecycle, Observer, Optimistic UI Sync Example, React Modern Rendering Model, Separation of UI and Domain

### Community 8 - "Modular monolith vs microservices"
Cohesion: 0.40
Nodes (3): Microservices, Modular Monolith, Architecture styles

### Community 9 - "Web and mobile apps"
Cohesion: 0.67
Nodes (3): Capacitor Mobile App, Next.js Web App, Shared Domain Package

### Community 10 - "Database vendor adapters"
Cohesion: 0.67
Nodes (3): libSQL Adapter, MariaDB Adapter, PostgreSQL Adapter

## Knowledge Gaps
- **65 isolated node(s):** `Glossary`, `Full-Stack Architecture Blueprint`, `Tooling Stack`, `Monorepo Setup Step`, `Next.js Web App` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 76 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Examples` connect `Auth security and OCP` to `Architecture concepts registry`, `Hono API and learning path`, `UI domain separation`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 4 inferred relationships involving `Repository pattern` (e.g. with `TodoRepository (SRP teaching port)` and `TodoRepository port (OCP)`) actually correct?**
  _`Repository pattern` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Glossary`, `Full-Stack Architecture Blueprint`, `Tooling Stack` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `SOLID and design patterns` be split into smaller, more focused modules?**
  _Cohesion score 0.14245014245014245 - nodes in this community are weakly interconnected._
- **Why does `Vertical slice — Todo` connect `Hono API and learning path` to `Architecture concepts registry`, `Auth security and OCP`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Should `Blueprint backend and DB` be split into smaller, more focused modules?**
  _Cohesion score 0.09057971014492754 - nodes in this community are weakly interconnected._
- **Should `Architecture concepts registry` be split into smaller, more focused modules?**
  _Cohesion score 0.14761904761904762 - nodes in this community are weakly interconnected._
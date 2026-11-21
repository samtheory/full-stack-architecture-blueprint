# Full-Stack Architecture Blueprint

Open-source, interview-ready learning monorepo. It teaches software architecture, design patterns, SOLID, and production-quality engineering through **working examples**—not theory alone.

> **Status:** documentation-first. The Docs layer and project blueprint exist; the runnable monorepo (apps/packages) comes next after blueprint approval.

## What this repository is

- A practical reference for **when** to use layered, hexagonal, clean, modular monolith, and related styles
- Code-shaped explanations of SOLID, dependency inversion, and clean boundaries
- Realistic but small full-stack slices: React, Next.js, Capacitor + React, Hono, and multi-database adapters (libSQL, MariaDB, PostgreSQL)
- A portfolio-friendly project and interview study guide

## What this repository is not

- A claim that one architecture is universally best
- Abstractions invented only to name a design pattern
- A dump of theory without runnable intent

## Repository layout (current)

```text
.
├── README.md                 # You are here — project overview and how to navigate
├── Docs/                     # Learning docs, architecture, examples, knowledge
│   ├── .brain/               # Graphify-friendly index (concepts, links, query guide)
│   ├── tech-space/           # Project + technical architecture and ADRs
│   ├── walkthrough/          # Step-by-step build (monorepo → slice → adapters → CI)
│   ├── knowledge/            # SOLID, architecture styles, patterns, React lifecycle
│   └── examples/             # Cross-layer use cases (web, mobile, API, DB)
├── .graphifyignore           # Keep Graphify focused on high-signal sources
└── .gitignore
```

Planned after approval (not created yet):

```text
apps/web          # Next.js web app
apps/mobile       # Capacitor + React
apps/api          # Hono API
packages/*        # Shared domain, contracts, DB adapters, UI, config
```

## Documentation map

| Area | Purpose | Start here |
|------|---------|------------|
| [Docs/README.md](Docs/README.md) | How to read the docs | Docs entry |
| [Docs/.brain/INDEX.md](Docs/.brain/INDEX.md) | Agent/human index for low-token navigation | Graphify index |
| [Docs/tech-space/project-blueprint.md](Docs/tech-space/project-blueprint.md) | Full blueprint (structure, tooling, API, DB, plan) | Architecture plan |
| [Docs/walkthrough/](Docs/walkthrough/README.md) | Ordered build steps with commands and decisions | Implementation manual |
| [Docs/knowledge/](Docs/knowledge/README.md) | Principles, styles, patterns, React model | Concepts |
| [Docs/examples/](Docs/examples/README.md) | Features that span UI → API → DB | Hands-on path |

Each knowledge topic uses a consistent shape:

1. **What it is**
2. **When to use / when not to**
3. **Good practice**
4. **Bad / worst practice**
5. **Trade-offs**
6. **Where it appears in this repo** (once code exists)

## How to use this repo (learning path)

1. Read [Docs/tech-space/project-blueprint.md](Docs/tech-space/project-blueprint.md) for scope and decisions.
2. Skim [Docs/.brain/CONCEPTS.md](Docs/.brain/CONCEPTS.md) so terms stay consistent.
3. Build with [Docs/walkthrough/](Docs/walkthrough/README.md) — one numbered step at a time (start at `01-monorepo-setup`).
4. Study [Docs/knowledge/solid/](Docs/knowledge/solid/README.md) and one architecture style that matches your current problem.
5. Walk [Docs/examples/vertical-slice-todo/](Docs/examples/vertical-slice-todo/README.md) as the first end-to-end story.
6. Compare patterns in [Docs/knowledge/design-patterns/](Docs/knowledge/design-patterns/README.md) against the same example.
7. After the monorepo lands: run the vertical slice locally, then read tests.

Suggested order is also listed in the blueprint under **Learning path**.

## Graphify (less token loss)

This Docs tree is shaped for [Graphify](https://docs.graphify.com/open-source/overview): query the knowledge graph instead of re-reading every Markdown file.

**Needs verification on your machine:** package name `graphifyy` on PyPI, `graphify install` platforms, and Cursor skill registration. Follow current Graphify docs if any command differs.

```bash
# Install CLI (verify against https://docs.graphify.com/open-source/quickstart)
uv tool install graphifyy
# or: pipx install graphifyy

graphify install

# From repo root, in your coding agent:
# /graphify .

# Useful follow-ups:
# /graphify query "how does the API talk to the database adapters"
# /graphify path "Dependency Inversion" "Hono backend"
# /graphify explain "Database Adapter"
```

Index of concepts and explicit links lives in `Docs/.brain/` so Graphify (and humans) can traverse hubs without loading the full tree.

## How to run (planned)

Commands below are the **intended** local workflow once the monorepo is implemented. They are not runnable yet.

```bash
# Planned (pnpm + Turborepo — see blueprint tooling section)
pnpm install
pnpm dev          # API + web (and docs site if added)
pnpm test
pnpm lint
pnpm typecheck
```

Database adapters will be selected via env (exact variable names TBD in implementation ADRs), for example:

```bash
# Planned shape — verify during implementation
DATABASE_DRIVER=libsql|mariadb|postgres
DATABASE_URL=...
```

## Contributing / next step

1. Review and approve [Docs/tech-space/project-blueprint.md](Docs/tech-space/project-blueprint.md).
2. Resolve open decisions in [Docs/tech-space/decisions/](Docs/tech-space/decisions/README.md).
3. Implement Phase 0–1: monorepo skeleton + smallest vertical slice.

## License

License TBD before first public release (recommendation: MIT or Apache-2.0).

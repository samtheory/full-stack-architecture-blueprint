# .brain — documentation index

WHY: Agents and humans should enter through a small index instead of loading every Markdown file. This folder is the **navigation graph** for Docs; Graphify can treat these pages as hubs.

## Entry points

| Need | Go to |
|------|--------|
| What exists and where | This file |
| Named concepts (nodes) | [CONCEPTS.md](CONCEPTS.md) |
| Explicit relationships (edges) | [LINKS.md](LINKS.md) |
| Shared vocabulary | [GLOSSARY.md](GLOSSARY.md) |
| Graphify query recipes | [QUERY-GUIDE.md](QUERY-GUIDE.md) |
| Full project blueprint | [../tech-space/project-blueprint.md](../tech-space/project-blueprint.md) |
| Career course (plans → CTO) | [../course/README.md](../course/README.md) |
| Course implementation phases | [../course/PLAN.md](../course/PLAN.md) |
| Architecture knowledge tracks | [../knowledge/COURSE.md](../knowledge/COURSE.md) |
| Step-by-step build | [../walkthrough/README.md](../walkthrough/README.md) |
| First build step (monorepo) | [../walkthrough/01-monorepo-setup/README.md](../walkthrough/01-monorepo-setup/README.md) |
| Graphify setup status | [GRAPHIFY-SETUP.md](GRAPHIFY-SETUP.md) |

## Docs map (communities)

```text
.brain          → indexing, vocabulary, query recipes
course          → curriculum plans (stack, infra, soft skills, CTO)
tech-space      → blueprint, monorepo, API, DB, ADRs
walkthrough     → ordered implementation steps (commands + why)
knowledge       → SOLID, architecture styles, patterns, React
examples        → vertical slices and cross-layer stories
```

## Recommended first queries

- `SOLID Dependency Inversion` → Hono API → database adapters
- `Repository` vs `Adapter` in this project
- React modern rendering vs legacy class lifecycle
- Vertical slice Todo across web / mobile / API / DB
- Walkthrough step monorepo setup commands

## Maintenance rules

1. New durable concept → add a row in `CONCEPTS.md`.
2. New relationship between concepts → add an edge in `LINKS.md`.
3. New term of art → `GLOSSARY.md`.
4. Prefer linking to existing pages over duplicating explanations.
5. Keep `.brain` short; put depth in `knowledge/` and `tech-space/`.

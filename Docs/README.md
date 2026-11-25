# Docs

Documentation-first layer for **Full-Stack Architecture Blueprint**.

These docs are written so a human can learn in order, and so [Graphify](https://docs.graphify.com/open-source/overview) can index concepts with less token waste than dumping every file into context.

## Folder purposes

| Folder | Purpose |
|--------|---------|
| [`.brain/`](.brain/INDEX.md) | Indexing brain: concept registry, explicit links, glossary, query recipes |
| [`course/`](course/README.md) | Full curriculum plans: stack, platform, soft skills, CTO — implement in phases |
| [`tech-space/`](tech-space/README.md) | Project architecture, technical design, ADRs, blueprint |
| [`walkthrough/`](walkthrough/README.md) | Step-by-step build manual (one folder per step, commands + why) |
| [`knowledge/`](knowledge/README.md) | Explain principles, styles, patterns — with good/bad practice and when-to-use |
| [`examples/`](examples/README.md) | Cross-cutting use cases that will map to web, mobile, API, and DB |

## How to read

1. **Orient** — [`.brain/INDEX.md`](.brain/INDEX.md)
2. **Plan career curriculum** — [`course/`](course/README.md) + [`course/PLAN.md`](course/PLAN.md)
3. **Plan this product** — [`tech-space/project-blueprint.md`](tech-space/project-blueprint.md)
4. **Build** — [`walkthrough/`](walkthrough/README.md) (implement one numbered step at a time)
5. **Learn architecture concepts** — [`knowledge/`](knowledge/README.md) / [`knowledge/COURSE.md`](knowledge/COURSE.md)
6. **Follow a story** — [`examples/vertical-slice-todo/`](examples/vertical-slice-todo/README.md)
7. **Decide** — [`tech-space/decisions/`](tech-space/decisions/README.md) before writing code

## Document template (knowledge + examples)

Use this shape so Graphify and readers get consistent nodes:

```markdown
# Title

## What it is
## When to use
## When not to use
## Good practice
## Bad / worst practice
## Trade-offs
## Related concepts
## Where in this repo
```

## Graphify tip

Prefer querying hubs listed in `.brain/CONCEPTS.md` instead of grepping the whole Docs tree. Explicit relationships live in `.brain/LINKS.md`.

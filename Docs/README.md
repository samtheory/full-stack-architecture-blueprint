# Docs

Documentation-first layer for **Full-Stack Architecture Blueprint**.

These docs are written so a human can learn in order, and so [Graphify](https://docs.graphify.com/open-source/overview) can index concepts with less token waste than dumping every file into context.

## Folder purposes

| Folder | Purpose |
|--------|---------|
| [`.brain/`](.brain/INDEX.md) | Indexing brain: concept registry, explicit links, glossary, query recipes |
| [`tech-space/`](tech-space/README.md) | Project architecture, technical design, ADRs, blueprint |
| [`walkthrough/`](walkthrough/README.md) | Step-by-step build manual (one folder per step, commands + why) |
| [`knowledge/`](knowledge/README.md) | Explain principles, styles, patterns — with good/bad practice and when-to-use |
| [`examples/`](examples/README.md) | Cross-cutting use cases that will map to web, mobile, API, and DB |

## How to read

1. **Orient** — [`.brain/INDEX.md`](.brain/INDEX.md)
2. **Plan** — [`tech-space/project-blueprint.md`](tech-space/project-blueprint.md)
3. **Build** — [`walkthrough/`](walkthrough/README.md) (implement one numbered step at a time)
4. **Learn concepts** — [`knowledge/`](knowledge/README.md)
5. **Follow a story** — [`examples/vertical-slice-todo/`](examples/vertical-slice-todo/README.md)
6. **Decide** — [`tech-space/decisions/`](tech-space/decisions/README.md) before writing code

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

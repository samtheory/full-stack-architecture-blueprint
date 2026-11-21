# Graphify query guide

Goal: answer architecture questions by traversing a small graph instead of stuffing the whole Docs tree into context.

## Setup (verify against current Graphify docs)

```bash
uv tool install graphifyy
graphify install
```

From the repository root in your agent:

```text
/graphify .
```

Outputs land in `graphify-out/` (`graph.json`, `graph.html`, `GRAPH_REPORT.md`). Commit `graph.json` + `GRAPH_REPORT.md` if the team should share them; keep `cache/` gitignored.

## Query recipes

| Intent | Example |
|--------|---------|
| How layers connect | `/graphify query "how does Hono Backend API depend on Database Adapter Package"` |
| Path between ideas | `/graphify path "Dependency Inversion" "libSQL Adapter"` |
| Explain one hub | `/graphify explain "Vertical Slice"` |
| Contrast styles | `/graphify query "Modular Monolith vs Microservices trade-offs in this repo"` |
| Find bad-practice guidance | `/graphify query "bad practice Repository pattern"` |
| React lifecycle | `/graphify query "React Modern Rendering Model vs Legacy Class Lifecycle"` |
| How to build the monorepo | `/graphify query "Walkthrough Monorepo Setup Step commands"` |
| Next implementation step | `/graphify query "Walkthrough step after Hono API"` |

## Token-saving habits

1. Start from [CONCEPTS.md](CONCEPTS.md) hubs, then open one linked doc.
2. Prefer `/graphify query` / `path` / `explain` over reading every file under `knowledge/`.
3. After Doc edits: `/graphify . --update` (or the current incremental command from Graphify docs).
4. Keep `.brain` small; put long explanations outside it.
5. Use `# WHY:` / `# NOTE:` in future code so rationale becomes graph nodes (Graphify extracts these).

## Needs verification

- Exact Cursor platform flag for `graphify install --platform ...`
- Whether `/graphify` skill is available in your Cursor build vs CLI-only workflow
- Whether Docs-only graphs need `--mode deep` for richer doc edges

If a command fails, follow https://docs.graphify.com/open-source/quickstart — do not invent flags.

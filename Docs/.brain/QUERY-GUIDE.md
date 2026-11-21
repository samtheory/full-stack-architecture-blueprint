# Graphify query guide

Goal: answer architecture questions by traversing a small graph instead of stuffing the whole Docs tree into context.

**Setup status:** [GRAPHIFY-SETUP.md](GRAPHIFY-SETUP.md) (CLI + Cursor rule + initial `graphify-out/` installed).

## Already installed on this machine/repo

- Package: `graphifyy` (command `graphify`)
- Cursor rule: `.cursor/rules/graphify.mdc`
- Graph: `graphify-out/graph.json` (docs corpus)

```powershell
$env:Path = "$env:USERPROFILE\.local\bin;$env:Path"
graphify --version
```

## Query recipes

| Intent | Example |
|--------|---------|
| How layers connect | `graphify query "Hono Backend API Database Adapter"` |
| Path between ideas | `graphify path "Dependency Inversion" "libSQL Adapter" --undirected` |
| Explain one hub | `graphify explain "Vertical Slice"` |
| Contrast styles | `graphify query "Modular Monolith Microservices"` |
| SOLID / Repository | `graphify query "Repository pattern Dependency Inversion"` |
| React lifecycle | `graphify query "React modern rendering Legacy"` |
| Walkthrough monorepo | `graphify query "pnpm Turborepo Monorepo"` |
| God nodes | `graphify god-nodes --top 8` |

In Cursor chat you can also use the skill form:

```text
/graphify query "how does the API talk to the database adapters"
```

## Token-saving habits

1. Start from [CONCEPTS.md](CONCEPTS.md) hubs, then open one linked doc.
2. Prefer `graphify query` / `path` / `explain` over reading every file under `knowledge/`.
3. After Doc edits: `/graphify . --update` (agent) or `graphify extract . --backend gemini` if `GEMINI_API_KEY` is set.
4. After **code** lands: `graphify update .` (AST only, no model).
5. Keep `.brain` small; put long explanations outside it.
6. Use `# WHY:` / `# NOTE:` in future code so rationale becomes graph nodes.

## Explore visually

Open `graphify-out/graph.html` in a browser. Skim `graphify-out/GRAPH_REPORT.md` for community hubs.

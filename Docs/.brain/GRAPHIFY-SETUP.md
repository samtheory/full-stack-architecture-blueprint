# Graphify setup status

Last verified: 2026-11-21 · CLI `graphifyy` **0.9.114**

## What is configured

| Item | Status |
|------|--------|
| `uv tool install graphifyy` | Done (CLI on PATH via `%USERPROFILE%\.local\bin`) |
| Project Cursor rule | Done — `.cursor/rules/graphify.mdc` |
| `.graphifyignore` | Done |
| `graphify-out/cache/` gitignored | Done |
| Initial knowledge graph | Done — docs corpus extracted (158 nodes) |
| `graphify hook install` | Optional — run yourself (writes git hooks + local merge driver) |

## Outputs

```text
graphify-out/
├── graph.json         # queryable graph (commit if sharing)
├── graph.html         # open in a browser
├── GRAPH_REPORT.md    # hubs, communities, suggested questions
└── cache/             # keep gitignored
```

## Commands (from repo root)

```powershell
# Ensure CLI is on PATH (new shells)
$env:Path = "$env:USERPROFILE\.local\bin;$env:Path"
graphify --version

# Query
graphify query "Dependency Inversion Hono"
graphify explain "Vertical Slice"
graphify path "Adapter" "Repository pattern" --undirected
graphify god-nodes --top 8

# After code lands (AST only, no LLM)
graphify update .

# After Docs change — rebuild semantic edges via agent:
# /graphify . --update
#
# Or headless with Gemini (if you set a key):
# $env:GEMINI_API_KEY = "…"
# graphify extract . --backend gemini
```

## Optional: git hooks

```powershell
graphify hook install
graphify hook status
```

This registers post-commit/checkout/merge/rewrite hooks and a `graph.json` merge driver (local git config). Run only if you want automatic code-graph refresh after git operations.

## Optional: hosted Graphify MCP

For Cursor hosted MCP (OAuth), see https://docs.graphify.com/integrations/cursor — add `https://api.graphify.com/mcp` in MCP settings. That is separate from this local CLI graph.

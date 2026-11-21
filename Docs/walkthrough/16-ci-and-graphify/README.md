# 16 — CI and Graphify

Status: not started

## Goal

Add **GitHub Actions CI** (install, typecheck, lint, test, optional Playwright) and wire **Graphify** so agents query the knowledge graph instead of re-reading every file. Refresh Docs status; commit `graphify-out/graph.json` + `GRAPH_REPORT.md` if desired (not `cache/`).

## Why this decision

| Choice | Why |
|--------|-----|
| CI early after features stabilize | Prevents silent breakage across adapters |
| Graphify | Less token loss navigating Docs + code |
| Matrix for DB drivers (optional job) | Proves multi-adapter honesty |

## Alternatives considered

| Alternative | Why not only |
|-------------|--------------|
| No CI until “done” | Repos rot |
| Hosted-only Graphify | Fine later; local CLI matches offline teaching |

## Prerequisites

- Steps 09–10 minimum; ideally through 12+
- Graphify install path verified on your machine ([QUERY-GUIDE](../../.brain/QUERY-GUIDE.md))

## Commands

```bash
# CI will roughly do:
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
# pnpm exec playwright test

# Graphify (verify against https://docs.graphify.com/open-source/quickstart)
uv tool install graphifyy
graphify install
# In agent: /graphify .
# Or CLI extract if skill unavailable — use documented CLI only
```

Ensure `.gitignore` keeps `graphify-out/cache/` ignored; `.graphifyignore` stays focused.

```bash
graphify hook install   # optional — verify before recommending in README
```

## What to create

| Path | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | PR checks |
| Optional DB service containers | Postgres/MariaDB jobs |
| Root README badges/section | CI + Graphify how-to |
| Update walkthrough statuses | Mark completed steps |
| `graphify-out/GRAPH_REPORT.md` | Optional commit |

## Good practice

- Frozen lockfile in CI
- Fail on type errors
- Document which jobs need Docker

## Bad / worst practice

- Secrets in workflow logs
- Flaky E2E without retries/artifact uploads
- Inventing Graphify flags not in current docs

## Acceptance criteria

- [ ] PR CI runs typecheck + unit/API tests
- [ ] README documents Graphify query workflow
- [ ] `.graphifyignore` / gitignore correct
- [ ] Walkthrough index reflects reality

## Agent prompt

```text
Implement Docs/walkthrough/16-ci-and-graphify only.
Add GitHub Actions CI and document/verify Graphify setup for this repo.
Do not invent CLI flags; follow current Graphify docs.
```

## Next step

You are done with the planned walkthrough. Further work: interview Q&A pages, more examples, or performance/observability deep dives — add new numbered steps if needed.

## Related

- [../../.brain/QUERY-GUIDE.md](../../.brain/QUERY-GUIDE.md)
- [../../../README.md](../../../README.md)
- [../../tech-space/project-blueprint.md](../../tech-space/project-blueprint.md)

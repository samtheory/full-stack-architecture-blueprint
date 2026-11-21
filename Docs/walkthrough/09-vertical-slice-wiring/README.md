# 09 — Vertical slice wiring

Status: not started

## Goal

Connect **web → API → application → libSQL** into one runnable Todo feature. Update root README with real “how to run” commands. This is the first **demo-able** milestone.

## Why this decision

| Choice | Why |
|--------|-----|
| **Vertical slice before more patterns** | Proves architecture with a thin feature, not a forest of folders |
| **Same use cases end-to-end** | Interview walkthrough: follow one request through layers |
| **Document run path now** | Repo becomes useful to learners, not only impressive on disk |

## Alternatives considered

| Alternative | Why not |
|-------------|---------|
| Build mobile before web E2E works | Higher friction; web is enough for first slice |
| Add auth first | Blocks the learning milestone |

## Prerequisites

- Steps 03–08 complete
- API health + Todo routes + libSQL + web scaffold exist

## Commands

```bash
# Terminal 1
pnpm --filter @fsab/api dev

# Terminal 2
pnpm --filter @fsab/web dev

# Optional convenience root script (add in this step):
# "dev:slice": "turbo run dev --filter=@fsab/api --filter=@fsab/web"
pnpm dev   # if turbo filters configured
```

Manual smoke:

1. Create a todo in the UI
2. Reload — todo persists (libSQL file)
3. Complete todo — state updates

```bash
pnpm test
pnpm typecheck
```

## What to create / update

| Path | Purpose |
|------|---------|
| Web Todo UI complete | list / create / complete |
| API routes complete | match UI needs |
| Root `README.md` | Accurate install/run |
| `Docs/examples/vertical-slice-todo` | Mark status / link to code paths |
| CORS + env | Web origin allowed |

## Good practice

- Keep the feature tiny; polish boundaries, not CSS theme parks
- One happy-path Playwright test can wait for step 10 if needed — smoke manually here at minimum

## Bad / worst practice

- Adding Strategy/Observer “because we have a slice”
- Duplicating domain validation differently in UI vs API without contracts
- README commands that were never run

## Acceptance criteria

- [ ] New contributor can follow README and create a todo locally
- [ ] Data persists across API restart (libSQL file or documented equivalent)
- [ ] Domain rules still enforced server-side
- [ ] Example doc links to real folders/files

## Agent prompt

```text
Implement Docs/walkthrough/09-vertical-slice-wiring only.
Wire web → API → application → libSQL for the Todo feature end-to-end.
Update README run instructions with commands you verified.
Do not start Postgres, mobile, or auth in this step.
```

## Next step

[10 — Testing strategy](../10-testing-strategy/README.md)

## Related

- [../../examples/vertical-slice-todo/README.md](../../examples/vertical-slice-todo/README.md)
- [../../tech-space/project-blueprint.md](../../tech-space/project-blueprint.md)

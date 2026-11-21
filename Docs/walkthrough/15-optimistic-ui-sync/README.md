# 15 — Optimistic UI sync

Status: not started

## Goal

Add optimistic create/complete on web (and mobile if practical): update UI immediately, reconcile with API, handle failures/conflicts. Keep conflict policy **outside** presentational components.

## Why this decision

| Choice | Why |
|--------|-----|
| Optimistic UX | Real-world frontend architecture lesson |
| Shared mutation policy | Separation of UI and domain/application rules |
| Version/ETag or `updatedAt` | Honest conflict teaching |

## Alternatives considered

| Alternative | Why not only |
|-------------|--------------|
| Pessimistic UI always | Simpler; misses the example’s teaching goal |
| Heavy offline-first CRDT | Out of scope |

## Prerequisites

- Step 09+ Todo API; auth optional but consider authorized mutations
- [../../examples/optimistic-ui-sync/README.md](../../examples/optimistic-ui-sync/README.md)

## Commands

```bash
pnpm --filter @fsab/web test
pnpm exec playwright test
# mobile optional
```

## What to create

| Path | Purpose |
|------|---------|
| Client mutation helper | applyOptimistic → confirm/rollback |
| API conditional update | conflict → 409 |
| UI status for errors | Accessible announcements |
| Tests | Race/failure rollback |

## Good practice

- Server remains source of truth
- Explicit rollback paths
- Avoid duplicating merge logic in every component (Observer/invalidation ok)

## Bad / worst practice

- Mark success before request and ignore errors
- Huge global event bus with stringly events

## Acceptance criteria

- [ ] Optimistic complete/create feels instant on success path
- [ ] Forced API failure rolls UI back
- [ ] Conflict path documented and tested
- [ ] Example doc updated with code links

## Agent prompt

```text
Implement Docs/walkthrough/15-optimistic-ui-sync only.
Add optimistic Todo mutations with rollback and conflict handling.
Keep policy out of dumb UI components. Do not start unrelated features.
```

## Next step

[16 — CI and Graphify](../16-ci-and-graphify/README.md)

## Related

- [../../knowledge/design-patterns/observer.md](../../knowledge/design-patterns/observer.md)
- [../../knowledge/react-rendering/modern-lifecycle.md](../../knowledge/react-rendering/modern-lifecycle.md)

# 13 — Capacitor mobile

Status: not started

## Goal

Scaffold `apps/mobile` with **Capacitor + React + Vite**, consuming the **same Hono API** and contracts as web. Shared UI only if client-safe.

## Why this decision

| Choice | Why |
|--------|-----|
| Capacitor | Native shell without rewriting domain |
| Same API | Proves multi-client architecture |
| Vite + React | Standard Capacitor web asset pipeline — **verify** current template |

WHY after DB adapters: mobile is a delivery edge; the slice must already be stable.

## Alternatives considered

| Alternative | Why not first |
|-------------|---------------|
| React Native | Separate UI paradigm; higher cost for this blueprint |
| Mobile before web E2E | Harder debugging |

## Prerequisites

- Step 09+ API stable
- Android Studio / Xcode only if you need device builds (web asset in browser may suffice early)

## Commands

**Needs verification:** current Capacitor + Vite scaffold commands.

```bash
# Typical direction (confirm in Capacitor docs):
# create Vite React TS app in apps/mobile, then
# pnpm --filter @fsab/mobile add @capacitor/core @capacitor/cli
# pnpm exec cap init
# pnpm exec cap add android  # optional

pnpm --filter @fsab/mobile add @fsab/contracts@workspace:*
pnpm --filter @fsab/mobile dev
```

Point API base URL at machine IP for device/emulator (document this).

## What to create

| Path | Purpose |
|------|---------|
| `apps/mobile` | Vite React + Capacitor config |
| Todo screens | Call same API |
| Adapter for secure storage (optional stub) | Plugin behind interface |
| README section | Run on web / emulator |

## Good practice

- No RSC-only imports in shared `packages/ui`
- Isolate Capacitor plugins behind adapters
- Reuse contracts for payloads

## Bad / worst practice

- Forking business rules into mobile-only copies
- Assuming `localStorage` is secure storage

## Acceptance criteria

- [ ] Mobile web/dev build lists/creates todos against local API
- [ ] Package does not import `@fsab/db`
- [ ] Run instructions documented (including device networking caveats)
- [ ] Capacitor versions pinned in lockfile

## Agent prompt

```text
Implement Docs/walkthrough/13-capacitor-mobile only.
Scaffold apps/mobile with Capacitor + React calling the existing Todo API.
Verify Capacitor/Vite setup against current official docs.
Do not implement full auth yet.
```

## Next step

[14 — Auth session](../14-auth-session/README.md)

## Related

- [../../tech-space/mobile-architecture.md](../../tech-space/mobile-architecture.md)
- [../../examples/optimistic-ui-sync/README.md](../../examples/optimistic-ui-sync/README.md)

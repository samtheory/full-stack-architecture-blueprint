# Mobile architecture (Capacitor + React)

## What it is

A native shell (iOS/Android) around a React web app via Capacitor. Shared domain/contracts with web; mobile-specific adapters for storage, secure cookies/tokens, and navigation.

## Good practice

- Reuse `packages/ui` **client** components; avoid RSC-only APIs in shared UI
- Call the same Hono API as web
- Isolate Capacitor plugins behind small adapters (camera, secure storage)
- Document platform permission flows

## Bad / worst practice

- Forking business logic into a separate mobile-only copy
- Assuming `localStorage` security equals secure storage
- Blocking the learning path on perfect native CI in phase 1

## When to use Capacitor here

- Demonstrate one API + two clients
- Portfolio signal for mobile packaging without a full native rewrite

## When not

- Need heavy native UI kit fidelity (Swift/Kotlin may be better)
- Phase 1 vertical slice — web + API first is enough

## Needs verification

- Capacitor version + Vite template compatibility with the monorepo
- Shared package consumption (ESM) in the Capacitor web asset build
- Deep-link / auth cookie behavior on device vs web

## Related

- [frontend-architecture.md](frontend-architecture.md)
- [../examples/optimistic-ui-sync/README.md](../examples/optimistic-ui-sync/README.md)

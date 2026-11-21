# 08 — Next.js web app

Status: not started

## Goal

Scaffold `apps/web` with **Next.js App Router** as the web edge: pages/layouts only, calling the Hono API (not embedding SQL). Prefer modern React (Server/Client Components); no class components.

## Why this decision

| Choice | Why |
|--------|-----|
| **Next.js** | Production-like web app; teaches server/client boundaries |
| **API as separate process** | Same client pattern as mobile later |
| **App Router** | Current Next default — **verify** create command for your Next major |

WHY not put use cases in Server Actions talking to DB directly in phase 1: it collapses the teaching boundary; can be a later comparison lesson.

## Alternatives considered

| Alternative | Why not first |
|-------------|---------------|
| Vite SPA only | Simpler; weaker SSR/RSC teaching |
| Next Route Handlers instead of Hono | Valid; weaker multi-app API story |
| Remix | Viable alternative; Next chosen for familiarity in interviews |

## Prerequisites

- Step 06–07 API runnable
- CORS / URL config planned (`NEXT_PUBLIC_API_URL` or server-only URL)

## Commands

**Needs verification:** official Next.js scaffold flags change over time. Prefer:

```bash
# From repo root — confirm current recommended approach for monorepos
pnpm create next-app@latest apps/web
# Choose: TypeScript, ESLint, App Router, no need for Tailwind unless you want it
# Then set package name to @fsab/web and join workspace
```

Or manual package + dependencies if you want tighter control.

```bash
pnpm --filter @fsab/web add @fsab/contracts@workspace:*
# optional later: @fsab/ui

pnpm --filter @fsab/web dev
```

Document ports: API `3001`, web `3000` (example only — pick and stick).

## What to create

| Path | Purpose |
|------|---------|
| `apps/web` Next scaffold | App router shell |
| Todo page (minimal UI) | List + create form calling API |
| Fetch helper | Base URL from env; typed with contracts |
| a11y basics | Labels, buttons, error text |

Optional: stub `packages/ui` button/input — only if it reduces duplication now; otherwise wait.

## Good practice

- Validate with shared contracts on the client for UX; **server remains source of truth**
- Client Components only where interactivity needs them
- Accessible forms from the first screen

## Bad / worst practice

- Importing `@fsab/db` into Next.js
- Teaching class lifecycles
- Hardcoding production API URLs in committed code

## Acceptance criteria

- [ ] `pnpm --filter @fsab/web dev` serves a page
- [ ] Page can talk to local API (even if full Todo UX finishes in step 09)
- [ ] No DB driver imports in `apps/web`
- [ ] Env example documents API base URL

## Agent prompt

```text
Implement Docs/walkthrough/08-nextjs-web-app only.
Scaffold apps/web with Next.js App Router and a minimal page that can call the API base URL.
Do not import database packages. Use modern React only.
Verify create-next-app flags against current Next.js docs.
```

## Next step

[09 — Vertical slice wiring](../09-vertical-slice-wiring/README.md)

## Related

- [../../tech-space/frontend-architecture.md](../../tech-space/frontend-architecture.md)
- [../../knowledge/react-rendering/modern-lifecycle.md](../../knowledge/react-rendering/modern-lifecycle.md)

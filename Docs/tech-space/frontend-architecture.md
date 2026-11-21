# Frontend architecture (React + Next.js)

## What it is

Next.js is the **web delivery edge**. React components render UI; domain rules stay in shared packages. Prefer the **modern rendering model** (functions, hooks, server/client components) — not class lifecycles.

## Boundaries

| Layer | Allowed | Forbidden |
|-------|---------|-----------|
| Route/page (Next) | Composition, data fetch wiring, auth gates | Business invariants |
| `packages/ui` | Presentational components, a11y | Fetching, SQL, env secrets |
| Feature hooks/clients | HTTP to API, cache keys | Duplicating domain validation inconsistently |
| Domain package | Pure rules | `window`, React, Next APIs |

## Good practice

- Server Components for data shells; Client Components for interactivity
- Shared Zod contracts for forms aligned with API
- Accessible forms (labels, focus, errors) from day one
- Colocate UI state; keep server authority for invariants

## Bad / worst practice

- Copy-pasting API URL + fetch logic with divergent validation
- Teaching `componentDidMount` as the default model
- Putting pricing/permission rules only in the client
- Card/dashboard clutter in learning demos that obscures the architecture lesson

## When Next.js is appropriate here

- SEO/SSR matters or you want a production-like web app structure
- Demonstrating server/client boundaries

## When not

- Pure component kata with no routing — Vite SPA may be simpler
- If the lesson is React-only without a web framework edge

## Related

- [../knowledge/react-rendering/modern-lifecycle.md](../knowledge/react-rendering/modern-lifecycle.md)
- [../knowledge/react-rendering/legacy-class-lifecycle.md](../knowledge/react-rendering/legacy-class-lifecycle.md)
- [mobile-architecture.md](mobile-architecture.md)

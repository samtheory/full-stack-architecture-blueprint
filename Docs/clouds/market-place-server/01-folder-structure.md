# 01 — Folder structure + composition root

Status: done (verified)

## Goal

Reshape `clouds/market-place-server` to match the recommended architecture:

| Level | Style | In folders |
|-------|--------|------------|
| Deployable | **Modular monolith** | One Hono app; business **modules** under `src/modules/` |
| Inside a module | **Vertical slices** | One folder per use case (`create-listing`, `list-listings`) |
| Edges | **Hexagonal-lite** | DB behind `src/db/` adapters; routes only drive use cases |
| Later | DDD / CQRS / events | Only inside complex modules (`order`, `payment`) — not now |

At the end of this step: `/health` and a stub `GET /v1/listings` work, with **no Drizzle yet**.

## Architecture map (read this once)

```text
HTTP
  → middleware (cors, later requestId/errors)
  → module public API (mount routes)
    → vertical slice route (validate)
      → use case (application logic)
        → port (e.g. ListingRepository)     ← hexagonal boundary
          ← adapter (Drizzle)               ← step 03/04
```

**Modular monolith rule:** other modules may import `modules/listing/public.ts` only — never slice internals.

## Target tree (build this now)

Do **not** create empty `order` / `payment` / `cart` modules yet.

```text
clouds/market-place-server/
  package.json
  tsconfig.json
  .env
  .env.example
  src/
    index.ts                          # BOOT only: env → createApp → export default
    create-app.ts                     # COMPOSITION ROOT: middleware + mount modules
    middleware/
      cors.ts                         # optional extract (ok to keep cors inline at first)
    modules/
      listing/                        # MODULE (bounded capability)
        public.ts                     # ONLY public export of this module
        list-listings/                # VERTICAL SLICE
          list-listings.route.ts      # GET /  (mounted at /v1/listings)
          list-listings.handler.ts    # thin: call use case → JSON
          list-listings.ts            # use case (returns [] for now)
        create-listing/               # VERTICAL SLICE (stub POST for later)
          create-listing.route.ts
          create-listing.handler.ts
          create-listing.ts
        shared/                       # shared ONLY inside listing module
          .gitkeep                    # errors/types later — not a global utils dump
    db/                               # driven adapters (hexagonal) — empty until step 03
      .gitkeep
```

### How this grows later (do not create yet)

```text
src/modules/
  listing/
    create-listing/
      create-listing.schema.ts      # Zod (or import @marketplace/contracts)
      create-listing.repo.ts        # optional slice-local queries
    infrastructure/                 # drizzle listing repository adapter
  identity/
  order/
    commands/...
    queries/...                     # logical CQRS when needed
    domain/                         # DDD-lite when rules get hard
  payment/
```

Cross-module calls: `import { … } from "../listing/public"` only.

## Why this shape

| Choice | Why |
|--------|-----|
| `modules/listing` | Marketplace capability boundary (modular monolith) |
| `list-listings/`, `create-listing/` | Features stay cohesive (vertical slice) |
| `public.ts` | Enforces module API — no deep imports |
| `create-app.ts` | One place to wire deps (`db`, logger) later |
| `db/` at `src/db` | Driven adapter home; ports live with use cases / module |
| No other modules yet | Empty trees create noise, not architecture |

## Do this

### 1. Create folders

**PowerShell (from repo root):**

```powershell
New-Item -ItemType Directory -Force -Path `
  clouds/market-place-server/src/middleware, `
  clouds/market-place-server/src/modules/listing/list-listings, `
  clouds/market-place-server/src/modules/listing/create-listing, `
  clouds/market-place-server/src/modules/listing/shared, `
  clouds/market-place-server/src/db | Out-Null

New-Item -ItemType File -Force -Path `
  clouds/market-place-server/src/db/.gitkeep, `
  clouds/market-place-server/src/modules/listing/shared/.gitkeep | Out-Null
```

### 2. List-listings slice (stub)

```ts
// src/modules/listing/list-listings/list-listings.ts
export type ListListingsResult = {
  items: unknown[];
};

export async function listListings(): Promise<ListListingsResult> {
  // Step 04: call ListingRepository port
  return { items: [] };
}
```

```ts
// src/modules/listing/list-listings/list-listings.handler.ts
import type { Context } from "hono";
import { listListings } from "./list-listings";

export async function listListingsHandler(c: Context) {
  const result = await listListings();
  return c.json(result);
}
```

```ts
// src/modules/listing/list-listings/list-listings.route.ts
import { Hono } from "hono";
import { listListingsHandler } from "./list-listings.handler";

export const listListingsRoute = new Hono();
listListingsRoute.get("/", listListingsHandler);
```

### 3. Create-listing slice (stub)

```ts
// src/modules/listing/create-listing/create-listing.ts
export type CreateListingInput = {
  titleEn: string;
  titleFa: string;
};

export async function createListing(_input: CreateListingInput) {
  // Step 04: validate + persist via port
  throw new Error("Not implemented");
}
```

```ts
// src/modules/listing/create-listing/create-listing.handler.ts
import type { Context } from "hono";
import { createListing } from "./create-listing";

export async function createListingHandler(c: Context) {
  const body = await c.req.json();
  // Step 04: Zod parse, then:
  // const listing = await createListing(body);
  void createListing;
  void body;
  return c.json({ error: "Not implemented" }, 501);
}
```

```ts
// src/modules/listing/create-listing/create-listing.route.ts
import { Hono } from "hono";
import { createListingHandler } from "./create-listing.handler";

export const createListingRoute = new Hono();
createListingRoute.post("/", createListingHandler);
```

### 4. Module public API

```ts
// src/modules/listing/public.ts
import { Hono } from "hono";
import { listListingsRoute } from "./list-listings/list-listings.route";
import { createListingRoute } from "./create-listing/create-listing.route";

/**
 * Public surface of the listing module.
 * Other modules / create-app may import from here only.
 */
export function createListingModule() {
  const listing = new Hono();
  listing.route("/", listListingsRoute);
  listing.route("/", createListingRoute);
  return listing;
}
```

### 5. Composition root

```ts
// src/create-app.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createListingModule } from "./modules/listing/public";

export type CreateAppDeps = {
  corsOrigin: string;
  // db?: Db;  // added in step 03
};

export function createApp(deps: CreateAppDeps) {
  const app = new Hono();

  app.use("*", cors({ origin: [deps.corsOrigin] }));

  app.get("/health", (c) =>
    c.json({ ok: true as const, service: "market-place-server" }),
  );

  app.route("/v1/listings", createListingModule());

  return app;
}
```

### 6. Boot file only

Replace `src/index.ts` with:

```ts
import { createApp } from "./create-app";

const port = Number(process.env.PORT ?? 3000);
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

const app = createApp({ corsOrigin });

export default {
  port,
  fetch: app.fetch,
};

console.log(`market-place-server listening on http://localhost:${port}`);
```

### 7. Verify

```bash
pnpm --filter @marketplace/market-place-server dev
```

```bash
curl http://localhost:3090/health
curl http://localhost:3090/v1/listings
```

(Use your `.env` port — e.g. `3090`.)

Expected:

- `/health` → `{ "ok": true, "service": "market-place-server" }`
- `/v1/listings` → `{ "items": [] }`

## Import rules (enforce mentally, later with ESLint)

```text
index.ts           → create-app.ts
create-app.ts      → modules/*/public.ts, middleware/*
modules/X/public   → slices inside X only
slice use case     → ports / module shared  (not Hono Context)
slice route        → handler → use case
db/*               → used from composition root / adapters (step 03+)

❌ modules/order → modules/listing/list-listings/...
✅ modules/order → modules/listing/public
❌ use case imports hono / drizzle directly (drizzle only in adapters later)
```

## Good practice

- One slice = one user intention (`list`, `create`, later `publish`)
- Handlers stay thin; use cases stay free of HTTP details
- `shared/` inside a module is OK; a repo-wide `utils/` god folder is not
- Keep `/health` at the app edge, not inside `listing`

## Bad practice

- Scaffolding every marketplace module empty “for architecture”
- One `routes.ts` + one `ListingService` that owns everything (kills vertical slices)
- Importing Drizzle schema into `public.ts`
- Putting React/FSD folders into the Hono server

## Acceptance

- [ ] Tree matches **Target tree (build this now)**
- [ ] `create-app.ts` is the composition root
- [ ] `index.ts` only boots
- [ ] `listing/public.ts` is the only module entry used by `create-app`
- [ ] `list-listings` and `create-listing` slices exist as separate folders
- [ ] `GET /health` works
- [ ] `GET /v1/listings` returns `{ items: [] }`
- [ ] `POST /v1/listings` returns 501 (stub) or equivalent “not implemented”
- [ ] `src/db/` exists but has no real schema yet
- [ ] No `order` / `payment` / `identity` folders yet

## Related reading

- [modular-monolith.md](../../knowledge/architecture-styles/modular-monolith.md)
- [vertical-slice.md](../../knowledge/architecture-styles/vertical-slice.md)
- [hexagonal.md](../../knowledge/architecture-styles/hexagonal.md)
- [architecture-combination-guide.md](../../knowledge/architecture-styles/architecture-combination-guide.md) — Modular monolith + Vertical Slice / Hexagonal
- [marketplace thinking §5](../../thinking/marketplace-fa-en-architecture.md)

## Next

[02 — Postgres with Docker](02-postgres-docker.md) → then [03 — Drizzle](03-drizzle-setup.md) wires `db/` and injects it through `createApp(deps)`.

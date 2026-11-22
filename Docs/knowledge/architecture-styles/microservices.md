# Microservices

## What it is

Independently deployable services, usually with separate data and network boundaries.

## When to use

- Independent scale/release cadence is a real requirement
- Clear bounded contexts and platform maturity (observability, CI/CD)
- Organizational ownership aligns with services

## When not to use

- Early-stage learning repo or small team
- Splitting for resume-driven development
- When you cannot operate distributed tracing, auth, and failure modes

## Good practice

- Split only with proven module boundaries (often after modular monolith)
- Own data per service; explicit contracts

## Bad / worst practice

- **Bad:** nanoservices per entity with chatty HTTP
- **Worst:** shared DB + distributed deploys (distributed monolith)

## Trade-offs

Autonomy and scale vs complexity, latency, and operational cost.

## Folder structure

Folders are cut by **deployable service**. Identity, documents, and search are the same three business modules as in [modular-monolith.md](modular-monolith.md). Here each module is its own Hono process, its own database, and its own pipeline. They talk over HTTP and events, using a published contract. The React app keeps one shell and one feature folder per service, and each feature client has that service’s base URL.

### Hono

**Why this tree.** Search indexing is CPU-heavy and documents traffic is write-heavy, and the teams release on different days. Separate roots make “this deploy restarts only search” a property of the repo, not a convention. `contracts/` is the only folder both sides import. A service client lives inside the caller, so documents owns the HTTP call to identity and the timeout around it.

```text
contracts/
  identity.ts                          # MembershipResponse
  documents.ts                         # PageRenamed event
  search.ts                            # SearchHit
services/
  identity/
    src/main.ts                        # own PORT, own DATABASE_URL
    src/http/membership.route.ts
    src/db/sessions.ts
  documents/
    src/main.ts
    src/http/pages.route.ts
    src/db/pages.ts                    # documents database only
    src/clients/identity-client.ts     # HTTP GET identity /memberships
    src/events/publish-page-renamed.ts
  search/
    src/main.ts
    src/http/query.route.ts
    src/db/entries.ts                  # search database only
    src/consumers/page-renamed.ts
```

**Example.** `PATCH /pages/p1` hits the documents service only. `identity-client.ts` asks identity whether the user can edit, with a timeout. Documents writes its own database and publishes `PageRenamed`. The handler returns `200` without waiting for search. `page-renamed.ts` in the search service updates the search database. If search is down, the page rename still succeeds and the query results lag until the consumer catches up.

**Benefits**

- A search reindex deploy does not restart the documents API.
- Each service scales on its own bottleneck: search on CPU, documents on writes.
- The on-call owner is the folder under `services/`.

**Cost**

- Three pipelines, three databases, service auth, and a trace that must be stitched across processes.
- The rename the monolith finished in one request now has a hop to identity and a delay before search matches.
- Pointing `documents` and `search` at one Postgres database keeps the folders and drops the boundary. That is a distributed monolith.

### React

**Why this tree.** The browser still has one shell, because login and layout are one product. Each feature folder owns the client for one service and that service’s failure. The editor stays usable when search times out. Shared types come from `contracts/`, the same package the Hono services use, so the JSON shape has one definition.

```text
apps/web/src/
  shell/
    main.tsx                           # one router, one session bootstrap
    app-layout.tsx
  features/
    identity/
      sign-in-page.tsx
      identity-client.ts               # IDENTITY_API_URL
    documents/
      page-editor.tsx
      documents-client.ts              # DOCUMENTS_API_URL
    search/
      search-box.tsx
      search-client.ts                 # SEARCH_API_URL
packages/contracts/                    # identity.ts, documents.ts, search.ts
```

**Example.** The editor loads `p1` from `DOCUMENTS_API_URL` and saves there. The search box queries `SEARCH_API_URL`. When search returns a network error, `search-box.tsx` shows “Search is unavailable” and the title field still saves. The identity client is the only place that refreshes the access token; the other clients attach it.

**Benefits**

- A breaking search response is fixed in `features/search` and `contracts/search.ts` without opening the editor.
- Partial failure is a feature state, so one down service does not blank the workspace.
- The contract package is the type source for both the React client and the Hono route.

**Cost**

- Three base URLs, CORS, and a loading or error state per feature.
- One SPA bundle still releases the editor and the search box together. Independent UI release needs a separately deployed fragment, which is a further split.
- A helper that calls all three APIs from the shell recreates the monolith inside the browser.

## Related concepts

Modular Monolith

## Where in this repo

Documented for contrast; **not** the default implementation target for early phases.

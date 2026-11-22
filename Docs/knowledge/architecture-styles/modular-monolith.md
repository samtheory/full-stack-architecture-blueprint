# Modular monolith

## What it is

One deployable unit with **hard module boundaries** (packages/domains) and clear APIs between modules — without network calls between them.

## When to use

- Product still exploring bounded contexts
- Team wants microservice-like boundaries without ops cost
- Teaching modularity before distributed systems

## When not to use

- Hard requirement for independent deploy/scale per domain
- Modules secretly share a tangled database with no ownership

## Good practice

- Package boundaries + ownership of tables
- Synchronous in-process calls; explicit public module API

## Bad / worst practice

- **Bad:** “modules” that import each other’s internals freely
- **Worst:** distributed monolith later without fixing boundaries first

## Trade-offs

Simpler ops than microservices; requires discipline so it does not rot into a blob.

## Folder structure

Folders are cut by **business module**. A module owns its rules, its tables, and a small public file. Other modules import that file and call it in process. There is one Hono process and one React app. The same three modules appear again under [microservices.md](microservices.md), where each one is a separate deploy and a separate database.

The product is a Notion-style workspace: identity (who may edit), documents (pages), and search (the index).

### Hono

**Why this tree.** A ranking change in search must stay inside search. A page rename must stay inside documents, and the only way documents learns “may this user edit?” is `identity/public.ts`. One `main.ts` mounts every module’s router, so there is still a single deploy, a single trace, and a function call instead of an HTTP hop.

```text
apps/api/                              # one process, one deploy
  src/main.ts                          # mounts identity, documents, and search routers
packages/
  identity/
    public.ts                          # assertCanEdit(userId, pageId)
    http/membership.route.ts
    internal/session-store.ts          # identity tables only
  documents/
    public.ts                          # renamePage — calls identity/public.ts
    http/pages.route.ts
    internal/postgres-pages.ts         # documents tables only
  search/
    public.ts                          # indexPage, query
    http/query.route.ts
    internal/index-store.ts            # search tables only
```

ESLint bans `packages/search` from importing `packages/documents/internal`. A cross-module join in SQL is the same violation.

**Example.** `PATCH /pages/p1` with `{ "title": "Launch plan" }`. `documents/http/pages.route.ts` calls `documents/public.renamePage`. That function calls `identity/public.assertCanEdit` in process, writes the documents table, then calls `search/public.indexPage` in process. The handler returns `200` after all three have finished. One request log contains the whole rename.

**Benefits**

- One pipeline, one database connection pool, and a stack trace that crosses modules without a network timeout.
- Search tests import `search/public.ts` and a fake index store. They do not boot the documents router.
- A later split into services is a move of `packages/search` only while `public.ts` stayed the contract.

**Cost**

- The boundary is an import rule. Anyone can bypass it, and the app still compiles.
- One schema tempts a query that joins `documents.pages` to `search.entries`.
- A bad documents migration ships inside the same deploy as identity and search.

### React

**Why this tree.** The screen is also one deployable, so the cut is feature modules with a public entry, composed by a shell. The editor may ask identity for the session. It reaches search only through `search/public.ts`. Shared chrome (router, layout) lives in the shell, which is the composition root.

```text
apps/web/src/
  shell/
    main.tsx                           # router and layout; composes module public APIs
    app-layout.tsx
  modules/
    identity/
      public.ts                        # useSession, <SignInButton>
      internal/session-client.ts
    documents/
      public.ts                        # <PageEditor>
      internal/page-editor.tsx
      internal/use-rename-page.ts
    search/
      public.ts                        # <SearchBox>
      internal/search-box.tsx
      internal/search-client.ts
```

**Example.** The workspace route renders `<PageEditor pageId="p1" />` and `<SearchBox />` from the shell. The editor calls `useSession` from `identity/public.ts` and disables Save when the role is viewer. On save it calls the documents API. The search box calls the search API through `search-client.ts`. Typing in the editor does not import `search/internal`.

**Benefits**

- A search-box redesign stays in `modules/search`.
- Storybook mounts `<PageEditor>` with a fake `useSession` and never starts the search client.
- One build shares the layout, the router, and the auth header.

**Cost**

- `public.ts` grows into a barrel that re-exports internals, and the module wall disappears while the folders remain.
- A `modules/shared` folder becomes the next junk drawer.
- The single bundle still ships search code to a reader who never opens search, unless the shell lazy-loads each module.

## Related concepts

Microservices, Monorepo Structure

## Where in this repo

Default packaging story: one API deployable, multiple packages.

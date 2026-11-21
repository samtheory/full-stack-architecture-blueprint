# Project blueprint

Concise but detailed plan for **Full-Stack Architecture Blueprint**.  
**No monorepo code yet** — approve this (and open ADRs) before implementation.

---

## 1. Proposed monorepo structure

```text
.
├── apps/
│   ├── web/                 # Next.js — primary web UI + SSR/RSC where useful
│   ├── mobile/              # Capacitor + React — native shell around shared UI/domain
│   └── api/                 # Hono — HTTP API, composition root for backend
├── packages/
│   ├── domain/              # Entities, value objects, pure business rules
│   ├── application/         # Use cases / ports (interfaces); no HTTP/SQL/React
│   ├── contracts/           # Shared DTO/zod schemas or types for API boundaries
│   ├── db/                  # Port + adapters: libsql, mariadb, postgres
│   ├── ui/                  # Reusable React components (web + mobile where shared)
│   ├── config/              # Typed env parsing, shared constants
│   └── test-kit/            # Fixtures, test DB helpers, MSW/handlers later
├── Docs/                    # Learning + architecture (already started)
├── tooling/                 # ESLint/TS configs as packages if needed
└── README.md
```

### Purpose of each app/package

| Path | Purpose | Why separate |
|------|---------|--------------|
| `apps/web` | Next.js app: routing, RSC/SSR, web-only UX | Framework edge; must not own domain rules |
| `apps/mobile` | Capacitor shell + React screens | Native plugins and navigation differ from web |
| `apps/api` | Hono routes, middleware, DI wiring | HTTP edge; thin controllers |
| `packages/domain` | Pure business logic | Independent of UI/HTTP/DB |
| `packages/application` | Use cases + ports | Orchestration without frameworks |
| `packages/contracts` | Request/response shapes | Single source for client/server validation |
| `packages/db` | DB port + vendor adapters | Swap engines without rewriting use cases |
| `packages/ui` | Presentational React | Reuse without pulling Next/Capacitor |
| `packages/config` | Env + feature flags | Fail fast on bad config |
| `packages/test-kit` | Shared test utilities | Keep tests honest and DRY |

**Alternatives considered**

| Alternative | Why not (for now) |
|-------------|-------------------|
| Single Next.js app with Route Handlers only | Weaker interview signal for separate API process; harder Capacitor split |
| Nx | Powerful but heavier; Turborepo is enough for this teaching repo |
| NestJS backend | More DI magic; Hono stays explicit and small |
| Prisma-only multi-DB | Convenient, but can hide vendor differences we want to teach |

---

## 2. Tooling recommendations

| Concern | Choice | Justification |
|---------|--------|---------------|
| Package manager | **pnpm** | Strict node_modules, fast, excellent workspaces; industry default for monorepos |
| Monorepo orchestration | **Turborepo** | Simple pipelines (`build`/`test`/`lint`), caching, low ceremony vs Nx |
| Language | **TypeScript** (strict) | Shared types across web/mobile/api; interview-relevant |
| Build (packages) | **tsup** or **unbuild** (TBD ADR) | Fast library builds; verify ESM/CJS needs for Capacitor |
| Web framework | **Next.js** (App Router) | Production web standard; keep domain out of Server Components |
| Mobile | **Capacitor + React + Vite** | Native shell without rewriting UI in a second language |
| API | **Hono** | Lightweight, typed, runs on Node (and potentially others — verify deploy target) |
| Lint | **ESLint** flat config + shared package | One rule set across apps |
| Format | **Prettier** | Zero bikeshedding on style |
| Unit/integration tests | **Vitest** | Fast, ESM-friendly, works in monorepos |
| E2E | **Playwright** (web + API) | Reliable browser E2E; API can use request fixtures |
| Mobile E2E | Deferred / optional Detox or Maestro | Higher cost; start with web + API E2E |
| Validation | **Zod** | Runtime API validation + shared contracts (verify version alignment with stack) |
| Logging | **pino** (API) | Structured JSON logs; simple child loggers |
| CI | **GitHub Actions** | Standard for open source |

**Needs verification before lock-in:** Capacitor + Vite + shared `packages/ui` consumption; Hono Node adapter vs edge runtime choice; exact Zod major version.

---

## 3. Hono backend architecture

```text
HTTP request
  → middleware (requestId, logger, cors, security headers)
  → route (parse + validate with Zod)
  → use case (application package)
  → port (e.g. NotesRepository)
  → adapter (libsql | mariadb | postgres)
  → HTTP response mapper / error mapper
```

| Concern | Approach |
|---------|----------|
| **Validation** | Zod schemas in `packages/contracts`; validate at route edge; never trust raw `c.req` |
| **Error handling** | Domain/application errors as typed classes; central mapper to HTTP status + stable `code` |
| **Dependency injection** | Manual composition root in `apps/api` (`createApp(deps)`). No IoC container unless complexity forces it |
| **Logging** | `pino` with `requestId`; redact secrets/PII; log at boundaries, not inside pure domain |
| **Configuration** | Zod-parsed env in `packages/config`; fail on startup if invalid |
| **Auth (later slice)** | Strategy behind a port; cookies/headers stay in adapters |

**Alternatives:** Midway/Nest-style DI containers (more magic); tRPC (couples clients — fine for some apps, weaker multi-client teaching with Capacitor unless carefully shared).

---

## 4. Database abstraction design

**Goal:** support libSQL, MariaDB, and PostgreSQL **without pretending they are identical**.

```text
packages/application  →  NotesRepository (port)
packages/db           →  createDb(config) factory
                      →  LibSqlNotesAdapter
                      →  MariaDbNotesAdapter
                      →  PostgresNotesAdapter
```

### Principles

1. **Shared port, not shared SQL string soup.** Each adapter owns dialect-specific SQL.
2. **Expose capability flags** where needed (`supportsReturning`, `supportsJsonb`, `upsertStyle`, etc.) instead of fake universal APIs.
3. **Migrations per vendor** or clearly separated migration folders — do not claim one migration file runs everywhere until verified.
4. **Integration tests per adapter** against real engines (Docker/testcontainers — verify tooling on Windows).
5. **Document differences** in `database-abstraction.md` (transactions, JSON, boolean types, UPSERT).

### What we refuse to hide

| Area | Example difference |
|------|--------------------|
| UPSERT | `ON CONFLICT` vs `ON DUPLICATE KEY` |
| JSON | `JSONB` vs `JSON` vs text |
| Booleans | native vs `TINYINT` |
| Returning rows | `RETURNING` support varies |
| Embedded vs server | libSQL/sqld vs network servers |

**Alternatives:** Kysely with dialects (strong candidate — verify); Drizzle (good DX — verify multi-dialect story); raw `mysql2`/`pg`/`@libsql/client` only (most explicit, more boilerplate).

**Open ADR:** query builder vs hand-written SQL per adapter.

---

## 5. Learning path

1. Root [README.md](../../README.md) + [Docs/.brain/INDEX.md](../.brain/INDEX.md)
2. This blueprint + [monorepo-structure.md](monorepo-structure.md)
3. **Build in order:** [walkthrough/](../walkthrough/README.md) (step folders with commands and decisions)
4. [knowledge/solid/](../knowledge/solid/README.md) (especially DIP)
5. One style: start [layered](../knowledge/architecture-styles/layered.md), then [hexagonal](../knowledge/architecture-styles/hexagonal.md)
6. [design-patterns/](../knowledge/design-patterns/README.md) — Adapter, Repository, DI
7. [react-rendering/modern-lifecycle.md](../knowledge/react-rendering/modern-lifecycle.md) (legacy only for contrast)
8. [examples/vertical-slice-todo/](../examples/vertical-slice-todo/README.md)
9. Backend + DB docs → run the slice when code exists
10. Auth / multi-db / optimistic UI examples
11. Interview cheat-sheet (to be added): “why this boundary?” questions

---

## 6. Example features (cross-layer)

| Feature | Patterns / lessons | Web | Mobile | API | DB |
|---------|--------------------|-----|--------|-----|-----|
| **Todo vertical slice** | SRP, DIP, Repository, validation | list/create/complete | same use cases | CRUD routes | all adapters |
| **Auth session** | Strategy, security boundaries | login form | secure storage | session port | user/session tables |
| **Multi-DB notes** | Adapter, Factory, LSP | notes UI | notes UI | notes API | swap driver via env |
| **Optimistic UI sync** | Observer/invalidation, conflict policy | optimistic list | offline-ish UX | version/etag | conditional updates |

Same domain operations should be callable from web and mobile; only adapters (HTTP client, storage, navigation) differ.

---

## 7. Testing strategy

| Layer | Tool | What to prove |
|-------|------|---------------|
| **Unit** | Vitest | Domain rules, use cases with in-memory fakes |
| **Integration** | Vitest + real DB | Each adapter honors the port contract |
| **Contract** | Shared Zod schemas / Pact-optional | API request/response shapes |
| **API** | Vitest + Hono `app.request` | Validation, errors, auth wiring |
| **E2E web** | Playwright | Critical flows on Next.js against API |
| **E2E mobile** | Optional later | Smoke on emulator; not phase 1 |
| **A11y** | Playwright axe (or eslint-plugin-jsx-a11y) | Forms and primary pages |

**Rules:** no pattern demo without at least one test; prefer fakes at unit level; never mock away the thing under test.

---

## 8. Risks, trade-offs, decisions before coding

| Item | Risk / trade-off | Resolve via |
|------|------------------|-------------|
| Package scope name (`@fsab/...`) | Naming lock-in | ADR |
| Query builder vs raw SQL | Abstraction vs honesty about dialects | ADR |
| Next.js App Router domain leakage | Business logic in Server Components | Frontend architecture rules |
| Sharing UI between Next and Capacitor | RSC vs client components | ADR + `packages/ui` client-only policy |
| Hono runtime (Node vs Bun vs edge) | Deploy story and driver support | ADR — **needs verification** |
| libSQL local vs remote | Different operational model | Document + capability flags |
| Windows + testcontainers/Docker | Contributor friction | Document fallback (CI-only DB tests) |
| Scope creep (too many patterns) | Confusing learners | Only patterns used by examples |
| Graphify skill on Cursor | May need CLI-only | Verify install path |
| License | MIT vs Apache-2.0 | Before public launch |

---

## 9. Phased implementation plan

### Phase 0 — Docs spine (current)

- [x] `Docs/.brain`, `tech-space`, `knowledge`, `examples`
- [x] Root README + Graphify ignore
- [ ] Approve blueprint + ADRs

### Phase 1 — Smallest useful vertical slice

1. pnpm workspace + Turborepo skeleton
2. `packages/domain` + `application` + in-memory notes/todos port
3. `apps/api` Hono with validation, errors, logging, config
4. One DB adapter (recommend **libSQL** first for zero-Docker local)
5. `apps/web` Next.js page calling the API
6. Unit + API tests + README run instructions

### Phase 2 — Second adapter + contracts

- PostgreSQL adapter + Docker compose
- `packages/contracts` shared with web
- Playwright smoke

### Phase 3 — MariaDB + mobile shell

- MariaDB adapter
- Capacitor app consuming same API
- Document vendor differences table with tests

### Phase 4 — Auth + optimistic UI

- Session strategy example
- Optimistic update + conflict handling example
- Observability polish (request IDs in client traces)

### Phase 5 — Interview & polish

- Interview Q&A mapped to folders
- CI matrix for adapters
- Graphify report committed; contribution guide

---

## Approval gate

Approve this blueprint (or request edits) before any `apps/` or `packages/` code is generated.

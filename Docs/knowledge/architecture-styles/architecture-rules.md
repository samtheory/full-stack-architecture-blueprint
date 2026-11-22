# Architecture Rules

Concise, enforceable rulebook for a React + Next.js + Hono TypeScript monorepo.

Use these rules in PR review, ESLint boundaries, and onboarding. Prefer automated checks where noted.

---

## Dependency Rules

Allowed import direction:

```text
app/routes / Next.js app pages
  → module public API
    → application / slice handlers
      → domain

infrastructure adapters → implement application ports
domain → no framework, ORM, DB client, React, Next.js, or Hono imports
shared / packages/contracts → cannot import business modules or apps
apps/* → may import packages/*
packages/* → must not import apps/*
features / modules → must not import another feature/module's internals
```

### Hard bans

- `domain/**` importing `hono`, `react`, `next`, `drizzle-orm`, `@prisma/client`, `stripe`
- `packages/ui/**` importing `apps/api/**` or business modules
- Deep imports like `@/modules/billing/infrastructure/stripe-client` from another module
- Client Components importing server-only modules (`fs`, secrets, `drizzle` DB)

### Allowed exceptions

- Composition roots (`main.ts`, `app/providers.tsx` wiring) may import adapters + modules
- Tests may import internals of the unit under test
- Next.js server files may import server-only HTTP clients to Hono

---

## Module Boundaries

1. Every business capability is a **module** (`booking`, `billing`, `identity`, …).
2. Each module exposes a **public API** (`public.ts` / `index.ts`) for other modules.
3. Cross-module calls go through the public API only — **in-process** in a modular monolith.
4. Each module owns its tables/schemas. No casual cross-module joins.
5. If module A needs module B data, A calls B’s public function/API or consumes an event — it does not read B’s tables.
6. Vertical slices live **inside** a module; they are not a license to bypass module APIs.

```text
modules/booking/public.ts     ✅ import from billing
modules/booking/infrastructure/sql.ts  ❌ import from billing
```

---

## Frontend Rules (React + Next.js)

1. **Server Components** fetch and render read models; they do not embed domain invariants that contradict the API.
2. **Client Components** handle interaction and local UI state; network calls go through TanStack Query + typed clients.
3. **Server Actions / route handlers** are a web BFF: auth, aggregation, DTO shaping — not a second source of booking/payment truth.
4. Prefer **feature / module folders** over dump folders (`components/`, `hooks/`, `utils/`).
5. If using FSD: imports flow `app → pages/widgets → features → entities → shared` only.
6. Features must not import other features’ internals; compose in pages/widgets/shell.
7. No secrets, service-role keys, or Stripe secret keys in client bundles.
8. Share Zod contracts from `packages/contracts` when web and API must agree.

---

## Backend Rules (Hono)

1. Route handlers: parse/validate (Zod) → call use case/slice → map errors to HTTP status.
2. Route handlers must not contain SQL or payment SDK calls directly (except true MVPs with a documented escape hatch).
3. Use cases/slices orchestrate; domain enforces invariants.
4. Ports (interfaces) are owned by application/domain; adapters live in infrastructure.
5. Webhooks verify signatures, enforce idempotency, and enqueue side effects when work is heavy.
6. One composition root wires DB, Stripe, mail, and mounts module routes.
7. Background workers import module public APIs / application handlers — not route files.

---

## Communication Rules

| Flow type | Rule |
|---|---|
| User waits for result | Synchronous Hono call / server action |
| Email, index, webhooks fan-out | Event + queue worker |
| Cross-module side effect | Domain/integration event via outbox |
| Cross-module immediate decision | Public in-process API (monolith) or sync HTTP (services) with clear timeout |
| Client multi-service orchestration | BFF — not Client Components |

### Event rules

- Past-tense names (`booking.confirmed`)
- Versioned Zod schemas in `packages/events` or `packages/contracts`
- Publish after successful state change (transactional outbox)
- Consumers idempotent (at-least-once)

---

## Data and Persistence Rules

1. Prefer **one Postgres** for the modular monolith with schema ownership per module.
2. Repository/adapter may use Drizzle or Prisma; domain does not.
3. Migrations owned by the module/service that owns the tables.
4. Logical CQRS: separate query SQL/handlers when screens need denormalized shapes.
5. Physical CQRS / Event Sourcing only with an explicit decision record.
6. Soft deletes, audit columns, and outbox tables are infrastructure concerns — keep naming consistent.

---

## Auth and Security Rules

1. Authenticate at the edge (Next session / gateway / Hono middleware).
2. Authorize in the use case/domain (not only in UI hiding buttons).
3. Service-to-service calls use explicit service auth when split into services.
4. Treat all external webhooks as untrusted until verified.
5. Log request IDs; never log secrets or raw card data.

---

## Testing Rules

| Layer | Test | Mock |
|---|---|---|
| Domain | Unit, no DB | Nothing or clock |
| Use case / slice | Unit with fake ports | Ports |
| Adapters | Integration with DB/Stripe test mode | External network when needed |
| Module public API | Contract tests | — |
| BFF | Integration with stubbed core API | Downstream HTTP |
| UI features | Component + MSW | Network |
| Critical journeys | E2E against staging compose | Minimal |

Do not mock the unit you mean to test. Do not require full E2E for every pure domain change.

---

## Monorepo Rules

1. `apps/*` = deployables; `packages/*` = libraries.
2. Packages export public entrypoints only.
3. No `packages/common` catch-all for business rules.
4. CI runs affected lint/test/build.
5. Enforce boundaries with `eslint-plugin-boundaries`, dependency-cruiser, or equivalent.
6. `.env.example` committed; real secrets via environment / secret manager.

---

## Naming Rules

- Modules/contexts: **business nouns** (`booking`, not `managers`)
- Commands: verbs (`confirmBooking`)
- Events: past tense (`BookingConfirmed` / `booking.confirmed`)
- Adapters: technology + role (`drizzle-booking.repository.ts`, `stripe-payment.adapter.ts`)
- Avoid `utils.ts` / `helpers.ts` without a specific name

---

## PR Checklist

- [ ] Imports follow dependency direction
- [ ] No new cross-module deep imports
- [ ] Domain stays framework-free
- [ ] Zod validation at HTTP/action boundary
- [ ] Side effects async where user does not need to wait
- [ ] Tests at the correct boundary
- [ ] Contracts updated when request/response/events change
- [ ] No secrets in client code

---

## Progressive Strictness

| Stage | Rules to enforce first |
|---|---|
| MVP | Zod boundaries, no secrets in client, feature folders |
| Growing SaaS | Module public APIs, outbox, port for Stripe |
| Multi-team | Boundary lint, contract tests, no cross-DB ownership |
| Platform | Plugin API versioning, idempotent consumers |

---

## Related Docs

- [react-next-hono-recommendations.md](react-next-hono-recommendations.md)
- [architecture-combination-guide.md](architecture-combination-guide.md)
- [modular-monolith.md](modular-monolith.md)
- [vertical-slice.md](vertical-slice.md)
- [hexagonal.md](hexagonal.md)
- [feature-sliced-design.md](feature-sliced-design.md)
- [domain-driven-design.md](domain-driven-design.md)

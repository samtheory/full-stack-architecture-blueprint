# FD-03 — TypeScript for architects

| Field | Value |
|-------|--------|
| Category | 00-foundations |
| Status | `complete` |
| Stack | TypeScript strict · Zod · `packages/contracts` |
| Prereqs | Basic JS |
| Related Docs | [`../../tech-space/project-blueprint.md`](../../tech-space/project-blueprint.md) · DI / Repository patterns |

## Learning outcomes

- Treat types as **contracts** at module and HTTP boundaries — not as decoration.
- Prefer parsing at the edge (`Zod`) over trusting `any` / loose JSON.
- Know what belongs in `packages/contracts` vs domain vs UI props.
- Spot architecture smells: leaked ORM types, `as unknown as`, optional-everything DTOs.

---

## 1. Dummy

TypeScript is a **compile-time proof assistant**. It does not secure production by itself — runtime still needs validation — but it makes illegal states harder to wire together across `apps/` and `packages/`.

```mermaid
flowchart LR
  JSON[HTTP JSON] -->|Zod parse| DTO[Contract types]
  DTO --> UC[Use case input]
  UC --> DOM[Domain types]
  DOM --> OUT[Result types]
  OUT -->|map| RESP[HTTP JSON]
```

**Why it exists:** so “listing id is a string UUID” is agreed once, not rediscovered in every file.

---

## 2. When to use / when not

### Use

- Shared request/response shapes between Next and Hono → `packages/contracts`.
- Ports/interfaces in `packages/application` (no framework types).
- Discriminated unions for domain results (`captured | declined`).

### When not / don’t overdo

- Modeling the entire database as one giant TS interface and importing it everywhere.
- `strict: false` “to move faster” in a teaching/production blueprint.
- Type-only “safety” without runtime parse at the trust boundary (HTTP, env, queue).

---

## 3. Working

### Worst vs best

```ts
// ❌ Trust the wire; leak DB row into the route
app.get("/listings/:id", async (c) => {
  const row = await db.query.listings.findFirst({ where: ... });
  return c.json(row); // passwordHash? internal columns?
});

// ✅ Parse input; map to public DTO; domain stays pure
import { listingIdParam, listingPublic } from "@repo/contracts/listings";

app.get("/listings/:id", async (c) => {
  const { id } = listingIdParam.parse(c.req.param());
  const listing = await getListing(id, c.get("deps"));
  if (!listing) return c.json({ code: "NOT_FOUND" }, 404);
  return c.json(listingPublic.parse(listing));
});
```

### Contracts package (this monorepo)

```text
packages/contracts/
  listings.ts     # Zod schemas + z.infer types
  errors.ts       # shared error codes
apps/api/         # imports contracts for parse + response
apps/web/         # imports contracts for forms + fetch typing
packages/domain/  # may use branded types / pure functions — not Hono Context
```

### Architect toolkit (minimum)

| Tool | Use |
|------|-----|
| `strict` + `noUncheckedIndexedAccess` | Catch holes early |
| Zod (or similar) | Runtime parse = type narrow |
| Branded types (`ListingId`) | Avoid mixing raw strings |
| `satisfies` | Keep object literals honest |
| Project references / packages | Enforce import boundaries |

```ts
type ListingId = string & { readonly __brand: "ListingId" };
export const ListingId = {
  parse(raw: string): ListingId {
    // validate UUID then brand
    return raw as ListingId;
  },
};
```

---

## 4. Rich

### Failure modes

| Smell | Risk | Fix |
|-------|------|-----|
| `any` at boundaries | Runtime explosions | Zod + unknown → parse |
| Exporting Prisma/Drizzle types from API | UI coupled to DB | Map to public DTO |
| Optional fields everywhere | Illegal partial states | Required + defaults / unions |
| Types-only contracts without CI | Drift web vs API | Shared package + contract tests |

### Test seams

- Schema unit tests: reject empty title, huge payloads.
- Type tests (`expectTypeOf`) for public API stability on critical DTOs.

---

## 5. Professional / CTO

| Decision | Guidance |
|----------|----------|
| Language | TypeScript end-to-end for this blueprint (web, API, contracts) |
| Validation library | One standard (Zod) — don’t mix three parsers |
| `any` budget | Treat as debt; ban in `packages/domain` via lint |

**ADR triggers:** introducing a second schema library · generating types from OpenAPI vs Zod-first · relaxing `strict`.

**Automate:** `tsc --noEmit` on every package in CI; ESLint `no-explicit-any` in domain/application; contract package as single source for web↔API.

---

## Exercises

1. **Dummy:** Sketch which package owns “CreateListingInput”.
2. **Working:** Write a Zod schema for `{ title: string (1..120), priceCents: int > 0 }` and infer the type.
3. **CTO memo:** Zod-first vs OpenAPI-first for a 5-engineer marketplace — pick one and name the failure mode of the other.

## Related

- [FD-02 HTTP](FD-02-http.md) · [`../../knowledge/design-patterns/dependency-injection.md`](../../knowledge/design-patterns/dependency-injection.md)
- [`../../knowledge/solid/05-D.md`](../../knowledge/solid/05-D.md)

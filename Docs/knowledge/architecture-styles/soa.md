# Service-Oriented Architecture (SOA)

## One-line Definition

Service-Oriented Architecture structures a system as a set of **network-accessible services** that expose coarse-grained business capabilities through standardized contracts, often with a shared governance/ESB-style integration layer historically — in modern practice, closer to well-governed service boundaries with shared platforms.

## Problem It Solves

Large organizations need reusable business capabilities (billing, identity, inventory) consumed by many channels. SOA aims to expose those capabilities as services with contracts so applications compose capabilities instead of duplicating them.

## When to Use It

- Enterprise portfolios with many consuming applications
- Strong need for reusable business capabilities across teams
- Existing service catalog / platform governance
- Coarse-grained services (not tiny endpoints) matching business functions
- Organization can fund shared platform, contracts, and ops

## When Not to Use It

- Startup / single-product modular monolith stage
- Confusing SOA with “many tiny microservices”
- Central ESB that becomes a bottleneck and logic dump
- Small React+Hono app inventing SOAP/ESB ceremony

## Best Fit by Application Type

| Application type | Fit | Why |
|---|---:|---|
| Small React SPA | Poor | One backend service is enough |
| Large React dashboard | Medium | Consumes enterprise services |
| Next.js App Router app | Medium | BFF composing SOA services |
| Hono API | Medium | Hono can implement a capability service |
| Background worker | Medium | Orchestration/workers around services |
| Mobile app API | Medium | Often via BFF over SOA backends |
| Marketplace / booking system | Medium | Useful at org scale; overkill for one app |
| Internal admin panel | Medium | Consumer of shared services |

## Frontend, Backend, or Both?

Primarily **deployment topology + integration** for backends and enterprise composition. Frontends consume services (often through a BFF).

In React + Next.js + Hono:

- Prefer **modular monolith** until multiple products need the same capability
- If SOA is required: Hono apps become capability services (`billing-service`, `booking-service`)
- Next.js BFF composes them for the web UX
- Avoid recreating a heavyweight ESB; use explicit APIs, events, and an API gateway

## Core Rules

- Services expose **business capabilities**, not raw tables
- Contracts are versioned (OpenAPI/AsyncAPI); consumers depend on contracts only
- Prefer coarse-grained operations to chatty fine-grained RPC
- Shared libraries must not become a backdoor to couple deployments (share types carefully)
- No hidden shared database between capability services
- Governance for auth, discovery, and observability is part of the architecture
- UI must not orchestrate five enterprise services with business rules in the browser

## Dependency Diagram

```mermaid
flowchart TB
  Web[Next.js BFF]
  GW[API Gateway]
  Booking[Booking capability service]
  Billing[Billing capability service]
  Identity[Identity capability service]
  Bus[Integration events]

  Web --> GW
  GW --> Booking
  GW --> Billing
  GW --> Identity
  Booking --> Bus
  Billing --> Bus
  Identity --> Bus
```

## Recommended Folder Structure

### 1. React frontend

```text
apps/web/src/
  shared/api/bff-client.ts
  features/...
```

### 2. Next.js App Router frontend

```text
apps/web/
  src/bff/compose-checkout.ts        # calls booking + billing services
  app/checkout/page.tsx
```

### 3. Hono backend (one capability service)

```text
apps/booking-service/src/
  api/openapi.routes.ts
  application/
  domain/
  infrastructure/
  main.ts
```

### 4. Monorepo (enterprise-style)

```text
apps/
  booking-service/
  billing-service/
  identity-service/
  web/                               # Next BFF + UI
packages/
  contracts-booking/
  contracts-billing/
```

## Implementation Example

```ts
// packages/contracts-booking/src/confirm.ts
import { z } from "zod";

export const confirmBookingRequest = z.object({
  bookingId: z.string().uuid(),
  paymentReference: z.string().min(1),
});

export const confirmBookingResponse = z.object({
  bookingId: z.string().uuid(),
  status: z.literal("confirmed"),
});
```

```ts
// apps/booking-service — capability endpoint
bookingRoutes.post("/capabilities/booking/confirm", async (c) => {
  const input = confirmBookingRequest.parse(await c.req.json());
  const result = await confirmBooking(input, c.get("deps"));
  return c.json(confirmBookingResponse.parse(result));
});
```

```ts
// apps/web BFF composition
export async function composeCheckout(bookingId: string) {
  const booking = await bookingService.get(bookingId);
  const quote = await billingService.quote({ bookingId });
  return { booking, quote };
}
```

## Testing Strategy

- **Unit:** per-service domain
- **Integration:** service + its DB
- **Contract:** consumer-driven contracts between BFF and capability services
- **E2E:** cross-service journeys in a staged environment
- **Mocking:** contract stubs for UI/BFF; never skip contract tests

## Common Mistakes

- Building an ESB that contains all business logic
- Shared database “for convenience” across services
- Fine-grained chatty APIs that recreate distributed objects
- Calling it SOA while shipping an ungoverned microsphere of endpoints
- Putting enterprise orchestration exclusively in React

## Migration Path

1. Start with modular monolith capability modules + public APIs
2. Publish contracts for the most reused capability
3. Extract that capability to a service when a second product needs independent deploy
4. Put Next.js BFF in front for web composition
5. Add gateway + event integration as consumers grow

## Related Architectures

| Other architecture | Relationship | Why |
|---|---|---|
| Microservices | Possible but requires discipline | Microservices are a finer-grained evolution; not identical |
| API Gateway | Natural combination | Entry and policy layer |
| BFF | Natural combination | Client-specific composition |
| Event-Driven | Natural combination | Integration without brittle sync chains |
| Modular monolith | Usually avoid as simultaneous topology | Alternatives at deployment boundary — evolve from monolith |
| SCS | Possible but requires discipline | SCS favors autonomy over shared reusable services |
| DDD | Natural combination | Capabilities ≈ bounded contexts |
| Serverless | Possible but requires discipline | Services hosted as functions |

# API Gateway Architecture

## One-line Definition

An API Gateway is a **single entry point** in front of backend services that handles routing, authentication, rate limiting, TLS termination, and cross-cutting policies — without owning core business domain logic.

## Problem It Solves

Clients should not know the internal topology of microservices or SCS backends. A gateway centralizes edge concerns (auth, routing, quotas, request IDs) so each service stays focused on its capability.

## When to Use It

- Multiple backend services reachable by external clients
- Need centralized authN/authZ, rate limits, IP allowlists, or WAF policies
- Public vs internal API exposure differences
- Multi-team backend with a shared edge platform
- Mobile/web clients need a stable external hostname

## When Not to Use It

- Single Hono modular monolith — the app itself is the entry point
- Gateway becomes a second BFF full of business orchestration
- Tiny MVP where Cloudflare/nginx basics already suffice without “architecture”
- Using a gateway to hide a distributed monolith’s chatty internals forever

## Best Fit by Application Type

| Application type | Fit | Why |
|---|---:|---|
| Small React SPA | Poor | One API origin is enough |
| Large React dashboard | Medium | Useful once multiple services exist |
| Next.js App Router app | Medium | Next may sit behind or act partially as edge |
| Hono API | Medium | Hono can be *behind* a gateway or implement lightweight gateway routes |
| Background worker | Poor | Workers are not public entry |
| Mobile app API | Good | Stable public edge for mobile |
| Marketplace / booking system | Good | At multi-service scale |
| Internal admin panel | Medium | Often VPN + one API; gateway optional |

## Frontend, Backend, or Both?

**Integration / edge topology**. Not a frontend folder design and not a domain model.

In React + Next.js + Hono:

- Browser → Gateway → Hono services (or → Next.js → Gateway → services)
- Prefer Next.js BFF for **UI-specific shaping**; gateway for **routing and policy**
- Do not put booking invariants in gateway config plugins
- Stripe webhooks often bypass generic client gateway paths with dedicated routes

## Core Rules

- Gateway handles cross-cutting edge policies, not domain workflows
- Route by path/host to services; keep path contracts versioned
- Auth tokens validated at edge when appropriate; services still enforce authorization
- Timeouts, retries, and circuit breaking configured deliberately
- No shared DB access from the gateway
- Distinguish gateway (edge) from BFF (client-specific aggregation)
- Observability: correlation IDs injected at the gateway

## Dependency Diagram

```mermaid
flowchart LR
  Web[React / Next.js]
  Mobile[Mobile clients]
  GW[API Gateway]
  Booking[Hono booking service]
  Billing[Hono billing service]
  Identity[Identity service]

  Web --> GW
  Mobile --> GW
  GW --> Booking
  GW --> Billing
  GW --> Identity
```

## Recommended Folder Structure

### 1. React frontend

```text
apps/web/src/shared/api/http.ts      # baseURL = https://api.example.com
```

### 2. Next.js App Router frontend

```text
apps/web/
  src/shared/api/server-http.ts      # server-side calls to gateway or internal URLs
```

### 3. Hono backend (services behind gateway)

```text
apps/booking-api/src/main.ts
apps/billing-api/src/main.ts
```

### 4. Gateway config in monorepo

```text
infra/gateway/
  routes.yaml                        # /bookings/* → booking-api
  policies/
    rate-limit.yaml
    jwt-auth.yaml
apps/
  booking-api/
  billing-api/
  web/
```

Example route config sketch:

```yaml
# infra/gateway/routes.yaml
routes:
  - name: booking
    match: /v1/bookings
    upstream: http://booking-api:3001
    auth: jwt
  - name: billing
    match: /v1/billing
    upstream: http://billing-api:3002
    auth: jwt
  - name: stripe-webhook
    match: /v1/webhooks/stripe
    upstream: http://billing-api:3002
    auth: stripe-signature
```

## Implementation Example

Lightweight gateway-ish edge with Hono (for small multi-service setups):

```ts
// apps/edge-gateway/src/main.ts
import { Hono } from "hono";
import { verifyJwt } from "./auth";

const app = new Hono();

app.use("/v1/*", async (c, next) => {
  if (c.req.path.startsWith("/v1/webhooks/")) return next();
  const user = await verifyJwt(c.req.header("authorization"));
  c.set("userId", user.sub);
  c.header("x-request-id", crypto.randomUUID());
  await next();
});

app.all("/v1/bookings/*", (c) => proxy(c, process.env.BOOKING_URL!));
app.all("/v1/billing/*", (c) => proxy(c, process.env.BILLING_URL!));

export default app;
```

Prefer managed gateways (Kong, AWS API Gateway, Cloudflare) as you scale; keep this pattern for clarity of responsibilities.

## Testing Strategy

- **Unit:** auth middleware and routing rules
- **Integration:** gateway → stub upstreams
- **Contract:** public external paths vs service paths
- **E2E:** client through gateway to real services in staging
- **Mocking:** stub upstreams for gateway policy tests; do not “mock away” auth

## Common Mistakes

- Business orchestration in the gateway (checkout saga in Lua/plugins)
- Double auth confusion — gateway checks JWT but services trust all internal calls blindly without service auth
- Using gateway as a replacement for fixing service boundaries
- Exposing every internal path 1:1 forever without an external contract
- Collapsing BFF and gateway into one unmaintainable layer

## Migration Path

1. Single Hono API with path prefixes per module
2. Extract services; keep one hostname via reverse proxy
3. Add JWT and rate limits at the proxy/gateway
4. Document external `/v1` contracts separately from internal URLs
5. Introduce BFF only when client aggregation demands it

## Related Architectures

| Other architecture | Relationship | Why |
|---|---|---|
| Microservices | Natural combination | Standard edge pattern |
| SOA | Natural combination | Capability routing |
| BFF | Possible but requires discipline | Complementary, not interchangeable |
| Serverless | Natural combination | Managed API Gateway + functions |
| Modular monolith | Usually avoid as required | Optional reverse proxy only |
| SCS | Possible but requires discipline | Gateway/portal for entry; systems stay autonomous |
| DDD | Natural combination | Orthogonal — domain inside services |
| Event-Driven | Possible but requires discipline | Gateway is sync edge; events are async internals |

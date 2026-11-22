# Serverless / Function-Oriented Architecture

## One-line Definition

Serverless architecture structures the backend as **independently deployable functions** (and managed services) that scale per invocation, with the cloud provider owning servers, often wired through HTTP APIs, queues, and events.

## Problem It Solves

Always-on servers cost money at low traffic and require ops for scaling. Function-oriented design pushes discrete units of work (HTTP handlers, queue consumers, cron) into isolated deployables that scale to zero and bill per use — at the cost of distributed complexity.

## When to Use It

- Spiky or unpredictable traffic
- Many discrete async jobs (webhooks, image processing, notifications)
- Small teams wanting managed ops for parts of the system
- Event-driven integrations with cloud primitives (SQS, EventBridge, Cloudflare Queues)
- Endpoints that fit short execution time limits

## When Not to Use It

- Long-lived WebSocket-heavy workloads without the right platform support
- Tight transactional workflows across many functions without a monolith boundary
- Cold-start sensitive low-latency APIs on constrained runtimes
- Team without observability for distributed traces and retries
- Rewriting a coherent modular monolith into dozens of functions prematurely

## Best Fit by Application Type

| Application type | Fit | Why |
|---|---:|---|
| Small React SPA | Medium | SPA + few serverless API routes can work for MVP |
| Large React dashboard | Medium | API may be serverless; watch cold starts / connection pooling |
| Next.js App Router app | Good | Native fit with Route Handlers / edge / server actions hosting |
| Hono API | Good | Hono runs well on Cloudflare Workers / Lambda / Bun adapters |
| Background worker | Good | Queue-triggered functions are a natural model |
| Mobile app API | Medium | Fine if latency/timeouts acceptable |
| Marketplace / booking system | Medium | Good for webhooks/async; core booking often better as long-lived API |
| Internal admin panel | Medium | Low traffic suits scale-to-zero |

## Frontend, Backend, or Both?

Primarily a **deployment topology** for backend (and sometimes Next.js hosting). Not a UI folder strategy.

In React + Next.js + Hono:

- Next.js can host UI + some BFF routes serverless
- Hono can deploy as Workers/Lambda for API and webhook functions
- Prefer a modular monolith codebase that **can** deploy as one server *or* as functions — avoid designing business modules as one-file lambdas from day one
- Postgres/Supabase needs serverless-friendly pooling (e.g. PgBouncer / Supabase pooler)

## Core Rules

- Each function has a clear trigger (HTTP, queue, cron) and a single job
- Share domain logic via packages — do not copy-paste business rules into each function
- Treat functions as adapters; keep domain framework-independent
- All consumers are idempotent; assume at-least-once invocation
- Bound execution time; move long work to queues
- Secrets and DB connections configured per platform limits
- Avoid chatty function-to-function sync call chains (distributed monolith)

## Dependency Diagram

```mermaid
flowchart TB
  Web[Next.js on serverless host]
  GW[API Gateway / Worker route]
  FnBook[Function: create booking]
  FnHook[Function: Stripe webhook]
  FnMail[Function: send email]
  Q[Queue]
  DB[(Supabase / Postgres pooler)]
  Stripe[Stripe]

  Web --> GW --> FnBook --> DB
  Stripe --> FnHook --> Q --> FnMail
  FnHook --> DB
```

## Recommended Folder Structure

### 1. React frontend

```text
apps/web/                 # static SPA → CDN
  src/features/...
```

### 2. Next.js App Router frontend

```text
apps/web/
  app/
    api/webhooks/stripe/route.ts     # thin serverless entry
    (app)/bookings/page.tsx
  src/features/...
```

### 3. Hono backend (function-oriented deploy, modular code)

```text
apps/api/
  src/
    modules/booking/
      application/create-booking.ts
      domain/...
    http/
      create-booking.ts              # hono route module
      stripe-webhook.ts
    workers/
      send-booking-email.ts
    app.ts                           # compose routes
  wrangler.toml / serverless.yml     # deploy topology
```

### 4. Monorepo

```text
apps/web/
apps/api/                            # same codebase, multiple entrypoints
packages/booking-domain/
packages/events/
```

## Implementation Example

```ts
// apps/api/src/http/stripe-webhook.ts
import { Hono } from "hono";
import { verifyStripeSignature } from "../infrastructure/stripe";
import { recordPaymentCaptured } from "../modules/billing/application/record-payment-captured";

export const stripeWebhook = new Hono();

stripeWebhook.post("/webhooks/stripe", async (c) => {
  const raw = await c.req.text();
  const event = await verifyStripeSignature(raw, c.req.header("stripe-signature"));

  if (event.type === "payment_intent.succeeded") {
    await recordPaymentCaptured({
      paymentIntentId: event.data.object.id,
      amountCents: event.data.object.amount_received,
    });
  }

  return c.json({ received: true });
});
```

```ts
// entry for Cloudflare Worker / Lambda adapter
import { handle } from "hono/aws-lambda"; // or cloudflare export
import { app } from "./app";
export const handler = handle(app);
```

## Testing Strategy

- **Unit:** domain/application with fake ports
- **Integration:** function handler with local queue/DB emulators
- **Contract:** webhook payload fixtures (Stripe)
- **E2E:** deploy preview + real managed queue in staging
- **Mocking:** mock Stripe/SDK at adapter boundary; do not mock the whole handler away from routing tests

## Common Mistakes

- One giant Lambda that is a monolith with worse ops
- Sync fan-out across many functions for one user request
- Exhausting DB connections without a pooler
- Embedding secrets in code; missing idempotency on webhooks
- Designing folder structure around vendor triggers instead of business modules

## Migration Path

1. Keep modular Hono monolith on a long-lived server
2. Extract webhook and cron paths to serverless entries first
3. Move async email/indexing consumers next
4. Share packages for domain logic
5. Only split core HTTP API if scaling/cost evidence demands it

## Related Architectures

| Other architecture | Relationship | Why |
|---|---|---|
| Event-Driven | Natural combination | Queues/bus are the backbone |
| CQRS | Natural combination | Command/query functions + projectors |
| BFF | Possible but requires discipline | Next.js serverless BFF in front of APIs |
| Modular monolith | Possible but requires discipline | Code monolith, function deploy entries |
| Microservices | Possible but requires discipline | Functions ≠ well-bounded services automatically |
| Plugin architecture | Possible but requires discipline | Plugins as separately deployed functions |
| Event Sourcing | Possible but requires discipline | Projectors as functions |
| Heavy always-on monolith only | Usually avoid | Conflicting deploy assumptions if forced everywhere |

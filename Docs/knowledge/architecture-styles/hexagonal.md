# Hexagonal architecture (ports & adapters)

## What it is

The domain/application sits in the center. **Ports** are interfaces; **adapters** connect HTTP, UI, and databases at the edges.

## When to use

- Multiple adapters (web, mobile, CLI, several DBs)
- Heavy testing of business rules without infrastructure
- Interview discussions of dependency direction

## When not to use

- CRUD app with one DB and no domain logic — overhead may not pay off
- When the “port” is invented only to name the pattern

## Good practice

- Ports owned by application/domain
- Adapters in infrastructure packages
- Composition root wires edges

## Bad / worst practice

- **Bad:** ports that leak SQL or HTTP types
- **Worst:** adapter-to-adapter calls bypassing the center

## Trade-offs

More types and wiring; clearer boundaries and test fakes.

## Folder structure

Folders are cut by **distance from the center**. The center owns the use case and the ports (interfaces). Driving adapters sit outside and call in: Hono routes, a React page. Driven adapters sit outside and are called by the center: Stripe, Adyen, Postgres, `fetch`. `main.ts` is the composition root that chooses which adapters are real this process.

The example is marketplace checkout. The center captures an order. Stripe and Adyen are two driven adapters of one payment port. The web checkout is another driving adapter of the same workflow idea.

### Hono

**Why this tree.** The order rule is stable. The payment vendor and the database are replaceable details. A port lives next to the use case so the center can be compiled and tested with a fake. Each vendor gets its own folder so SDK types stay there.

```text
apps/api/src/
  core/
    domain/
      order.ts                         # paid vs declined, money in cents
    ports/
      payment-gateway.ts               # charge → captured | declined
      order-repository.ts
    use-cases/
      capture-order-payment.ts         # depends on the two ports
  adapters/
    driving/
      hono/
        capture-order.route.ts         # POST /orders/:id/capture
    driven/
      stripe/
        stripe-payment-gateway.ts
      adyen/
        adyen-payment-gateway.ts
      postgres/
        postgres-order-repository.ts
  main.ts                              # picks Stripe or Adyen from config
```

**Example.** `POST /orders/o1/capture` with a payment-method token. `capture-order.route.ts` maps JSON to the use-case input and a decline to `402`. `capture-order-payment.ts` calls `payment-gateway.charge`, then `order-repository` marks the order paid only when the result is `captured`. In production `main.ts` constructs `StripePaymentGateway` or `AdyenPaymentGateway`. A test constructs the in-memory gateway and a fake repository, and never opens a socket.

**Benefits**

- Adding Adyen for EU traffic adds `adapters/driven/adyen` and one branch in `main.ts`.
- The use case test covers “declined does not mark paid” without Stripe.js or Postgres.
- A second driving adapter (a CLI replay tool) calls the same use case.

**Cost**

- One port, one use case, and one adapter file for a single Postgres table is a lot of types when the vendor will never change.
- `main.ts` grows into the only place that knows every concrete class.
- A route that imports `stripe` directly skips the center, and the folders still look hexagonal.

### React

**Why this tree.** The checkout screen is a driving adapter: it turns a click into a call on the workflow. Stripe Elements and Adyen Drop-in are driven adapters of `payment-form`: both expose `submit()` and a token. The HTTP client is the driven adapter of `checkout-api`. The workflow test renders neither.

```text
apps/web/src/
  core/
    model/
      checkout-draft.ts                # address or token present
    ports/
      checkout-api.ts                  # placeOrder
      payment-form.ts                  # submit → paymentMethodToken
    workflow/
      place-order.ts                   # validate draft, submit form, call API
  adapters/
    driving/
      react/
        checkout-page.tsx              # button, error text
    driven/
      http/
        http-checkout-api.ts
      stripe/
        stripe-payment-form.tsx
      adyen/
        adyen-payment-form.tsx
  main.tsx                             # passes the chosen form + HTTP client in
```

**Example.** The buyer clicks Pay. `checkout-page.tsx` calls `place-order` with the draft and the two ports. The workflow asks `payment-form.submit()`, then `checkout-api.placeOrder(token)`. `main.tsx` has already passed `createStripePaymentForm` or the Adyen adapter. Storybook passes a fake form that resolves a fixed token.

**Benefits**

- The Pay button stays up when the vendor widget changes, because the page depends on `payment-form.ts`.
- Vendor SDK imports stay inside `adapters/driven/stripe` or `adyen`.
- The same workflow function can sit behind a React page today and a React Native screen later.

**Cost**

- A single button pays for a port, a workflow, a page, and a form adapter.
- It is easy to invent a port for every child component.
- Wiring in `main.tsx` duplicates the Hono composition root unless the team treats that duplication as the point: each app chooses its own adapters.

## Related concepts

DIP, Adapter, Clean Architecture

## Where in this repo

Primary style for API ↔ DB and future auth strategies.

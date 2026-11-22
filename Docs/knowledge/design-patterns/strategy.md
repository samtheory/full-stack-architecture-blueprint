# Strategy pattern

## What it is

Define a family of interchangeable algorithms behind a common interface; select at runtime.

## توضیح فارسی

**Strategy** خانواده‌ای از الگوریتم‌های قابل تعویض را پشت یک رابط می‌گذارد و در زمان اجرا یکی را انتخاب می‌کند. مثال سازمانی: کمیسیون فروشنده، مالیات کشور، یا روش تحویل (ارسال / تحویل حضوری / دیجیتال) بدون دست‌کاری فرمول اصلی `quoteOrder`. در React هم فیلدها و اعتبارسنجی هر روش تحویل یک strategy جداست.

## When to use

- Auth modes (session cookie vs bearer) with shared application flow
- Pricing/tax variants, retry policies

## When not to use

- Two near-identical functions that will never vary independently
- Replacing a simple `if` that runs once at startup with a hierarchy

## Good practice

- Strategy interface owned by application layer
- Selection in composition root / config

## Bad / worst practice

- **Bad:** strategies that need to know Hono `Context`
- **Worst:** strategy explosion for every boolean flag

## Trade-offs

Flexibility vs number of types.

## Real example — Marketplace quote and checkout

Two families of algorithms vary on their own.

On the API, finance changes seller commission and destination tax independently. A standard seller pays 10% of the merchandise subtotal. A pro seller pays no commission on the order (the subscription is billed elsewhere). A German ship-to adds 19% VAT. A US ship-to adds the rate for that state. Buyer total is subtotal plus tax. Seller payout is subtotal minus commission. `quoteOrder` should keep doing that arithmetic when a new plan or a new country arrives.

On the client, the quote is whatever the API returned. The browser must not reimplement tax. What the checkout screen *does* vary is fulfillment: ship (address), pickup (store), or digital (license email). Adding “local delivery” should add a strategy, not another branch inside `CheckoutPage`.

Teaching snippets, not a runnable app.

### Backend (Hono) — worst practice

```ts
// ❌ Every new plan and country edits the quote.
export function quoteOrder(input: {
  subtotalCents: number;
  plan: string;
  country: string;
  region: string;
}) {
  let fee = 0;
  if (input.plan === "standard") fee = Math.round(input.subtotalCents * 0.1);
  else if (input.plan === "pro") fee = 0;
  // plan === "bookseller" → edit here again

  let tax = 0;
  if (input.country === "DE") tax = Math.round(input.subtotalCents * 0.19);
  else if (input.country === "US" && input.region === "CA") tax = Math.round(input.subtotalCents * 0.0725);
  return { fee, tax, buyerPays: input.subtotalCents + tax };
}
```

### Backend (Hono) — best practice

Each policy is a small interchangeable algorithm. The use case receives the ones that apply to this quote.

```ts
export type ShipTo = { country: "US" | "DE"; region: string };

export interface CommissionPolicy {
  feeCents(subtotalCents: number): number;
}

export interface TaxPolicy {
  taxCents(subtotalCents: number, shipTo: ShipTo): number;
}

export const standardCommission: CommissionPolicy = {
  feeCents: (subtotalCents) => Math.round(subtotalCents * 0.1),
};

export const proCommission: CommissionPolicy = {
  feeCents: () => 0,
};

export const vatDe: TaxPolicy = {
  taxCents: (subtotalCents, shipTo) =>
    shipTo.country === "DE" ? Math.round(subtotalCents * 0.19) : 0,
};

export function usSalesTax(rateByRegion: Record<string, number>): TaxPolicy {
  return {
    taxCents(subtotalCents, shipTo) {
      if (shipTo.country !== "US") return 0;
      const rate = rateByRegion[shipTo.region] ?? 0;
      return Math.round(subtotalCents * rate);
    },
  };
}

export function quoteOrder(
  input: { subtotalCents: number; shipTo: ShipTo },
  policies: { commission: CommissionPolicy; tax: TaxPolicy },
) {
  const platformFeeCents = policies.commission.feeCents(input.subtotalCents);
  const taxCents = policies.tax.taxCents(input.subtotalCents, input.shipTo);
  return {
    buyerPaysCents: input.subtotalCents + taxCents,
    taxCents,
    platformFeeCents,
    sellerReceivesCents: input.subtotalCents - platformFeeCents,
  };
}
```

Selection sits next to the route, in one function the composition root can see. A new plan is a new `CommissionPolicy` plus one map entry.

```ts
const US_RATES: Record<string, number> = { CA: 0.0725, OR: 0 };

const commissionByPlan = {
  standard: standardCommission,
  pro: proCommission,
} satisfies Record<string, CommissionPolicy>;

export function policiesFor(plan: string, shipTo: ShipTo) {
  const commission = commissionByPlan[plan as keyof typeof commissionByPlan];
  if (!commission) throw new Error(`Unknown plan: ${plan}`);
  return {
    commission,
    tax: shipTo.country === "DE" ? vatDe : usSalesTax(US_RATES),
  };
}
```

```ts
app.post("/quotes", async (c) => {
  const body = await c.req.json();
  const shipTo: ShipTo = { country: body.country, region: body.region };
  try {
    const quote = quoteOrder(
      { subtotalCents: body.subtotalCents, shipTo },
      policiesFor(body.plan, shipTo),
    );
    return c.json(quote);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Unknown plan:")) {
      return c.json({ code: "UNKNOWN_PLAN" }, 400);
    }
    throw error;
  }
});
```

Reduced VAT for books is a new `TaxPolicy`, selected when `shipTo.country === "DE"` and the listing category is `books`. `quoteOrder` stays a single formula.

### Frontend (React) — worst practice

`CheckoutPage` switches on `fulfillment` for the address form, again for validation, and again for the submit payload. “Digital” still renders the address input because one branch was missed. Tax is also recomputed in the component from a hard-coded `0.19`, so it drifts from `/quotes`.

### Frontend (React) — best practice

The page asks the API for the quote. A fulfillment strategy only owns its fields and its validation. Field components are declared once so a keystroke does not remount the input.

```tsx
"use client";

import { useState } from "react";

type Draft = {
  addressLine?: string;
  storeId?: string;
  licenseEmail?: string;
};

type FieldsProps = {
  draft: Draft;
  onChange: (draft: Draft) => void;
};

type FulfillmentStrategy = {
  label: string;
  Fields: React.FC<FieldsProps>;
  validate(draft: Draft): string | null;
};

function ShipFields({ draft, onChange }: FieldsProps) {
  return (
    <input
      aria-label="Address"
      value={draft.addressLine ?? ""}
      onChange={(event) => onChange({ ...draft, addressLine: event.target.value })}
    />
  );
}

function PickupFields({ draft, onChange }: FieldsProps) {
  return (
    <input
      aria-label="Store"
      value={draft.storeId ?? ""}
      onChange={(event) => onChange({ ...draft, storeId: event.target.value })}
    />
  );
}

function DigitalFields({ draft, onChange }: FieldsProps) {
  return (
    <input
      aria-label="License email"
      type="email"
      value={draft.licenseEmail ?? ""}
      onChange={(event) => onChange({ ...draft, licenseEmail: event.target.value })}
    />
  );
}

const fulfillmentStrategies = {
  ship: {
    label: "Ship",
    Fields: ShipFields,
    validate: (draft) => (draft.addressLine?.trim() ? null : "Address required"),
  },
  pickup: {
    label: "Pickup",
    Fields: PickupFields,
    validate: (draft) => (draft.storeId?.trim() ? null : "Choose a store"),
  },
  digital: {
    label: "Digital",
    Fields: DigitalFields,
    validate: (draft) => (draft.licenseEmail?.includes("@") ? null : "Email required"),
  },
} satisfies Record<string, FulfillmentStrategy>;

export function CheckoutPage({
  fulfillment,
  quote,
}: {
  fulfillment: keyof typeof fulfillmentStrategies;
  quote: { buyerPaysCents: number; taxCents: number };
}) {
  const strategy = fulfillmentStrategies[fulfillment];
  const [draft, setDraft] = useState<Draft>({});
  const [error, setError] = useState<string | null>(null);

  function placeOrder() {
    const message = strategy.validate(draft);
    setError(message);
    if (message) return;
    // POST { fulfillment, ...draft }. Money comes from `quote`, not from this file.
  }

  const Fields = strategy.Fields;
  return (
    <section>
      <h2>{strategy.label}</h2>
      <p>Tax {(quote.taxCents / 100).toFixed(2)}</p>
      <p>Total {(quote.buyerPaysCents / 100).toFixed(2)}</p>
      <Fields draft={draft} onChange={setDraft} />
      {error && <p>{error}</p>}
      <button type="button" onClick={placeOrder}>
        Place order
      </button>
    </section>
  );
}
```

Local delivery is a new entry in `fulfillmentStrategies`. The page’s render and its “read the quote” path stay as they are.

### Side-by-side

| Change | Without strategies | With strategies |
|--------|--------------------|-----------------|
| Pro plan, 0% commission | Edit `quoteOrder` | New `CommissionPolicy` and one map entry |
| Books VAT rate | Another `if` on category | New `TaxPolicy` chosen in `policiesFor` |
| Local delivery fields | Another branch in `CheckoutPage` | New `Fields` + `validate` in the map |
| Show the buyer total | Recompute tax in React | Render `quote` from `POST /quotes` |

## Related concepts

OCP, DIP

## Where in this repo

Auth session example (planned).

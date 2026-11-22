# Facade pattern

## What it is

Provides a **simpler interface** over a complicated subsystem (many services, steps, or SDKs).

## توضیح فارسی

**Facade** یک **رابط ساده‌تر** روی زیرسیستم پیچیده می‌گذارد. کلاینت به‌جای دانستن ترتیب موجودی، قیمت، مالیات، پرداخت و ایمیل، فقط `placeOrder(...)` را صدا می‌زند. Facade پیچیدگی را پنهان می‌کند؛ مسئولیت دامنه را از بین نمی‌برد — فقط نقطهٔ ورود را جمع می‌کند.

## When to use

- Multi-step workflows called from thin HTTP/UI edges
- Shielding callers from several collaborating modules

## When not to use

- The facade becomes a god object that owns all business rules
- You only have one underlying call

## Good practice

- Facade orchestrates; domain rules stay in use cases/modules
- Keep return types honest about partial failure

## Bad / worst practice

- **Bad:** facade that also writes raw SQL and formats React
- **Worst:** every new feature only grows the facade forever with no module APIs

## Trade-offs

Easy entry point vs risk of a dumping-ground service.

## Real example — Marketplace “place order”

Checkout UI and `POST /orders` should not know inventory reservation, quote, charge, and receipt as four separate concerns.

### Backend (Hono)

```ts
class CheckoutFacade {
  constructor(
    private readonly inventory: Inventory,
    private readonly quotes: Quotes,
    private readonly payments: PaymentGateway,
    private readonly orders: Orders,
    private readonly mail: Mailer,
  ) {}

  async placeOrder(input: {
    buyerId: string;
    listingId: string;
    paymentMethodToken: string;
    shipTo: ShipTo;
  }) {
    await this.inventory.reserve(input.listingId, input.buyerId);
    const quote = await this.quotes.forListing(input.listingId, input.shipTo);
    const charge = await this.payments.charge({
      orderId: "pending",
      money: { amountCents: quote.buyerPaysCents, currency: "usd" },
      paymentMethodToken: input.paymentMethodToken,
    });
    if (charge.status !== "captured") {
      await this.inventory.release(input.listingId, input.buyerId);
      return { status: "declined" as const, reason: charge.reason };
    }
    const order = await this.orders.createPaid({
      buyerId: input.buyerId,
      listingId: input.listingId,
      quote,
      providerRef: charge.providerRef,
    });
    await this.mail.sendReceipt(order.id);
    return { status: "placed" as const, orderId: order.id };
  }
}

app.post("/orders", async (c) => {
  const body = await c.req.json();
  const result = await checkout.placeOrder({ ...body, buyerId: c.get("userId") });
  if (result.status === "declined") return c.json(result, 402);
  return c.json(result, 201);
});
```

### Frontend (React)

```ts
// UI talks to one client method — not five endpoints in the button handler
export async function placeOrder(apiBase: string, draft: CheckoutDraft) {
  const res = await fetch(`${apiBase}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });
  if (res.status === 402) return { status: "declined" as const, ...(await res.json()) };
  if (!res.ok) throw new Error("PLACE_FAILED");
  return { status: "placed" as const, ...(await res.json()) };
}
```

### Side-by-side

| Caller | Without Facade | With Facade |
|--------|----------------|-------------|
| Route / Pay button | Orchestrates 5 collaborators | Calls `placeOrder` |
| Inventory change | Touches the button handler | Stays behind the facade |

## Related concepts

Mediator, DI, Modular monolith public API

## Where in this repo

Useful teaching name for application-layer orchestration at the HTTP edge.

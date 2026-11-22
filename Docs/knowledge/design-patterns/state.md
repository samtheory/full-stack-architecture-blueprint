# State pattern

## What it is

Lets an object **alter its behavior when its internal state changes**. It appears to change class; each state object implements the transitions that are legal from there.

## توضیح فارسی

**State** رفتار شیء را بر اساس **وضعیت فعلی** عوض می‌کند. سفارش مارکت‌پلیس از `draft` به `paid` و `shipped` و `cancelled` می‌رود؛ هر وضعیت می‌گوید کدام انتقال مجاز است. به‌جای `if (status === …)` پراکنده، قوانین انتقال داخل اشیاء وضعیت (یا جدول انتقال صریح) می‌مانند.

## When to use

- Lifecycles with restricted transitions (orders, tickets, subscriptions)
- Behavior differs strongly per status

## When not to use

- Two statuses with identical behavior
- A boolean flag is enough

## Good practice

- Illegal transitions throw a domain error mapped to `409`
- Persist status as data; recover the state object on load

## Bad / worst practice

- **Bad:** allowing every transition from a god `switch`
- **Worst:** UI and API with different illegal-transition rules

## Trade-offs

Clear lifecycle vs more types for each status.

## Real example — Marketplace order lifecycle

### Backend (Hono)

```ts
type OrderStatus = "draft" | "paid" | "shipped" | "cancelled";

type Order = { id: string; status: OrderStatus };

interface OrderState {
  pay(order: Order): Order;
  ship(order: Order): Order;
  cancel(order: Order): Order;
}

class DraftState implements OrderState {
  pay(order: Order) {
    return { ...order, status: "paid" as const };
  }
  ship() {
    throw new Error("ILLEGAL_TRANSITION");
  }
  cancel(order: Order) {
    return { ...order, status: "cancelled" as const };
  }
}

class PaidState implements OrderState {
  pay() {
    throw new Error("ILLEGAL_TRANSITION");
  }
  ship(order: Order) {
    return { ...order, status: "shipped" as const };
  }
  cancel(order: Order) {
    return { ...order, status: "cancelled" as const };
  }
}

class ShippedState implements OrderState {
  pay() {
    throw new Error("ILLEGAL_TRANSITION");
  }
  ship() {
    throw new Error("ILLEGAL_TRANSITION");
  }
  cancel() {
    throw new Error("ILLEGAL_TRANSITION");
  }
}

const states: Record<OrderStatus, OrderState> = {
  draft: new DraftState(),
  paid: new PaidState(),
  shipped: new ShippedState(),
  cancelled: new ShippedState(), // no-op illegal ops — or dedicated CancelledState
};

function transition(order: Order, action: "pay" | "ship" | "cancel") {
  const state = states[order.status];
  return state[action](order);
}

app.post("/orders/:id/ship", async (c) => {
  const order = await orders.get(c.req.param("id"));
  try {
    const next = transition(order, "ship");
    await orders.save(next);
    return c.json(next);
  } catch {
    return c.json({ code: "ILLEGAL_TRANSITION" }, 409);
  }
});
```

### Frontend (React)

```tsx
const actionsByStatus = {
  draft: ["pay", "cancel"],
  paid: ["ship", "cancel"],
  shipped: [],
  cancelled: [],
} as const;

function OrderActions({ status, onAction }: { status: keyof typeof actionsByStatus; onAction: (a: string) => void }) {
  return (
    <div>
      {actionsByStatus[status].map((action) => (
        <button key={action} type="button" onClick={() => onAction(action)}>
          {action}
        </button>
      ))}
    </div>
  );
}
```

### Side-by-side

| Change | Scattered `if (status)` | State |
|--------|-------------------------|-------|
| Forbid ship while draft | Easy to miss a call site | `DraftState.ship` throws |
| UI buttons | Duplicate rules in JSX | Mirror allowed actions from status |

## Related concepts

Strategy, Command

## Where in this repo

Teaching pattern for order/ticket lifecycles.

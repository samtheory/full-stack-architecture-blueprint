# Abstract Factory pattern

## What it is

Creates **families of related objects** without specifying their concrete classes. Clients depend on abstract product types; a concrete factory produces a matching set.

## توضیح فارسی

**Abstract Factory** یک **خانوادهٔ اشیاء مرتبط** می‌سازد بدون اینکه کلاینت کلاس‌های مشخص را بشناسد. تفاوتش با Factory معمولی: اینجا چند محصول هم‌خانواده با هم ساخته می‌شوند (مثلاً درگاه پرداخت + رسید + وب‌هوک همان فروشنده). اگر Stripe را انتخاب کردید، نباید رسید Adyen با درگاه Stripe قاطی شود.

## When to use

- Multiple products must stay consistent (vendor A UI + vendor A API + vendor A webhooks)
- Theme / environment kits (sandbox vs live) that ship together

## When not to use

- Only one product type exists — use a simple factory
- “Family” is imaginary; products never ship together

## Good practice

- Factory interface returns ports, not SDKs
- Composition root picks one concrete factory for the process

## Bad / worst practice

- **Bad:** mixing Stripe charge with Adyen receipt formatter
- **Worst:** abstract factory with a single product forever

## Trade-offs

Consistency across a family vs more interfaces.

## Real example — Marketplace payment kit

Checkout needs three related pieces per provider: charge gateway, receipt PDF fields, and webhook signature verifier. Stripe kit and Adyen kit must not cross-wire.

### Backend (Hono)

```ts
interface PaymentGateway { charge(input: ChargeInput): Promise<ChargeResult> }
interface ReceiptFormatter { lines(order: Order, charge: ChargeResult): string[] }
interface WebhookVerifier { verify(rawBody: string, signature: string): boolean }

interface PaymentKitFactory {
  gateway(): PaymentGateway;
  receipts(): ReceiptFormatter;
  webhooks(): WebhookVerifier;
}

class StripeKitFactory implements PaymentKitFactory {
  gateway() { return new StripePaymentGateway(stripe); }
  receipts() { return new StripeReceiptFormatter(); }
  webhooks() { return new StripeWebhookVerifier(process.env.STRIPE_WEBHOOK_SECRET!); }
}

class AdyenKitFactory implements PaymentKitFactory {
  gateway() { return new AdyenPaymentGateway(adyen); }
  receipts() { return new AdyenReceiptFormatter(); }
  webhooks() { return new AdyenWebhookVerifier(process.env.ADYEN_HMAC!); }
}

function createPaymentKit(provider: "stripe" | "adyen"): PaymentKitFactory {
  if (provider === "adyen") return new AdyenKitFactory();
  return new StripeKitFactory();
}

const kit = createPaymentKit(env.PAYMENTS_PROVIDER);
const app = createApp({
  payments: kit.gateway(),
  receipts: kit.receipts(),
  webhooks: kit.webhooks(),
});
```

### Frontend (React)

```ts
interface CheckoutKit {
  PaymentForm: React.FC<{ clientSecret: string; onToken: (t: string) => void }>;
  ReceiptView: React.FC<{ orderId: string }>;
}

function createCheckoutKit(provider: "stripe" | "adyen"): CheckoutKit {
  if (provider === "adyen") {
    return { PaymentForm: AdyenPayBox, ReceiptView: AdyenReceipt };
  }
  return { PaymentForm: StripePayBox, ReceiptView: StripeReceipt };
}

// main.tsx
const kit = createCheckoutKit(import.meta.env.VITE_PAYMENTS_PROVIDER);
<CheckoutPage PaymentForm={kit.PaymentForm} ReceiptView={kit.ReceiptView} />;
```

### Side-by-side

| Change | Simple factories only | Abstract Factory |
|--------|----------------------|------------------|
| Switch provider | Easy to mix Stripe charge + Adyen receipt | One kit; all three match |
| Add sandbox kit | Scatter env checks | `SandboxStripeKitFactory` |

## Related concepts

Factory, Factory Method, Adapter

## Where in this repo

Pairs with marketplace adapter examples; kit selection belongs in the composition root.

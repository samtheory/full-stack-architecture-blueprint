# Singleton pattern

## What it is

Ensures a class has **one shared instance** and provides a global access point to it.

## توضیح فارسی

**Singleton** تضمین می‌کند فقط **یک نمونهٔ مشترک** وجود داشته باشد (مثلاً pool اتصال دیتابیس یا logger فرآیند). استفاده را با احتیاط انجام دهید: دسترسی سراسری تست را سخت می‌کند، وابستگی‌ها را پنهان می‌کند، و در serverless/چند isolate ممکن است «یکی» معنایش عوض شود. اغلب بهتر است همان منبع را یک‌بار در composition root بسازید و با DI تزریق کنید.

## When to use

- Truly process-wide resources (DB pool, metrics registry) constructed once at boot
- You accept the testing cost and document the lifetime

## When not to use

- “I’ll make services singletons so import is easy”
- Per-request state (user, tenant) — that is not a singleton

## Good practice

- Prefer **composition-root singleton**: create once in `main.ts`, inject everywhere
- If you use a module-level instance, export a factory for tests to replace it

## Bad / worst practice

- **Bad:** `getInstance()` called deep inside domain code
- **Worst:** mutable singleton that accumulates request data across users

## Trade-offs

Convenient shared resource vs hidden coupling and harder tests.

## Real example — One DB pool / one logger

A Hono chat API must not open a new Postgres pool per request. A React app must not create a new QueryClient per component.

### Backend (Hono) — prefer DI over classic Singleton

```ts
// ✅ Composition-root “one instance” — not a getInstance() service locator
import { Pool } from "pg";
import pino from "pino";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const logger = pino();

const app = createApp({
  messages: new PostgresMessageRepository(pool),
  logger,
});

// ❌ Classic singleton inside a use case
class Db {
  private static instance: Pool;
  static getInstance() {
    if (!Db.instance) Db.instance = new Pool();
    return Db.instance;
  }
}
```

### Frontend (React)

```tsx
// ✅ One QueryClient for the app shell
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);

// ❌ new QueryClient() inside every page — no shared cache
```

### Side-by-side

| Need | Classic Singleton | Composition-root single instance |
|------|-------------------|----------------------------------|
| Share pool | `Db.getInstance()` anywhere | Pass `pool` from `main.ts` |
| Test | Hard to replace | Inject a fake repository |
| Serverless | Surprising cold-start duplicates | Explicit lifecycle per isolate |

## Related concepts

Dependency Injection, Factory

## Where in this repo

Prefer DI composition roots; treat classic Singleton as a cautionary pattern.

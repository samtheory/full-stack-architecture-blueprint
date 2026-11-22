# Chain of Responsibility pattern

## What it is

Passes a request along a **chain of handlers** until one handles it (or each may handle and forward). Decouples the sender from the concrete receiver.

## توضیح فارسی

**Chain of Responsibility** درخواست را در زنجیره‌ای از handlerها جلو می‌برد تا یکی رسیدگی کند (یا هرکدام کاری بکند و رد کند). Middlewareهای Hono و پایپ‌لاین moderation چت همین ایده هستند: احراز هویت → محدودیت نرخ → فیلتر محتوا → ذخیره. فرستنده نمی‌داند کدام حلقه جواب نهایی را می‌دهد.

## When to use

- Middleware pipelines
- Moderation / validation pipelines with optional stages
- Support ticket routing by rules

## When not to use

- A single definite handler is known
- Order is unclear and bugs become “who ate the request?”

## Good practice

- Explicit order; each handler has one job
- Terminal handler guarantees a response/error

## Bad / worst practice

- **Bad:** handlers that sometimes swallow errors silently
- **Worst:** dynamic chains that reorder per request without logs

## Trade-offs

Flexible pipelines vs harder debugging of fall-through.

## Real example — Chat message moderation + Hono middleware

### Backend (Hono)

```ts
type Msg = { roomId: string; authorId: string; body: string };
type Result = { ok: true; body: string } | { ok: false; code: string };

type Handler = {
  handle(msg: Msg): Promise<Result | "next">;
};

const stripEmpty: Handler = {
  async handle(msg) {
    if (!msg.body.trim()) return { ok: false, code: "BODY_REQUIRED" };
    return "next";
  },
};

const blockBannedWords: Handler = {
  async handle(msg) {
    if (/\b(scam|phishing)\b/i.test(msg.body)) return { ok: false, code: "BLOCKED" };
    return "next";
  },
};

const maskSecrets: Handler = {
  async handle(msg) {
    return {
      ok: true,
      body: msg.body.replace(/sk-[a-zA-Z0-9]+/g, "[redacted]"),
    };
  },
};

async function runChain(msg: Msg, chain: Handler[]): Promise<Result> {
  for (const handler of chain) {
    const result = await handler.handle(msg);
    if (result !== "next") return result;
  }
  return { ok: false, code: "UNHANDLED" };
}

app.post("/rooms/:roomId/messages", async (c) => {
  const body = await c.req.json();
  const moderated = await runChain(
    { roomId: c.req.param("roomId"), authorId: c.get("userId"), body: body.body },
    [stripEmpty, blockBannedWords, maskSecrets],
  );
  if (!moderated.ok) return c.json({ code: moderated.code }, 400);
  const saved = await postMessage({ ...body, body: moderated.body }, deps);
  return c.json(saved, 201);
});
```

Hono middleware (`auth` → `rateLimit` → route) is the framework form of the same chain.

### Frontend (React)

```ts
type SubmitHandler = (body: string) => string | null; // null = pass

const handlers: SubmitHandler[] = [
  (body) => (body.trim() ? null : "Message required"),
  (body) => (body.length > 4000 ? "Too long" : null),
];

function validateMessage(body: string) {
  for (const handler of handlers) {
    const error = handler(body);
    if (error) return error;
  }
  return null;
}
```

### Side-by-side

| Change | One mega-validator | Chain |
|--------|--------------------|-------|
| Add PII redaction | Edit a giant function | Insert a handler |
| Reorder checks | Fragile edits | Reorder the array |

## Related concepts

Decorator, Middleware, Template Method

## Where in this repo

Natural language for Hono middleware and moderation pipelines.

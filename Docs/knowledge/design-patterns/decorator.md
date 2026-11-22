# Decorator pattern

## What it is

Adds behavior to an object by **wrapping** it with another object that exposes the same interface, without changing the original class.

## توضیح فارسی

**Decorator** رفتار را با **پیچیدن** شیء اضافه می‌کند، بدون تغییر کلاس اصلی. چند لایه می‌توانند روی هم بنشینند (لاگ + محدودیت نرخ + احراز هویت). در Hono همان ایده به‌صورت middleware دیده می‌شود؛ در React می‌توان حباب پیام را با badge ویرایش یا منشن بدون تغییر کامپوننت پایه تزئین کرد.

## When to use

- Cross-cutting behavior that must compose (auth, rate limit, caching)
- Optional UI chrome around a stable base component

## When not to use

- The new behavior belongs in the core type permanently
- You need to change the interface, not wrap it (that is Adapter)

## Good practice

- Keep the same port/interface on the wrapper
- Order wrappers deliberately; document side effects

## Bad / worst practice

- **Bad:** decorator that breaks Liskov expectations of the wrappee
- **Worst:** deeply nested wrappers that hide where work happens

## Trade-offs

Composable behavior vs harder-to-follow call stacks.

## Real example — Chat API guards + message bubble chrome

### Backend (Hono)

```ts
type Handler = (c: Context) => Promise<Response>;

function withAuth(inner: Handler): Handler {
  return async (c) => {
    const userId = await sessions.userId(c);
    if (!userId) return c.json({ code: "UNAUTHORIZED" }, 401);
    c.set("userId", userId);
    return inner(c);
  };
}

function withRateLimit(inner: Handler, key: (c: Context) => string): Handler {
  return async (c) => {
    if (await rateLimit.hit(key(c))) return c.json({ code: "RATE_LIMIT" }, 429);
    return inner(c);
  };
}

const postMessage: Handler = async (c) => { /* call use case */ return c.json(msg, 201); };

// Compose: rate limit → auth → core (order matters)
app.post(
  "/rooms/:roomId/messages",
  withRateLimit(withAuth(postMessage), (c) => c.get("userId") ?? c.req.header("x-forwarded-for") ?? "anon"),
);
```

Hono’s native middleware pipeline is the same idea: each layer wraps `next`.

### Frontend (React)

```tsx
function MessageBubble({ body }: { body: string }) {
  return <p>{body}</p>;
}

function withEditedBadge<P extends { body: string }>(
  Inner: React.FC<P>,
): React.FC<P & { edited?: boolean }> {
  return function EditedBadge(props) {
    return (
      <div>
        <Inner {...props} />
        {props.edited ? <span>edited</span> : null}
      </div>
    );
  };
}

const ChatBubble = withEditedBadge(MessageBubble);
```

### Side-by-side

| Change | Edit core handler/component | Decorator |
|--------|-----------------------------|-----------|
| Add rate limit | Open every route | Wrap once |
| Remove badge | Conditional inside bubble | Drop the wrapper |

## Related concepts

Proxy, Middleware, OCP

## Where in this repo

Natural fit for Hono middleware and thin UI wrappers.

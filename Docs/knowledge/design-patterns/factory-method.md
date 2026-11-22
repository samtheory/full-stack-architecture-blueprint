# Factory Method pattern

## What it is

Defines an interface for creating an object, but lets **subclasses or implementations decide** which class to instantiate. Creation is deferred to the method that knows the variant.

## توضیح فارسی

**Factory Method** یک عملیات «بساز» تعریف می‌کند ولی **پیاده‌سازی/زیرکلاس** تصمیم می‌گیرد دقیقاً چه چیزی ساخته شود. برخلاف factory سادهٔ متمرکز، اینجا هر شاخهٔ محصول متد ساخت خودش را دارد. مثال چت: کانال اعلان (email / push / Slack) هرکدام `createNotifier()` خود را می‌آورند تا pipeline ارسال یکسان بماند.

## When to use

- A stable workflow must create different products per variant
- Open for new product types without editing a central `switch` (OCP)

## When not to use

- One product type — a function is enough
- You only need config-based selection once at startup (simple factory / abstract factory may fit better)

## Good practice

- Keep the factory method next to the variant that owns the knowledge
- Return a port type, not a concrete SDK class

## Bad / worst practice

- **Bad:** factory method that still contains a giant `switch` on every call
- **Worst:** inheritance tree invented only to host `createX()`

## Trade-offs

Extension without editing a center vs more types/classes.

## Real example — Chat notification channels

After `@sam` is mentioned, the server notifies the user. Email, mobile push, and Slack bots share “render template → send → record delivery”, but each channel constructs a different sender.

### Backend (Hono)

```ts
interface Notifier {
  send(input: { userId: string; body: string }): Promise<void>;
}

abstract class MentionNotification {
  async deliver(userId: string, body: string) {
    const notifier = this.createNotifier(); // factory method
    await notifier.send({ userId, body });
    await deliveries.record(userId, this.channel);
  }
  protected abstract createNotifier(): Notifier;
  protected abstract channel: "email" | "push" | "slack";
}

class EmailMentionNotification extends MentionNotification {
  protected channel = "email" as const;
  protected createNotifier() {
    return new EmailNotifier(ses);
  }
}

class PushMentionNotification extends MentionNotification {
  protected channel = "push" as const;
  protected createNotifier() {
    return new PushNotifier(fcm);
  }
}

// route selects the variant; deliver() stays closed
app.post("/internal/mentions", async (c) => {
  const { userId, body, channel } = await c.req.json();
  const job =
    channel === "push"
      ? new PushMentionNotification()
      : channel === "slack"
        ? new SlackMentionNotification()
        : new EmailMentionNotification();
  await job.deliver(userId, body);
  return c.json({ ok: true });
});
```

In TypeScript you can also express factory methods without classes: a `channel` module exports `createNotifier()` and a shared `deliver(createNotifier, …)`.

### Frontend (React)

Each notification preference panel knows how to create its settings editor:

```tsx
type Channel = "email" | "push" | "slack";

abstract class ChannelSettings {
  abstract createEditor(): React.FC<{ value: unknown; onChange: (v: unknown) => void }>;
}

class PushChannelSettings extends ChannelSettings {
  createEditor() {
    return PushTokenEditor;
  }
}

function NotificationPrefs({ channel }: { channel: Channel }) {
  const Editor = settingsFor(channel).createEditor();
  return <Editor value={value} onChange={setValue} />;
}
```

### Side-by-side

| Change | Central `switch` factory | Factory Method |
|--------|--------------------------|----------------|
| Add Slack | Edit the shared switch | New subclass / module with `createNotifier` |
| Shared deliver steps | Copied per channel | Stay in the base `deliver` |

## Related concepts

Factory, Abstract Factory, Template Method, OCP

## Where in this repo

Complements [factory.md](factory.md); prefer this when variants own creation knowledge.

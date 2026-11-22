# Bridge pattern

## What it is

Separates an **abstraction** from its **implementation** so both can vary independently. Two orthogonal dimensions stop collapsing into one inheritance explosion.

## توضیح فارسی

**Bridge** انتزاع را از پیاده‌سازی جدا می‌کند تا هر دو مستقل عوض شوند. مثال: نوع اعلان (Mention، Receipt، Digest) یک بعد است؛ کانال ارسال (Email، Push، Slack) بعد دیگر. بدون Bridge معمولاً کلاس‌هایی مثل `EmailMention`، `PushMention`، `EmailReceipt`… زیاد می‌شوند. با Bridge، اعلان به یک `Sender` وصل می‌شود و کانال جدا عوض می‌شود.

## When to use

- Two independent axes of change (notification kind × channel, report × renderer)
- You want to avoid a Cartesian product of subclasses

## When not to use

- Only one implementation will ever exist
- Strategy alone already covers a single axis of algorithms

## Good practice

- Abstraction holds a reference to the implementor port
- Compose in the composition root

## Bad / worst practice

- **Bad:** bridge that still hard-codes the implementor inside the abstraction
- **Worst:** renaming inheritance as “bridge” with no second axis

## Trade-offs

Independent extension vs an extra interface layer.

## Real example — Chat notifications × channels

### Backend (Hono)

```ts
interface MessageSender {
  send(toUserId: string, title: string, body: string): Promise<void>;
}

class EmailSender implements MessageSender { /* SES */ }
class PushSender implements MessageSender { /* FCM */ }
class SlackSender implements MessageSender { /* webhook */ }

/** Abstraction — varies by product event */
abstract class Notification {
  constructor(protected readonly sender: MessageSender) {}
  abstract deliver(userId: string, payload: Record<string, string>): Promise<void>;
}

class MentionNotification extends Notification {
  async deliver(userId: string, payload: Record<string, string>) {
    await this.sender.send(userId, "You were mentioned", payload.body);
  }
}

class DigestNotification extends Notification {
  async deliver(userId: string, payload: Record<string, string>) {
    await this.sender.send(userId, "Daily digest", payload.summary);
  }
}

// pick each axis independently
const mentionPush = new MentionNotification(new PushSender());
const digestEmail = new DigestNotification(new EmailSender());
```

### Frontend (React)

```tsx
type Renderer = (props: { title: string; body: string }) => React.ReactNode;

function ToastRenderer({ title, body }: { title: string; body: string }) {
  return <div role="status">{title}: {body}</div>;
}

function InboxRowRenderer({ title, body }: { title: string; body: string }) {
  return (
    <li>
      <strong>{title}</strong> — {body}
    </li>
  );
}

/** Abstraction: notification card; implementor: how it renders */
function NotificationView({
  title,
  body,
  renderer: Renderer,
}: {
  title: string;
  body: string;
  renderer: Renderer;
}) {
  return <>{Renderer({ title, body })}</>;
}
```

### Side-by-side

| Change | Subclass per pair | Bridge |
|--------|-------------------|--------|
| Add Slack digests | New `SlackDigest` class | Reuse `DigestNotification` + `SlackSender` |
| Add Mentions on Slack | Another subclass | Same mention + new sender |

## Related concepts

Strategy, Abstract Factory, Adapter

## Where in this repo

Teaching pattern when product events and delivery channels multiply.

# Mediator pattern

## What it is

Coordinates communication between objects so they **do not refer to each other directly**. Colleagues talk to the mediator; the mediator routes.

## توضیح فارسی

**Mediator** ارتباط بین اشیاء را هماهنگ می‌کند تا به هم **وابسته مستقیم** نباشند. در چت، composer و لیست اعضا و typing indicator نباید همدیگر را import کنند؛ یک هماهنگ‌کنندهٔ اتاق رویدادها را پخش می‌کند. با Observer فرق ظریف دارد: اینجا تمرکز روی **کاهش وابستگی متقابل** بین چند همکار است، نه فقط اطلاع از تغییر یک subject.

## When to use

- Many UI widgets or domain colleagues with tangled pairwise links
- Room/session coordinators

## When not to use

- Two objects with a simple direct call
- Mediator becomes a god object that owns all logic

## Good practice

- Mediator routes; business rules stay in colleagues or use cases
- Keep a clear event/command vocabulary

## Bad / worst practice

- **Bad:** mediator that imports every feature module’s internals
- **Worst:** replacing all structure with one global event bus of strings

## Trade-offs

Decoupled colleagues vs a busy coordinator.

## Real example — Chat room coordinator

### Backend (Hono)

```ts
type RoomEvent =
  | { type: "message.posted"; messageId: string; body: string; authorId: string }
  | { type: "typing"; userId: string }
  | { type: "member.joined"; userId: string };

class RoomMediator {
  private members = new Set<(event: RoomEvent) => void>();

  join(listener: (event: RoomEvent) => void) {
    this.members.add(listener);
    return () => this.members.delete(listener);
  }

  publish(event: RoomEvent) {
    for (const listener of this.members) listener(event);
  }

  async postMessage(authorId: string, body: string, save: (msg: { id: string; body: string }) => Promise<void>) {
    const id = crypto.randomUUID();
    await save({ id, body });
    this.publish({ type: "message.posted", messageId: id, body, authorId });
  }
}

const rooms = new Map<string, RoomMediator>();

app.post("/rooms/:roomId/messages", async (c) => {
  const roomId = c.req.param("roomId");
  const mediator = rooms.get(roomId) ?? new RoomMediator();
  rooms.set(roomId, mediator);
  const { body } = await c.req.json();
  await mediator.postMessage(c.get("userId"), body, (msg) => messages.add(roomId, msg));
  return c.json({ ok: true }, 201);
});
```

### Frontend (React)

```tsx
type RoomBus = {
  publish(event: RoomEvent): void;
  subscribe(listener: (event: RoomEvent) => void): () => void;
};

function ChatRoom({ bus }: { bus: RoomBus }) {
  return (
    <>
      <MemberList bus={bus} />
      <Thread bus={bus} />
      <Composer bus={bus} />
      <TypingIndicator bus={bus} />
    </>
  );
}

// Composer and Thread never import each other — only the bus (mediator)
```

### Side-by-side

| Change | Pairwise imports | Mediator |
|--------|------------------|----------|
| Add typing indicator | Wire into composer + thread | Subscribe to bus |
| Refactor thread | Breaks composer import | Bus contract stays |

## Related concepts

Observer, Facade, DI

## Where in this repo

Related to chat observer examples; mediator emphasizes multi-colleague coordination.

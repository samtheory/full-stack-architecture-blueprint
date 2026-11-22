# Observer pattern

## What it is

Dependents (**observers**) get notified when a subject’s state changes. In UI stacks this often appears as store subscriptions, event emitters, or query cache invalidation.

## توضیح فارسی

**Observer** وقتی وضعیت یک subject عوض می‌شود، وابسته‌ها (observers) را خبر می‌کند. در چت سازمانی، بعد از ذخیرهٔ پیام، inbox، mention و thread باز باید به‌روز شوند؛ use case فقط publish می‌کند و listenerها جدا ثبت می‌شوند. در React معمولاً به‌صورت اشتراک سوکت و به‌روزرسانی کش query دیده می‌شود.

## When to use

- Optimistic UI that must refresh multiple views after mutation
- Domain events inside a process (carefully)

## When not to use

- Direct call is enough and clearer
- Cross-service “events” without delivery guarantees pretending to be Observer

## Good practice

- Explicit subscriptions and teardown (avoid leaks)
- Keep domain notifications framework-agnostic if used

## Bad / worst practice

- **Bad:** silent global bus with stringly-typed events everywhere
- **Worst:** observers performing more writes that re-enter the subject unboundedly

## Trade-offs

Decoupling vs harder-to-follow control flow.

## Real example — Chat message fan-out

Someone posts “@sam the deploy failed” in a channel. After the row is stored, three things care, and they care for different reasons: the inbox unread count, a mention push, and every open view of that channel (the thread and the sidebar). `postMessage` should stay “validate, store, tell subscribers.” Adding an audit log later is a new subscriber in the composition root.

A direct call is still right when there is a single obvious next step. Observer earns its place here because the set of listeners grows, and the React tree has more than one view of the same event.

Teaching snippets, not a runnable app. Wiring those listeners is dependency injection: [dependency-injection.md](dependency-injection.md).

### Backend (Hono) — worst practice

```ts
// ❌ String bus. A bot listener calls postMessage, which emits again.
eventBus.emit("message", { roomId, body });

eventBus.on("message", async (payload) => {
  if (payload.body.includes("/bot")) {
    await postMessage(payload.roomId, "bot", "pong");
  }
});
```

Names are unchecked. A listener that writes another message re-enters the bus with no guard. A throw from push delivery fails the HTTP request even though the message row is already committed, so the client retries and posts a duplicate.

### Backend (Hono) — best practice

The hub is typed and in-process. Listeners are registered once at startup. They enqueue work. They do not call `postMessage`.

```ts
export type MessagePosted = {
  messageId: string;
  roomId: string;
  authorId: string;
  body: string;
  mentionedUserIds: string[];
};

type Listener = (event: MessagePosted) => void;

export interface MessagePostedHub {
  subscribe(listener: Listener): () => void;
  publish(event: MessagePosted): void;
}

export function createMessagePostedHub(): MessagePostedHub {
  const listeners = new Set<Listener>();
  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    publish(event) {
      for (const listener of listeners) listener(event);
    },
  };
}

export async function postMessage(
  input: { roomId: string; authorId: string; body: string },
  deps: {
    messages: { add(message: MessagePosted & { createdAt: string }): Promise<void> };
    mentions: (body: string) => string[];
    ids: () => string;
    clock: () => Date;
    events: MessagePostedHub;
  },
) {
  const body = input.body.trim();
  if (!body) throw new Error("BODY_REQUIRED");

  const event: MessagePosted = {
    messageId: deps.ids(),
    roomId: input.roomId,
    authorId: input.authorId,
    body,
    mentionedUserIds: deps.mentions(body),
  };
  await deps.messages.add({ ...event, createdAt: deps.clock().toISOString() });
  deps.events.publish(event);
  return event;
}
```

```ts
const events = createMessagePostedHub();

function logListenerError(error: unknown) {
  console.error(error);
}

events.subscribe((event) => {
  void inbox.incrementUnread(event.roomId, event.authorId).catch(logListenerError);
});

events.subscribe((event) => {
  if (event.mentionedUserIds.length === 0) return;
  void push.enqueueMentions(event).catch(logListenerError);
});
```

`publish` runs only after `add` resolves. Push and unread write through their own ports and swallow their own failures so one down notifier does not turn a saved message into HTTP 500. A bot that must reply is a separate use case with a depth flag or a “system message” writer that does not publish `MessagePosted` again. Idempotent `messageId` keeps a client retry from inserting a second row.

The Hono route is `POST /rooms/:roomId/messages` → `postMessage` → `201` and the event. It does not import the push SDK.

### Frontend (React) — worst practice

`Thread`, `InboxList`, and `DocumentTitle` each call `socket.on("message.created", ...)`. None of them return a cleanup. After the user switches channels, the old listener is still appending into the previous thread. Event names are bare strings, so `message.created` and `message_created` both exist in the app.

### Frontend (React) — best practice

The socket is the subject. One subscription in the layout updates the query caches that the thread and the inbox already read. Components that only render do not know the socket exists. The subscription tears down when `roomId` changes.

```tsx
"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

type Message = { id: string; body: string; authorId: string };

type RoomEvent =
  | { type: "message.created"; roomId: string; message: Message }
  | { type: "unread.changed"; roomId: string; unread: number };

type RoomSocket = {
  subscribe(roomId: string, listener: (event: RoomEvent) => void): () => void;
};

export function useRoomEvents(
  socket: RoomSocket,
  roomId: string,
  onEvent: (event: RoomEvent) => void,
) {
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    return socket.subscribe(roomId, (event) => onEventRef.current(event));
  }, [socket, roomId]);
}

type InboxRow = { roomId: string; title: string; unread: number };

export function ChatLayout({ socket, roomId }: { socket: RoomSocket; roomId: string }) {
  const queryClient = useQueryClient();

  useRoomEvents(socket, roomId, (event) => {
    if (event.type === "message.created" && event.roomId === roomId) {
      queryClient.setQueryData<Message[]>(["room", roomId, "messages"], (current) => {
        if (!current) return [event.message];
        if (current.some((message) => message.id === event.message.id)) return current;
        return [...current, event.message];
      });
    }
    if (event.type === "unread.changed") {
      queryClient.setQueryData<InboxRow[]>(["inbox"], (current) =>
        current?.map((row) =>
          row.roomId === event.roomId ? { ...row, unread: event.unread } : row,
        ),
      );
    }
  });

  return (
    <>
      <InboxList />
      <Thread roomId={roomId} />
    </>
  );
}
```

`InboxList` and `Thread` use `useQuery`. The cache update re-renders both. The id check keeps a retried socket frame from duplicating a bubble. `useRoomEvents` writes the latest callback into a ref so a new inline function does not unsubscribe and resubscribe on every render.

### Side-by-side

| Change | Without Observer | With Observer |
|--------|------------------|---------------|
| Audit-log a message | Edit `postMessage` | `events.subscribe` in the composition root |
| Mention push is down | `POST` returns 500 after the insert | Listener logs; the message stays saved |
| Sidebar unread while a thread is open | Each component binds the socket | One subscription writes the inbox and message caches |
| Leave the channel | Stale `socket.on` keeps appending | Effect cleanup calls the `subscribe` unsubscribe |

## Related concepts

Optimistic UI Sync Example

## Where in this repo

Client cache invalidation / sync example (planned).

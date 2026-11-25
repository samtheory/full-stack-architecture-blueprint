# Dependency injection (DI)

## What it is

A technique to supply a module’s dependencies from the outside rather than constructing them internally. **DI is how we often deliver DIP** — they are not the same thing.

## توضیح فارسی

**Dependency Injection** وابستگی‌ها را از بیرون به ماژول می‌دهد، نه اینکه ماژول خودش آن‌ها را بسازد. DI روش تحویل **DIP** است؛ خود DIP نیست. در چت، `createApp(deps)` و `ChatServicesProvider` همان composition root هستند: تست clock را فریز می‌کند، Storybook API جعلی می‌دهد، و production Postgres واقعی را.

## 1. Dummy — Mermaid diagram + one sentence why

```mermaid
flowchart LR
  Main[main.ts] --> App[createApp deps]
  App --> UC[postMessage]
  UC --> Repo[MessageRepository port]
```

**Why:** build real adapters once at the edge; use cases receive ports they can swap in tests.

## 2. When / when not · Good · Bad

### When to use

- Use cases need repositories/loggers/clocks
- Tests replace deps with fakes

### When not to use

- Passing every transitive dependency through 10 layers (fix with composition)
- Container-heavy frameworks for a 3-route teaching API

### Good practice

- Manual injection in `createApp(deps)` for this repo’s scale
- Composition root only in apps

### Bad / worst practice

- **Bad:** importing concrete adapters inside use cases “just this once”
- **Worst:** ambient global `container.get` scattered in domain

**Trade-offs:** Wiring code vs hard-wired dependencies that resist tests.

## 3. Working — Hono worst/best + React worst/best TypeScript examples

### Real example — Chat composition root

`postMessage` needs a message store, a clock (the `createdAt` we persist and that tests freeze), an id generator, and the hub from [observer.md](observer.md). The React composer needs an API client and that same clock for an optimistic bubble. Neither the use case nor the composer should construct Postgres, open a websocket, or call `container.get`.

One composition root on each side builds the real objects. Tests and Storybook pass fakes through the same holes. That is dependency injection. The rule that the use case depends on a `MessageRepository` port, not on `pg`, is dependency inversion — related, and not the same thing.

Teaching snippets, not a runnable app.

### Backend (Hono) — worst practice

```ts
// ❌ The use case reaches for globals. A test cannot freeze time or skip Postgres.
import { pool } from "./db";
import { container } from "./container";

export async function postMessage(roomId: string, authorId: string, body: string) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  await pool.query("INSERT INTO messages (id, room_id, author_id, body, created_at) VALUES ($1,$2,$3,$4,$5)", [
    id,
    roomId,
    authorId,
    body,
    createdAt,
  ]);
  container.get("push").send(roomId, body);
  return { id, createdAt, body };
}
```

### Backend (Hono) — best practice

The use case takes `ChatDeps`. `createApp` closes over them. Only `main` constructs adapters.

```ts
import { Hono } from "hono";
import { MessagePostedHub, postMessage } from "@fsab/application";

type StoredMessage = {
  messageId: string;
  roomId: string;
  authorId: string;
  body: string;
  mentionedUserIds: string[];
  createdAt: string;
};

export type ChatDeps = {
  messages: { add(message: StoredMessage): Promise<void> };
  events: MessagePostedHub;
  mentions: (body: string) => string[];
  ids: () => string;
  clock: () => Date;
};

export function createApp(deps: ChatDeps) {
  const app = new Hono();

  app.post("/rooms/:roomId/messages", async (c) => {
    const body = await c.req.json();
    try {
      const message = await postMessage(
        {
          roomId: c.req.param("roomId"),
          authorId: c.get("userId"),
          body: body.body,
        },
        deps,
      );
      return c.json(message, 201);
    } catch (error) {
      if (error instanceof Error && error.message === "BODY_REQUIRED") {
        return c.json({ code: "BODY_REQUIRED" }, 400);
      }
      throw error;
    }
  });

  return app;
}
```

```ts
// apps/api/src/main.ts — composition root
const events = createMessagePostedHub();
events.subscribe((event) => {
  void mentionNotifier.enqueue(event).catch(logListenerError);
});

const app = createApp({
  messages: new PostgresMessageRepository(pool),
  events,
  mentions: parseMentions,
  ids: () => crypto.randomUUID(),
  clock: () => new Date(),
});
```

The test builds the same app with fakes. No global, no network.

```ts
const stored: StoredMessage[] = [];
const published: MessagePosted[] = [];
const events = createMessagePostedHub();
events.subscribe((event) => published.push(event));

const app = createApp({
  messages: {
    async add(message) {
      stored.push(message);
    },
  },
  events,
  mentions: () => ["sam"],
  ids: () => "msg_1",
  clock: () => new Date("2026-01-01T00:00:00Z"),
});
```

`POST` a body of `"@sam hi"` and assert `stored[0].createdAt` is that instant and `published` has one event. A second test injects a repository whose `add` throws and asserts the hub received nothing, because `postMessage` publishes only after the insert.

Do not thread `pool` through the route, the use case, and the notifier by hand. The root constructs `PostgresMessageRepository` and passes the port.

### Frontend (React) — worst practice

`Composer` imports `../lib/api` and calls `Date.now()` while building an optimistic message. Storybook either hits the real API or the story rewrites the module mock. A unit test cannot assert the optimistic timestamp.

### Frontend (React) — best practice

The shell owns a `ChatServices` value. The composer reads it. Deep children use the context so `roomId` and `body` are not accompanied by ten extra props.

```tsx
"use client";

import { createContext, useContext, useState } from "react";

type Message = { id: string; body: string; createdAt: number };

type ChatServices = {
  api: {
    postMessage(roomId: string, body: string): Promise<Message>;
  };
  clock: () => number;
};

const ChatServicesContext = createContext<ChatServices | null>(null);

export function ChatServicesProvider({
  services,
  children,
}: {
  services: ChatServices;
  children: React.ReactNode;
}) {
  return (
    <ChatServicesContext.Provider value={services}>{children}</ChatServicesContext.Provider>
  );
}

export function useChatServices(): ChatServices {
  const services = useContext(ChatServicesContext);
  if (!services) throw new Error("ChatServicesProvider is missing");
  return services;
}

export function Composer({
  roomId,
  onOptimistic,
}: {
  roomId: string;
  onOptimistic: (message: Message) => void;
}) {
  const { api, clock } = useChatServices();
  const [body, setBody] = useState("");

  async function send() {
    const text = body.trim();
    if (!text) return;
    onOptimistic({ id: "optimistic", body: text, createdAt: clock() });
    setBody("");
    await api.postMessage(roomId, text);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void send();
      }}
    >
      <textarea aria-label="Message" value={body} onChange={(event) => setBody(event.target.value)} />
      <button type="submit">Send</button>
    </form>
  );
}
```

```tsx
// main.tsx — composition root
<ChatServicesProvider
  services={{
    api: createHttpChatApi(import.meta.env.VITE_API_URL),
    clock: () => Date.now(),
  }}
>
  <ChatLayout />
</ChatServicesProvider>
```

Storybook renders the same provider with `api.postMessage` resolving a fixture and `clock: () => 1_735_689_600_000`. The composer does not change. The socket from the observer example is another field on `ChatServices` when the layout needs it, still created in `main.tsx`.

### Side-by-side

| Need | Without injection | With injection |
|------|-------------------|----------------|
| Assert `createdAt` | Stub the global `Date` | Pass `clock: () => new Date("2026-01-01T00:00:00Z")` |
| Assert publish-after-insert | Run Postgres and a push sandbox | Fake `messages.add` that throws; expect zero events |
| Storybook the composer | Mock the API module | `ChatServicesProvider` with a fake `api` |
| Swap Postgres for an in-memory store | Edit `postMessage` | Edit `main.ts` only |

## 4. Rich — edge cases · testing seams

**Edge cases**

- **Constructor injection vs props:** React uses provider props; Hono uses `createApp(deps)`—same idea, different shell.
- **Optional deps:** prefer no-op implementations over `undefined` checks scattered in use cases.
- **Request scope:** per-request user id is not a singleton—pass through `Context`, not global container.

**Testing seams**

- `createApp({ messages: fake, clock: fixed })` for route tests.
- Storybook `ChatServicesProvider` with fake API—no module mocking.

## 5. CTO — overuse signals · monorepo placement

### Overuse signals

- Service locator `container.get` in `packages/domain`
- Every new dependency prop-drilled through six React layers without context

### Alternatives

- Manual wiring at `main.ts` for this monorepo’s scale
- [Singleton](singleton.md) only for true process resources at root

### Monorepo placement

| Piece | Location |
|-------|----------|
| `createApp(deps)` | `apps/api` |
| Use cases | `packages/application` |
| Providers | `apps/web/src/providers` |

## Related · Where in this repo

**Related:** DIP, [Factory](factory.md), Hexagonal

**Where:** Hono API composition root (planned). Course A7 — [COURSE.md](../COURSE.md).

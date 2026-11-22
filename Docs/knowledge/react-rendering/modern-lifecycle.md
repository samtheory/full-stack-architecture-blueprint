# React modern rendering model

## What it is

UI is a function of state/props. React **renders** (computes element trees), **commits** to the DOM, and may **re-render** when state/props/context change. Hooks (`useState`, `useEffect`, `useEffectEvent`, etc.) express state and side effects in function components. In Next.js App Router, **Server Components** run on the server by default; **Client Components** opt into interactivity with `"use client"`.

## When to use

- All new React code in this repository
- Teaching data fetching, forms, and optimistic UI

## When not to use

- N/A as the default — prefer this model

## Good practice

- Keep render pure; put side effects in effects or event handlers
- Prefer deriving values during render over syncing state in effects when possible
- Explicit Client Components only where needed
- Understand that effects run after commit; cleanup matters

## Bad / worst practice

- **Bad:** fetching in `useEffect` without handling race/cancellation when a library or server approach is better
- **Worst:** mutating props/state during render, or teaching class lifecycles as the default path

## Trade-offs

Hooks rules and mental model take practice; Server/Client split adds a boundary to learn.

## Examples

Teaching snippets for this repo’s default model. They are not a runnable app. New code stays in function components. Class method names stay on the comparison page: [legacy-class-lifecycle.md](legacy-class-lifecycle.md).

Phases, in order:

1. **Render** — React calls your function. It must be pure: same state and props in, same element tree out. No network, no DOM writes, no mutation of props.
2. **Commit** — React applies that tree to the DOM.
3. **Effects** — `useEffect` runs after commit. Cleanup runs before the next effect and on unmount.
4. **Re-render** — a state, props, or context change starts again at step 1.

### 1. UI is a function of state

The component function *is* the render. The click handler does not touch the DOM; it asks React to render again with new state.

```tsx
"use client";

import { useState } from "react";

export function RemainingCount({ total }: { total: number }) {
  const [done, setDone] = useState(0);
  const remaining = total - done; // derived during render

  return (
    <p>
      {remaining} left
      <button type="button" onClick={() => setDone((n) => n + 1)}>
        Complete one
      </button>
    </p>
  );
}
```

`remaining` is not stored. When `done` or `total` changes, the next render computes it.

### 2. Keep render pure

```tsx
type Todo = { id: string; title: string; done: boolean };

// ❌ Mutates the caller's array during render. Parent and child share one list,
// so a later render sees data this child already reordered.
export function TodoList({ todos }: { todos: Todo[] }) {
  todos.sort((a, b) => Number(a.done) - Number(b.done));
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

```tsx
// ✅ Render only reads props. Sort a copy. Cheap filters stay as plain expressions.
type Todo = { id: string; title: string; done: boolean };

export function TodoList({ todos }: { todos: Todo[] }) {
  const ordered = [...todos].sort((a, b) => Number(a.done) - Number(b.done));
  return (
    <ul>
      {ordered.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

Setting state *during* render to “fix” a value is the same class of bug: render must not schedule more work as a side effect of painting. The one narrow exception is resetting state when an identity prop changes (example 4).

### 3. Derive during render, do not mirror it in an effect

`Todo` is the same shape as in example 2.

```tsx
// ❌ Extra state plus an effect that copies it. One frame can show a stale list,
// and the effect is a second source of truth.
import { useEffect, useState } from "react";

export function TodoSearch({ todos }: { todos: Todo[] }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(todos);

  useEffect(() => {
    setVisible(
      todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [todos, query]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <TodoList todos={visible} />
    </>
  );
}
```

```tsx
// ✅ query is state (the user typed it). visible is a calculation.
import { useState } from "react";

export function TodoSearch({ todos }: { todos: Todo[] }) {
  const [query, setQuery] = useState("");
  const visible = todos.filter((todo) =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <label htmlFor="todo-query">Filter</label>
      <input
        id="todo-query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <TodoList todos={visible} />
    </>
  );
}
```

### 4. Reset state when the identity changes

If the user switches todos, draft text from the previous id must not stick. Do that while rendering, not in an effect (an effect would paint the old draft for one frame).

```tsx
import { useState } from "react";

export function TodoTitleEditor({
  todoId,
  initialTitle,
}: {
  todoId: string;
  initialTitle: string;
}) {
  const [draft, setDraft] = useState(initialTitle);
  const [prevId, setPrevId] = useState(todoId);

  if (todoId !== prevId) {
    setPrevId(todoId);
    setDraft(initialTitle);
  }

  return (
    <input
      aria-label="Title"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
    />
  );
}
```

A `key={todoId}` on this component from the parent is the other clean option: React throws away the old state and mounts fresh.

### 5. User actions go in event handlers

Saving is caused by the click, so it belongs in the handler. It runs because of the event, not because the component painted.

```tsx
"use client";

import { useState } from "react";

export function SaveTitle({
  todoId,
  onSave,
}: {
  todoId: string;
  onSave: (todoId: string, title: string) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      await onSave(todoId, title);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={pending}>
        Save
      </button>
    </form>
  );
}
```

### 6. Effects run after commit; return a cleanup

This is the modern stand-in for “run after mount / when deps change / on unmount”. The effect body subscribes after the DOM is updated. The returned function releases that subscription.

```tsx
"use client";

import { useEffect, useState } from "react";

export function useOnline() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    function sync() {
      setOnline(navigator.onLine);
    }
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return online;
}
```

Empty deps: setup once after the first commit, cleanup on unmount. The first paint uses `true`; the effect corrects it after commit, which stays safe if this hook is server-rendered. In Strict Mode, React mounts, cleans up, and mounts again in development — the cleanup is what keeps that from leaking listeners. If the effect closed over a prop, that prop belongs in the dependency list so a change tears down the old subscription and starts a new one.

### 7. `useEffectEvent` — read the latest value without re-subscribing

The connection depends on `roomId` only. The toast depends on `theme`, which changes often and must not reconnect.

```tsx
"use client";

import { useEffect, useEffectEvent } from "react";

type Room = {
  connect: () => void;
  disconnect: () => void;
  onConnected: (listener: () => void) => void;
};

declare function connectRoom(roomId: string): Room;

export function RoomStatus({
  roomId,
  theme,
}: {
  roomId: string;
  theme: "light" | "dark";
}) {
  const onConnected = useEffectEvent(() => {
    // always sees the latest theme; not a dependency of the effect
    console.info(`connected (${theme})`);
  });

  useEffect(() => {
    const room = connectRoom(roomId);
    room.onConnected(() => onConnected());
    room.connect();
    return () => room.disconnect();
  }, [roomId]);

  return <p>Room {roomId}</p>;
}
```

Call `onConnected` from inside the effect. Do not put it in the dependency array and do not pass it to child components.

### 8. Fetching — race, cancellation, and the server path

```tsx
// ❌ Worst: no cancellation. A slow response for todo A can land after the
// user already opened todo B and overwrite B's screen.
import { useEffect, useState } from "react";

export function TodoDetails({ id }: { id: string }) {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/todos/${id}`)
      .then((res) => res.json())
      .then((todo) => setTitle(todo.title));
  }, [id]);

  return <h1>{title ?? "…"}</h1>;
}
```

```tsx
// ✅ If the browser must fetch, ignore stale responses. Cleanup aborts in-flight work.
import { useEffect, useState } from "react";

export function TodoDetails({ id }: { id: string }) {
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setTitle(null);
    fetch(`/api/todos/${id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((todo) => setTitle(todo.title))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setTitle(null);
      });
    return () => controller.abort();
  }, [id]);

  return <h1>{title ?? "…"}</h1>;
}
```

```tsx
// ✅ Best for the first paint of a page: a Server Component fetches before
// HTML is sent. No effect, no race, no loading flash for the initial data.
export default async function TodoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`http://api.internal/todos/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("TODO_NOT_FOUND");
  const todo: { id: string; title: string } = await res.json();
  return <h1>{todo.title}</h1>;
}
```

Use the client fetch when the data depends on a browser-only interaction after the page is up. Use the server fetch for the data that defines the page. Add `"use client"` only on the leaf that needs state or a handler (example 9).

### 9. Client Components only where the browser is required

Server Components are the default in the App Router. They render on the server, can `await` data, and cannot use state or effects. Add `"use client"` on the leaf that needs a hook or an event handler — not on the whole route.

```tsx
// app/todos/page.tsx — Server Component
import { TodoComposer } from "./todo-composer";

export default async function TodosPage() {
  const res = await fetch("http://api.internal/todos", { cache: "no-store" });
  const todos: { id: string; title: string }[] = await res.json();

  return (
    <main>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <TodoComposer />
    </main>
  );
}
```

```tsx
// app/todos/todo-composer.tsx — Client Component, interactive leaf
"use client";

import { useState } from "react";

export function TodoComposer() {
  const [title, setTitle] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    try {
      await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      setTitle("");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="new-title">New todo</label>
      <input
        id="new-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={pending}
      />
      <button type="submit" disabled={pending}>
        Add
      </button>
    </form>
  );
}
```

The list is rendered on the server from the fetch result. Only the form opts into the client lifecycle.

## Related concepts

Separation of UI and Domain, Optimistic UI Sync

## Where in this repo

Examples on this page. Web and mobile React apps are planned. Contrast page: [legacy-class-lifecycle.md](legacy-class-lifecycle.md)

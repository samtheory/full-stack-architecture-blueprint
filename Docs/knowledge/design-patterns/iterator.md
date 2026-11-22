# Iterator pattern

## What it is

Provides a **standard way to traverse** a collection without exposing its internal representation (tree, pages, cursor, network batches).

## توضیح فارسی

**Iterator** یک روش استاندارد برای **پیمایش** مجموعه می‌دهد بدون افشای ساختار داخلی. در چت سازمانی، پیام‌ها صفحه‌به‌صفحه با cursor می‌آیند؛ کلاینت فقط `next()` می‌بیند، نه SQL و نه شکل ایندکس. برای درخت بلاک Notion هم می‌توان DFS iterator نوشت تا export خطی شود.

## When to use

- Cursor / keyset pagination
- Walking trees or graphs without leaking structure
- Lazy sequences that fetch the next page on demand

## When not to use

- A simple `for...of` over an in-memory array is enough
- You need random access more than traversal

## Good practice

- Stable cursors; never use offset pagination for hot timelines when possible
- Expose `AsyncIterator` for network-backed sequences

## Bad / worst practice

- **Bad:** iterator that mutates the collection while iterating without rules
- **Worst:** exposing SQL cursors or DB connections to the UI layer

## Trade-offs

Encapsulation and lazy IO vs more plumbing than `array.map`.

## Real example — Cursor pagination over chat messages

### Backend (Hono)

```ts
type Message = { id: string; body: string; createdAt: string };

async function* messagesIterator(
  roomId: string,
  fetchPage: (cursor: string | null) => Promise<{ items: Message[]; nextCursor: string | null }>,
): AsyncGenerator<Message> {
  let cursor: string | null = null;
  do {
    const page = await fetchPage(cursor);
    for (const item of page.items) yield item;
    cursor = page.nextCursor;
  } while (cursor);
}

app.get("/rooms/:roomId/messages", async (c) => {
  const cursor = c.req.query("cursor") ?? null;
  const page = await messages.page(c.req.param("roomId"), cursor, 50);
  return c.json(page); // { items, nextCursor }
});
```

### Frontend (React)

```tsx
function useMessageIterator(roomId: string) {
  const [items, setItems] = useState<Message[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  async function loadMore() {
    const page = await api.listMessages(roomId, cursor);
    setItems((prev) => [...prev, ...page.items]);
    setCursor(page.nextCursor);
  }

  return { items, loadMore, hasMore: cursor !== null || items.length === 0 };
}
```

For a block tree:

```ts
function* walkBlocks(node: BlockNode): Generator<BlockNode> {
  yield node;
  if (node.type === "section") {
    for (const child of node.children) yield* walkBlocks(child);
  }
}
```

### Side-by-side

| Need | Expose raw pages array only | Iterator |
|------|-----------------------------|----------|
| Consume 10k messages | Load everything | Yield pages lazily |
| Swap storage | UI learns new shape | UI keeps `next` / `loadMore` |

## Related concepts

Composite, Repository, Proxy (lazy)

## Where in this repo

Teaching pattern for timelines and tree walks.

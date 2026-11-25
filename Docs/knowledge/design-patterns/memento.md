# Memento pattern

## What it is

Captures and restores an object’s **previous state** without exposing its internal structure. Originator creates mementos; a caretaker stores them.

## توضیح فارسی

**Memento** وضعیت قبلی شیء را **ذخیره و بازگردانی** می‌کند بدون افشای جزئیات داخلی. برای autosave پیش‌نویس، restore نسخه، و بخشی از undo مناسب است. Originator (مثلاً صفحه) خودش snapshot می‌سازد؛ Caretaker (سرویس نسخه‌ها یا localStorage) فقط نگه‌داری می‌کند و داخل فیلدهای خصوصی را نمی‌بیند.

## 1. Dummy — Mermaid diagram + one sentence why

```mermaid
flowchart LR
  Page[Page originator] -->|createMemento| Snap[Snapshot]
  Snap --> Caretaker[Version store]
  Caretaker -->|restore| Page
```

**Why:** autosave and version history need opaque snapshots—the caretaker must not poke private fields.

## 2. When / when not · Good · Bad

### When to use

- Version restore / autosave drafts
- Undo stacks that need opaque snapshots
- Time-travel debugging of a document

### When not to use

- You only need the last scalar field (store it directly)
- Snapshots would include secrets you must not persist

### Good practice

- Memento is immutable and opaque to caretakers
- Bound history size; snapshot only what restore needs

### Bad / worst practice

- **Bad:** caretaker reading private fields to “optimize”
- **Worst:** unbounded snapshots of whole DB rows in the browser

**Trade-offs:** Reliable restore vs memory/storage cost.

## 3. Working — Hono worst/best + React worst/best TypeScript examples

Real example — Notion draft autosave + version restore.

### Backend (Hono) — worst practice

```ts
app.post("/pages/:id/restore/:versionId", async (c) => {
  const row = await versions.get(c.req.param("versionId"));
  // ❌ Route mutates page fields directly—no invariant checks
  await db.query("UPDATE pages SET title = $1, blocks = $2", [row.title, row.blocks]);
  return c.json(row);
});
```

### Backend (Hono) — best practice

```ts
type PageMemento = {
  pageId: string;
  title: string;
  blocks: unknown[];
  revision: number;
  savedAt: string;
};

class PageOriginator {
  constructor(private page: { id: string; title: string; blocks: unknown[]; revision: number }) {}

  createMemento(clock = () => new Date()): PageMemento {
    return {
      pageId: this.page.id,
      title: this.page.title,
      blocks: structuredClone(this.page.blocks),
      revision: this.page.revision,
      savedAt: clock().toISOString(),
    };
  }

  restore(memento: PageMemento) {
    if (memento.pageId !== this.page.id) throw new Error("WRONG_PAGE");
    this.page = {
      id: this.page.id,
      title: memento.title,
      blocks: structuredClone(memento.blocks),
      revision: memento.revision,
    };
  }

  current() { return this.page; }
}
```

### Frontend (React) — worst practice

```tsx
// ❌ Scatter previous values across refs
const prevTitle = useRef("");
function onChange(t: string) {
  prevTitle.current = title;
  setTitle(t);
}
```

### Frontend (React) — best practice

```tsx
function useDraftMemento(pageId: string) {
  const key = `draft:${pageId}`;

  function saveDraft(state: { title: string; blocks: unknown[] }) {
    const memento = { ...state, savedAt: Date.now() };
    localStorage.setItem(key, JSON.stringify(memento));
  }

  function restoreDraft() {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as { title: string; blocks: unknown[] }) : null;
  }

  return { saveDraft, restoreDraft };
}
```

## 4. Rich — edge cases · testing seams

**Edge cases**

- **PII in blocks:** memento must redact before browser storage.
- **Revision conflict:** restore may rewind revision—coordinate with [repository](repository.md) optimistic locking.
- **Size limits:** cap versions per page; compress or diff for large trees.

**Testing seams**

- `PageOriginator` round-trip: createMemento → mutate → restore → assert equality.
- Fake clock on `savedAt` for deterministic snapshots.

## 5. CTO — overuse signals · monorepo placement

### Overuse signals

- Full page JSON snapshotted on every keypress to Postgres
- Caretaker exposes memento fields to the UI layer

### Alternatives

- [Command](command.md) undo with minimal inverse operations
- Event sourcing when history is first-class product data

### Monorepo placement

| Piece | Location |
|-------|----------|
| `PageOriginator` | `packages/domain` |
| Version persistence | `packages/infrastructure` via repository |
| Draft memento hook | `apps/web/src/editor` |

## Related · Where in this repo

**Related:** [Command](command.md), [Prototype](prototype.md), [Repository](repository.md)

**Where:** Teaching pattern for drafts and version history.
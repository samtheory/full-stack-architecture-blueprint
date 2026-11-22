# Memento pattern

## What it is

Captures and restores an object’s **previous state** without exposing its internal structure. Originator creates mementos; a caretaker stores them.

## توضیح فارسی

**Memento** وضعیت قبلی شیء را **ذخیره و بازگردانی** می‌کند بدون افشای جزئیات داخلی. برای autosave پیش‌نویس، restore نسخه، و بخشی از undo مناسب است. Originator (مثلاً صفحه) خودش snapshot می‌سازد؛ Caretaker (سرویس نسخه‌ها یا localStorage) فقط نگه‌داری می‌کند و داخل فیلدهای خصوصی را نمی‌بیند.

## When to use

- Version restore / autosave drafts
- Undo stacks that need opaque snapshots
- Time-travel debugging of a document

## When not to use

- You only need the last scalar field (store it directly)
- Snapshots would include secrets you must not persist

## Good practice

- Memento is immutable and opaque to caretakers
- Bound history size; snapshot only what restore needs

## Bad / worst practice

- **Bad:** caretaker reading private fields to “optimize”
- **Worst:** unbounded snapshots of whole DB rows in the browser

## Trade-offs

Reliable restore vs memory/storage cost.

## Real example — Notion draft autosave + version restore

### Backend (Hono)

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

  current() {
    return this.page;
  }
}

app.post("/pages/:id/versions", async (c) => {
  const page = await pages.get(c.req.param("id"));
  const originator = new PageOriginator(page);
  const memento = originator.createMemento();
  await versions.add(memento);
  return c.json({ savedAt: memento.savedAt }, 201);
});

app.post("/pages/:id/restore/:versionId", async (c) => {
  const memento = await versions.get(c.req.param("versionId"));
  const page = await pages.get(c.req.param("id"));
  const originator = new PageOriginator(page);
  originator.restore(memento);
  await pages.save(originator.current());
  return c.json(originator.current());
});
```

### Frontend (React)

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

### Side-by-side

| Need | Ad hoc previousTitle | Memento |
|------|----------------------|---------|
| Restore full page | Manual field copies | Opaque snapshot |
| Autosave | Scatter write logic | Caretaker API |

## Related concepts

Command, Prototype, Repository

## Where in this repo

Teaching pattern for drafts and version history.

# Prototype pattern

## What it is

Creates a new object by **cloning** an existing instance (the prototype), instead of building from scratch through constructors every time.

## توضیح فارسی

**Prototype** به‌جای ساخت از صفر، یک نمونهٔ موجود را کلون می‌کند. وقتی ساخت گران است یا شیء پیکربندی پیچیده‌ای دارد (مثل صفحهٔ Notion با ده‌ها بلاک)، «Duplicate» یا «Create from template» دقیقاً همین الگوست: کپی ساختاریافته با شناسه‌های تازه، نه ارجاع به همان ردیف.

## When to use

- Duplicate / “save as template” flows
- Expensive setup copied many times with small variations

## When not to use

- A cheap `createEmpty()` factory is clearer
- Deep clone of graphs with shared identity (users, files) without a clear ownership rule

## Good practice

- Clone returns **new ids**; never alias the source row
- Document shallow vs deep clone behavior

## Bad / worst practice

- **Bad:** `structuredClone` of an object that still points at live DB connections
- **Worst:** “clone” that returns the same reference

## Trade-offs

Fast duplication vs careful handling of nested identity and secrets.

## Real example — Duplicate Notion page

Editors hit Duplicate. The API must copy title + blocks into a new page under the same workspace, with new block ids, and revision `1`.

### Backend (Hono)

```ts
type Block = { id: string; type: string; text?: string };
type Page = { id: string; workspaceId: string; title: string; blocks: Block[]; revision: number };

function clonePage(source: Page, newIds: () => string): Page {
  return {
    id: newIds(),
    workspaceId: source.workspaceId,
    title: `${source.title} (copy)`,
    revision: 1,
    blocks: source.blocks.map((block) => ({ ...block, id: newIds() })),
  };
}

app.post("/pages/:id/duplicate", async (c) => {
  const source = await pages.find(c.req.param("id"));
  if (!source) return c.json({ code: "NOT_FOUND" }, 404);
  const copy = clonePage(source, () => crypto.randomUUID());
  await pages.add(copy);
  return c.json(copy, 201);
});
```

Templates are prototypes stored once: `clonePage(template, newIds)` for “New from template”.

### Frontend (React)

Optimistic UI clones the in-memory page tree, shows it immediately, then reconciles with the API response ids.

```tsx
function duplicateLocal(page: Page): Page {
  return {
    ...page,
    id: crypto.randomUUID(),
    title: `${page.title} (copy)`,
    revision: 1,
    blocks: page.blocks.map((b) => ({ ...b, id: crypto.randomUUID() })),
  };
}
```

### Side-by-side

| Change | Without Prototype | With Prototype |
|--------|-------------------|----------------|
| Duplicate 80 blocks | Re-run create rules block-by-block | One structural clone + new ids |
| Template gallery | Special-case constructor per template | Store prototypes; clone on use |

## Related concepts

Factory, Memento

## Where in this repo

Teaching pattern for page/template duplication.

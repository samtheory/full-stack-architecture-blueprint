# Composite pattern

## What it is

Lets **individual objects and groups of objects** be treated uniformly through a shared interface. Composites contain children; leaves do not.

## توضیح فارسی

**Composite** به برگ و گروه یک رابط مشترک می‌دهد تا کلاینت نداند با یک آیتم طرف است یا با درخت. در Notion، صفحه و سکشن و پاراگراف همگی «بلاک» هستند: `wordCount()` یا `toMarkdown()` روی کل درخت یکسان صدا زده می‌شود. افزودن سکشن تو در تو نباید API فراخواننده را عوض کند.

## When to use

- Tree structures (pages, folders, menus, comment threads)
- Operations that must run the same way on leaf and node

## When not to use

- Flat lists with no nesting
- Forcing a tree where a simple array is enough

## Good practice

- Shared component interface for leaf and composite
- Clear ownership of children; avoid cycles

## Bad / worst practice

- **Bad:** composite that exposes a different API than leaves for every operation
- **Worst:** storing parent pointers and children without a single source of truth

## Trade-offs

Uniform tree ops vs more complex mutation and rendering.

## Real example — Notion block tree

A page contains sections; sections contain paragraphs and embeds. Export and word count walk the same tree.

### Backend (Hono)

```ts
interface BlockNode {
  id: string;
  wordCount(): number;
  toMarkdown(): string;
}

class ParagraphBlock implements BlockNode {
  constructor(
    public id: string,
    private text: string,
  ) {}
  wordCount() {
    return this.text.trim() ? this.text.trim().split(/\s+/).length : 0;
  }
  toMarkdown() {
    return this.text;
  }
}

class SectionBlock implements BlockNode {
  constructor(
    public id: string,
    private title: string,
    private children: BlockNode[] = [],
  ) {}
  add(child: BlockNode) {
    this.children.push(child);
  }
  wordCount() {
    return this.children.reduce((sum, child) => sum + child.wordCount(), 0);
  }
  toMarkdown() {
    return `## ${this.title}\n\n` + this.children.map((c) => c.toMarkdown()).join("\n\n");
  }
}

app.get("/pages/:id/stats", async (c) => {
  const root = await loadBlockTree(c.req.param("id"));
  return c.json({ words: root.wordCount() });
});
```

### Frontend (React)

```tsx
type BlockNode =
  | { type: "paragraph"; id: string; text: string }
  | { type: "section"; id: string; title: string; children: BlockNode[] };

function BlockView({ node }: { node: BlockNode }) {
  if (node.type === "paragraph") return <p>{node.text}</p>;
  return (
    <section>
      <h2>{node.title}</h2>
      {node.children.map((child) => (
        <BlockView key={child.id} node={child} />
      ))}
    </section>
  );
}
```

Recursive `BlockView` is the UI composite: the parent does not special-case how deep the tree goes.

### Side-by-side

| Operation | Flat special-cases | Composite |
|-----------|--------------------|-----------|
| Word count | Separate loops per type | `root.wordCount()` |
| Nested section | New code paths | Same `add` / render |

## Related concepts

Visitor, Iterator, Factory

## Where in this repo

Pairs with Notion block factory / export examples.

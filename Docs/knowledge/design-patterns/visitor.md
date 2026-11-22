# Visitor pattern

## What it is

Adds **new operations** to object structures without changing the classes of the elements. Each element accepts a visitor; the visitor implements `visitX` per type.

## توضیح فارسی

**Visitor** عملیات جدید را به ساختار اشیاء اضافه می‌کند **بدون تغییر کلاس‌های عناصر**. هر بلاک `accept(visitor)` دارد؛ visitorهایی مثل `MarkdownExportVisitor` یا `SpellcheckVisitor` جدا اضافه می‌شوند. وقتی انواع عنصر پایدارند ولی عملیات‌ها زیاد می‌شوند (export، آمار، لینت)، Visitor می‌درخشد؛ وقتی انواع عنصر مدام زیاد می‌شوند، هزینهٔ به‌روز کردن همهٔ visitorها بالا می‌رود.

## When to use

- Stable element hierarchy; growing operations (export, lint, analytics)
- You want operations closed against element classes (OCP on behaviors)

## When not to use

- Element types change often — each new type edits every visitor
- A simple method on the element is clearer

## Good practice

- Double dispatch via `accept` / `visitConcrete`
- Keep visitors pure when possible (return values, don’t mutate silently)

## Bad / worst practice

- **Bad:** visitor that needs to know private mutable fields of every node
- **Worst:** using Visitor where a single `switch (type)` in one module would do and types churn weekly

## Trade-offs

Easy new operations vs hard new element types.

## Real example — Operations over Notion block tree

### Backend (Hono)

```ts
interface BlockVisitor {
  visitParagraph(block: ParagraphBlock): void;
  visitSection(block: SectionBlock): void;
  visitEmbed(block: EmbedBlock): void;
}

interface Block {
  accept(visitor: BlockVisitor): void;
}

class ParagraphBlock implements Block {
  constructor(
    public id: string,
    public text: string,
  ) {}
  accept(visitor: BlockVisitor) {
    visitor.visitParagraph(this);
  }
}

class SectionBlock implements Block {
  constructor(
    public id: string,
    public title: string,
    public children: Block[],
  ) {}
  accept(visitor: BlockVisitor) {
    visitor.visitSection(this);
    for (const child of this.children) child.accept(visitor);
  }
}

class EmbedBlock implements Block {
  constructor(
    public id: string,
    public url: string,
  ) {}
  accept(visitor: BlockVisitor) {
    visitor.visitEmbed(this);
  }
}

class MarkdownExportVisitor implements BlockVisitor {
  parts: string[] = [];
  visitParagraph(block: ParagraphBlock) {
    this.parts.push(block.text);
  }
  visitSection(block: SectionBlock) {
    this.parts.push(`## ${block.title}`);
  }
  visitEmbed(block: EmbedBlock) {
    this.parts.push(`[embed](${block.url})`);
  }
  result() {
    return this.parts.join("\n\n");
  }
}

class SpellcheckVisitor implements BlockVisitor {
  issues: Array<{ id: string; message: string }> = [];
  visitParagraph(block: ParagraphBlock) {
    if (block.text.includes("teh ")) this.issues.push({ id: block.id, message: "Possible typo: teh" });
  }
  visitSection() {}
  visitEmbed() {}
}

app.get("/pages/:id/export.md", async (c) => {
  const root = await loadTree(c.req.param("id"));
  const visitor = new MarkdownExportVisitor();
  root.accept(visitor);
  return c.text(visitor.result());
});
```

### Frontend (React)

```tsx
type Visitor = {
  paragraph(text: string): React.ReactNode;
  embed(url: string): React.ReactNode;
};

function renderBlock(block: BlockNode, visitor: Visitor): React.ReactNode {
  if (block.type === "paragraph") return visitor.paragraph(block.text);
  if (block.type === "embed") return visitor.embed(block.url);
  return block.children.map((child) => renderBlock(child, visitor));
}

const previewVisitor: Visitor = {
  paragraph: (text) => <p>{text}</p>,
  embed: (url) => <a href={url}>{url}</a>,
};
```

### Side-by-side

| Change | Methods on each block class | Visitor |
|--------|-----------------------------|---------|
| Add spellcheck | Edit Paragraph/Section/Embed | New `SpellcheckVisitor` |
| Add new block type | One class | Update every visitor |

## Related concepts

Composite, Iterator, OCP

## Where in this repo

Pairs with Composite block trees and export/builder flows.

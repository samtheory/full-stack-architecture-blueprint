# Builder pattern

## What it is

Constructs a complex object **step by step**. The same construction process can produce different representations.

## توضیح فارسی

**Builder** شیء پیچیده را قدم‌به‌قدم می‌سازد. فرآیند ساخت ثابت می‌ماند؛ خروجی می‌تواند فرق کند (مثلاً همان صفحهٔ Notion یک‌بار PDF و یک‌بار Markdown شود). وقتی سازندهٔ شیء آرگومان‌های زیاد، ترتیب حساس، یا شاخه‌های اختیاری دارد، Builder خوانایی و اعتبارسنجی نهایی را بهتر از یک سازندهٔ غول‌پیکر نگه می‌دارد.

## When to use

- Export / report objects with many optional sections
- Fluent APIs that must validate only at `build()`

## When not to use

- A plain object literal or one constructor is enough
- Every field is required and independent — no assembly story

## Good practice

- `build()` fails fast if required steps were skipped
- Keep the director (orchestration) separate from the concrete builder when formats multiply

## Bad / worst practice

- **Bad:** builder that mutates a shared global document
- **Worst:** `build()` that returns a half-valid object “for convenience”

## Trade-offs

Clear step API vs more types than a single factory function.

## Real example — Notion page export

A workspace page has title, blocks, and cover. Export must produce either a Markdown string or a PDF job payload. The steps are the same: set title → add blocks → optional cover → finish. The representation differs.

### Backend (Hono)

```ts
type ExportDoc = { title: string; sections: string[]; coverUrl?: string };

interface PageExportBuilder {
  title(value: string): this;
  block(block: { type: string; text?: string; url?: string }): this;
  cover(url: string): this;
  build(): ExportDoc | { markdown: string } | { pdfJob: ExportDoc };
}

class MarkdownExportBuilder implements PageExportBuilder {
  private titleText = "";
  private lines: string[] = [];
  private coverUrl?: string;

  title(value: string) {
    this.titleText = value.trim();
    return this;
  }
  block(block: { type: string; text?: string; url?: string }) {
    if (block.type === "paragraph") this.lines.push(block.text ?? "");
    if (block.type === "embed") this.lines.push(`[embed](${block.url})`);
    return this;
  }
  cover(url: string) {
    this.coverUrl = url;
    return this;
  }
  build() {
    if (!this.titleText) throw new Error("TITLE_REQUIRED");
    const cover = this.coverUrl ? `![cover](${this.coverUrl})\n\n` : "";
    return { markdown: `# ${this.titleText}\n\n${cover}${this.lines.join("\n\n")}\n` };
  }
}

function exportPage(
  page: { title: string; coverUrl?: string; blocks: { type: string; text?: string; url?: string }[] },
  builder: PageExportBuilder,
) {
  builder.title(page.title);
  if (page.coverUrl) builder.cover(page.coverUrl);
  for (const block of page.blocks) builder.block(block);
  return builder.build();
}

// POST /pages/:id/export { format: "markdown" | "pdf" }
app.post("/pages/:id/export", async (c) => {
  const page = await pages.get(c.req.param("id"));
  const { format } = await c.req.json();
  const builder =
    format === "pdf" ? new PdfJobExportBuilder() : new MarkdownExportBuilder();
  return c.json(exportPage(page, builder));
});
```

### Frontend (React)

The export dialog builds a preview the same way: steps fill a draft, `build()` produces what the download button sends.

```tsx
"use client";

function useExportDraft() {
  const [draft, setDraft] = useState<{ title?: string; lines: string[] }>({ lines: [] });

  return {
    setTitle: (title: string) => setDraft((d) => ({ ...d, title })),
    addLine: (line: string) => setDraft((d) => ({ ...d, lines: [...d.lines, line] })),
    buildMarkdown() {
      if (!draft.title?.trim()) throw new Error("TITLE_REQUIRED");
      return `# ${draft.title}\n\n${draft.lines.join("\n\n")}\n`;
    },
  };
}
```

### Side-by-side

| Change | Without Builder | With Builder |
|--------|-----------------|--------------|
| Add PDF export | Duplicate assembly in a second function | New builder; same `exportPage` steps |
| Missing title | Half-written file | `build()` throws before response |

## Related concepts

Factory, Abstract Factory

## Where in this repo

Teaching pattern for export flows; no dedicated example package yet.

# Template Method pattern

## What it is

Defines the **skeleton of an algorithm** in a base type, deferring some steps to implementations. The outline stays fixed; selected steps vary.

## توضیح فارسی

**Template Method** اسکلت الگوریتم را ثابت می‌گذارد و اجازه می‌دهد بعضی گام‌ها عوض شوند. پایپ‌لاین ایمپورت (خواندن → نرمال‌سازی → اعتبارسنجی → ذخیره) برای CSV و خروجی Notion یکی است؛ فقط گام «خواندن» فرق می‌کند. برخلاف Strategy که کل الگوریتم عوض می‌شود، اینجا ترتیب گام‌ها در پایه قفل است.

## When to use

- Shared pipelines with a few variant steps (import, ETL, notification deliver)
- You want to forbid reordering steps by subclasses

## When not to use

- Every step varies — Strategy or composition fits better
- Deep inheritance only to override one line

## Good practice

- Mark the template method final / non-overridable in spirit
- Keep hooks small and intentional

## Bad / worst practice

- **Bad:** template that subclasses override end-to-end anyway
- **Worst:** brittle base class that breaks all importers on small changes

## Trade-offs

Consistent pipelines vs inheritance coupling.

## Real example — Import pages from CSV or Notion export

### Backend (Hono)

```ts
abstract class PageImporter {
  async run(source: Uint8Array) {
    const rows = await this.parse(source); // variant
    const normalized = rows.map((row) => this.normalize(row)); // often shared
    for (const page of normalized) this.validate(page); // shared
    await this.persist(normalized); // shared or variant
    return { imported: normalized.length };
  }

  protected abstract parse(source: Uint8Array): Promise<Array<Record<string, string>>>;

  protected normalize(row: Record<string, string>) {
    return { title: (row.title ?? "").trim(), body: row.body ?? "" };
  }

  protected validate(page: { title: string }) {
    if (!page.title) throw new Error("TITLE_REQUIRED");
  }

  protected async persist(pages: { title: string; body: string }[]) {
    await db.insertPages(pages);
  }
}

class CsvPageImporter extends PageImporter {
  protected async parse(source: Uint8Array) {
    return parseCsv(new TextDecoder().decode(source));
  }
}

class NotionExportImporter extends PageImporter {
  protected async parse(source: Uint8Array) {
    return parseNotionExportZip(source);
  }
}

app.post("/imports", async (c) => {
  const format = c.req.query("format");
  const bytes = new Uint8Array(await c.req.arrayBuffer());
  const importer = format === "notion" ? new NotionExportImporter() : new CsvPageImporter();
  return c.json(await importer.run(bytes));
});
```

### Frontend (React)

```tsx
abstract class ImportWizard {
  async submit(file: File) {
    const parsed = await this.parse(file);
    this.preview(parsed);
    await this.upload(parsed);
  }
  protected abstract parse(file: File): Promise<unknown>;
  protected preview(data: unknown) {
    /* set React state via injected setter */
  }
  protected async upload(data: unknown) {
    await fetch("/imports", { method: "POST", body: JSON.stringify(data) });
  }
}
```

### Side-by-side

| Change | Copy-paste pipeline | Template Method |
|--------|---------------------|-----------------|
| Add Notion zip | Duplicate validate/persist | Override `parse` only |
| Change validation | Miss one importer | One place in the base |

## Related concepts

Factory Method, Strategy

## Where in this repo

Teaching pattern for import/export pipelines.

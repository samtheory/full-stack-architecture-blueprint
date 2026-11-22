# Repository pattern

## What it is

Mediates between domain and data mapping; presents a **collection-like interface** for aggregates/entities.

## توضیح فارسی

**Repository** یک رابط شبیه «مجموعه» برای موجودیت‌ها/تجمع‌ها می‌سازد تا منطق دامنه به SQL، SDK دیتابیس یا HTTP وابسته نباشد. use case فقط `find` / `save` می‌بیند؛ پیاده‌سازی (Postgres، حافظه، IndexedDB) پشت همان قرارداد عوض می‌شود. برای اپ‌های سازمانی مثل ادیتور Notion که باید تعارض ویرایش را یکسان در سرور و تست پوشش دهد، بسیار رایج است.

## When to use

- You want use cases free of SQL/SDK details
- Multiple data sources behind one contract

## When not to use

- Single trivial query in a script
- Generic `Repository<T>` with no domain meaning

## Good practice

- Methods named in domain language (`listIncompleteTodos`)
- One repository per aggregate/consistency boundary

## Bad / worst practice

- **Bad:** repository that returns HTTP DTOs and sends emails
- **Worst:** leaking `DbConnection` through the repository API

## Trade-offs

Extra layer vs testability and swap-ability.

## Real example — Notion page edits

A Notion-style editor saves one page at a time: title, blocks, and a revision. Two people can edit the same page. The second save must fail with a conflict, not silently overwrite the first. That rule lives in one use case. Postgres in the API and the in-memory store in editor tests both look like a collection of pages. The HTTP route never sees SQL.

Teaching snippets, not a runnable app. Block *types* (paragraph vs database vs embed) are a factory concern: [factory.md](factory.md).

### Backend (Hono) — worst practice

The handler writes SQL, ignores the revision the client loaded, and always overwrites.

```ts
// ❌ Route is the data mapper. A second writer always wins.
app.patch("/workspaces/:workspaceId/pages/:pageId", async (c) => {
  const body = await c.req.json();
  await pool.query(
    "UPDATE pages SET title = $1, blocks = $2 WHERE workspace_id = $3 AND id = $4",
    [body.title, JSON.stringify(body.blocks), c.req.param("workspaceId"), c.req.param("pageId")],
  );
  return c.json({ ok: true });
});
```

A conflict test has to boot Hono and Postgres. An offline client cannot reuse this rule.

### Backend (Hono) — best practice

The repository speaks the page aggregate. `save` updates a row only when `expectedRevision` is still current.

```ts
export type Block = { id: string; type: "paragraph"; text: string };

export type Page = {
  id: string;
  workspaceId: string;
  title: string;
  revision: number;
  blocks: Block[];
};

export class RevisionConflict extends Error {
  constructor() {
    super("REVISION_CONFLICT");
  }
}

export type PagePatch = { title: string; blocks: Block[] };

/** Collection of page aggregates. No SQL and no HTTP types. */
export interface PageRepository {
  find(workspaceId: string, pageId: string): Promise<Page | null>;
  save(
    workspaceId: string,
    pageId: string,
    expectedRevision: number,
    patch: PagePatch,
  ): Promise<Page>;
}

export async function applyPageEdits(
  input: { workspaceId: string; pageId: string; baseRevision: number } & PagePatch,
  pages: PageRepository,
): Promise<Page> {
  const title = input.title.trim();
  if (!title) throw new Error("TITLE_REQUIRED");
  return pages.save(input.workspaceId, input.pageId, input.baseRevision, {
    title,
    blocks: input.blocks,
  });
}
```

```ts
import type { Pool } from "pg";
import { Page, PageRepository, RevisionConflict } from "@fsab/application";

export class PostgresPageRepository implements PageRepository {
  constructor(private readonly pool: Pool) {}

  async find(workspaceId: string, pageId: string): Promise<Page | null> {
    const result = await this.pool.query(
      `SELECT id, workspace_id, title, revision, blocks
       FROM pages WHERE workspace_id = $1 AND id = $2`,
      [workspaceId, pageId],
    );
    const row = result.rows[0];
    if (!row) return null;
    return {
      id: row.id,
      workspaceId: row.workspace_id,
      title: row.title,
      revision: row.revision,
      blocks: row.blocks,
    };
  }

  async save(workspaceId, pageId, expectedRevision, patch): Promise<Page> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const existing = await client.query(
        `SELECT revision FROM pages WHERE workspace_id = $1 AND id = $2 FOR UPDATE`,
        [workspaceId, pageId],
      );
      if (existing.rowCount === 0) throw new Error("PAGE_NOT_FOUND");
      if (existing.rows[0].revision !== expectedRevision) throw new RevisionConflict();

      const result = await client.query(
        `UPDATE pages
         SET title = $1, blocks = $2::jsonb, revision = revision + 1
         WHERE workspace_id = $3 AND id = $4
         RETURNING id, workspace_id, title, revision, blocks`,
        [patch.title, JSON.stringify(patch.blocks), workspaceId, pageId],
      );
      await client.query("COMMIT");
      const row = result.rows[0];
      return {
        id: row.id,
        workspaceId: row.workspace_id,
        title: row.title,
        revision: row.revision,
        blocks: row.blocks,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
```

```ts
import { Hono } from "hono";
import { z } from "zod";
import { applyPageEdits, PageRepository, RevisionConflict } from "@fsab/application";

const PatchPage = z.object({
  baseRevision: z.number().int().nonnegative(),
  title: z.string(),
  blocks: z.array(
    z.object({ id: z.string(), type: z.literal("paragraph"), text: z.string() }),
  ),
});

export function pageRoutes(pages: PageRepository) {
  const app = new Hono();

  app.patch("/workspaces/:workspaceId/pages/:pageId", async (c) => {
    const parsed = PatchPage.safeParse(await c.req.json());
    if (!parsed.success) return c.json({ code: "VALIDATION_ERROR" }, 400);

    try {
      const page = await applyPageEdits(
        {
          workspaceId: c.req.param("workspaceId"),
          pageId: c.req.param("pageId"),
          ...parsed.data,
        },
        pages,
      );
      return c.json(page);
    } catch (error) {
      if (error instanceof RevisionConflict) {
        return c.json({ code: "REVISION_CONFLICT" }, 409);
      }
      if (error instanceof Error && error.message === "PAGE_NOT_FOUND") {
        return c.json({ code: "PAGE_NOT_FOUND" }, 404);
      }
      if (error instanceof Error && error.message === "TITLE_REQUIRED") {
        return c.json({ code: "TITLE_REQUIRED" }, 400);
      }
      throw error;
    }
  });

  return app;
}
```

A conflict test uses a `Map`. It never opens a database.

```ts
export function createMemoryPageRepository(seed: Page[] = []): PageRepository {
  const byKey = new Map(seed.map((page) => [`${page.workspaceId}:${page.id}`, structuredClone(page)]));

  return {
    async find(workspaceId, pageId) {
      return byKey.get(`${workspaceId}:${pageId}`) ?? null;
    },
    async save(workspaceId, pageId, expectedRevision, patch) {
      const key = `${workspaceId}:${pageId}`;
      const current = byKey.get(key);
      if (!current) throw new Error("PAGE_NOT_FOUND");
      if (current.revision !== expectedRevision) throw new RevisionConflict();
      const next: Page = { ...current, ...patch, revision: current.revision + 1 };
      byKey.set(key, next);
      return next;
    },
  };
}
```

The offline editor’s IndexedDB adapter uses this same `save` signature. `objectStore.get` / `put` replace the `Map`. The revision check does not move into the React component.

### Frontend (React) — worst practice

The page component fetches, and a second `useEffect` writes IndexedDB with its own “if revision differs, overwrite anyway” branch. The API can return 409 while the offline path keeps the stale title.

### Frontend (React) — best practice

The editor depends on `PageRepository`. The app shell passes an HTTP implementation or the memory / IndexedDB one. `save` returns the page the store actually kept, so the client does not invent the next revision itself.

```ts
export function createHttpPageRepository(baseUrl: string): PageRepository {
  return {
    async find(workspaceId, pageId) {
      const res = await fetch(`${baseUrl}/workspaces/${workspaceId}/pages/${pageId}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("LOAD_FAILED");
      return res.json();
    },
    async save(workspaceId, pageId, expectedRevision, patch) {
      const res = await fetch(`${baseUrl}/workspaces/${workspaceId}/pages/${pageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ baseRevision: expectedRevision, ...patch }),
      });
      if (res.status === 409) throw new RevisionConflict();
      if (!res.ok) throw new Error("SAVE_FAILED");
      return res.json();
    },
  };
}
```

```tsx
"use client";

import { useEffect, useState } from "react";

export function PageEditor({
  pages,
  workspaceId,
  pageId,
}: {
  pages: PageRepository;
  workspaceId: string;
  pageId: string;
}) {
  const [page, setPage] = useState<Page | null>(null);
  const [title, setTitle] = useState("");
  const [conflict, setConflict] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void pages.find(workspaceId, pageId).then((loaded) => {
      if (cancelled || !loaded) return;
      setPage(loaded);
      setTitle(loaded.title);
    });
    return () => {
      cancelled = true;
    };
  }, [pages, workspaceId, pageId]);

  async function onSave() {
    if (!page) return;
    try {
      const saved = await pages.save(workspaceId, pageId, page.revision, {
        title,
        blocks: page.blocks,
      });
      setPage(saved);
      setTitle(saved.title);
      setConflict(false);
    } catch (error) {
      if (error instanceof RevisionConflict) setConflict(true);
      else throw error;
    }
  }

  if (!page) return <p>Loading page…</p>;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onSave();
      }}
    >
      {conflict && (
        <p>
          Someone else edited this page.{" "}
          <button
            type="button"
            onClick={() => {
              void pages.find(workspaceId, pageId).then((loaded) => {
                if (!loaded) return;
                setPage(loaded);
                setTitle(loaded.title);
                setConflict(false);
              });
            }}
          >
            Reload
          </button>
        </p>
      )}
      <input aria-label="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
      <button type="submit">Save</button>
    </form>
  );
}
```

`main.tsx` chooses the repository: `createHttpPageRepository(apiUrl)` while online, the IndexedDB implementation while offline. `PageEditor` stays the same.

### Side-by-side

| Change | Without a repository | With a repository |
|--------|----------------------|-------------------|
| Second writer saves the same revision | Last SQL `UPDATE` wins | `409` from the same `save` rule in Postgres and in the memory fake |
| Offline editor | A second conflict check inside the component | New `PageRepository` implementation |
| Test the conflict | Boot Hono and Postgres | Seed `createMemoryPageRepository` and save twice |

## Related concepts

Adapter, ISP, DIP

## Where in this repo

Todo and notes persistence ports (planned).

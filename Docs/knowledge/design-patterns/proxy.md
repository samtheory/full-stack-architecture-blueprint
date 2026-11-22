# Proxy pattern

## What it is

A **stand-in** for another object that controls access — authentication, caching, lazy loading, logging, or remote calls — while presenting the same interface.

## توضیح فارسی

**Proxy** به‌جای شیء واقعی می‌نشیند و دسترسی را کنترل می‌کند: کش، بارگذاری تنبل، یا بررسی مجوز. کلاینت همان متدها را صدا می‌زند؛ proxy تصمیم می‌گیرد آیا به شیء واقعی برود، از کش جواب بدهد، یا رد کند. با Decorator شباهت دارد؛ تمرکز Proxy بیشتر روی **کنترل دسترسی/هزینه** است تا افزودن مسئولیت کسب‌وکاری جدید.

## When to use

- Lazy load heavy resources (signed file URLs, large page trees)
- Cache or rate-limit an expensive dependency behind the same port
- Remote proxy over HTTP with the same interface as an in-process API

## When not to use

- You only need to add unrelated behavior (Decorator may be clearer)
- Caching rules belong in the repository implementation already

## Good practice

- Same interface as the real subject
- Explicit cache keys and TTL; never cache unauthorized data

## Bad / worst practice

- **Bad:** proxy that silently returns stale private data to the wrong user
- **Worst:** infinite proxy chains that obscure failures

## Trade-offs

Control and performance vs extra indirection and cache invalidation bugs.

## Real example — Signed attachment URLs + lazy Notion page

### Backend (Hono)

```ts
interface FileStorage {
  getSignedUrl(fileId: string, userId: string): Promise<string>;
}

class S3FileStorage implements FileStorage {
  async getSignedUrl(fileId: string, userId: string) {
    await assertCanRead(fileId, userId);
    return s3.getSignedUrl(fileId, { expiresIn: 60 });
  }
}

/** Proxy: cache signed URLs briefly; still enforces auth on miss */
class CachingFileStorage implements FileStorage {
  constructor(
    private readonly inner: FileStorage,
    private readonly cache: Map<string, { url: string; expiresAt: number }>,
  ) {}

  async getSignedUrl(fileId: string, userId: string) {
    const key = `${userId}:${fileId}`;
    const hit = this.cache.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.url;
    const url = await this.inner.getSignedUrl(fileId, userId);
    this.cache.set(key, { url, expiresAt: Date.now() + 30_000 });
    return url;
  }
}

const files: FileStorage = new CachingFileStorage(new S3FileStorage(), new Map());
```

### Frontend (React)

```tsx
/** Proxy-like hook: load page body only when the tab opens */
function useLazyPage(pageId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["page", pageId],
    queryFn: () => pagesApi.get(pageId),
    enabled, // stand-in: no network until the real subject is needed
  });
}

function PageTab({ pageId, active }: { pageId: string; active: boolean }) {
  const { data } = useLazyPage(pageId, active);
  if (!active) return <span>Page</span>;
  return <PageEditor page={data} />;
}
```

### Side-by-side

| Need | Direct subject | Proxy |
|------|----------------|-------|
| Repeat signed URL | New S3 call every time | Cache per user+file |
| Inactive tabs | Fetch all pages | Fetch only when `enabled` |

## Related concepts

Decorator, Repository, Facade

## Where in this repo

Teaching pattern for caching and lazy boundaries at the edges.

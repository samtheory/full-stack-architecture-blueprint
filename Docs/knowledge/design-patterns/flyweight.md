# Flyweight pattern

## What it is

Shares **common immutable state** (intrinsic) across many objects so memory stays low, while each object keeps its own extrinsic state (position, owner, count).

## توضیح فارسی

**Flyweight** دادهٔ مشترک و تغییرناپذیر را بین اشیاء زیاد **اشتراک** می‌گذارد تا حافظه کم شود. بخش مشترک (intrinsic) مثل تصویر ایموجی یا تعریف واکنش است؛ بخش بیرونی (extrinsic) مثل اینکه کدام کاربر در کدام پیام چه واکنشی گذاشته. در چت سازمانی با هزاران واکنش تکراری، نباید برای هر واکنش یک کپی از دارایی سنگین نگه دارید.

## When to use

- Huge numbers of similar objects (reactions, map markers, table cells)
- Intrinsic data is immutable and reused heavily

## When not to use

- Few instances — sharing costs more than it saves
- Mutable shared state (race conditions and UI bugs)

## Good practice

- Factory/cache returns the shared flyweight by key
- Keep extrinsic state outside the shared object

## Bad / worst practice

- **Bad:** mutable flyweight mutated by one user visible to others
- **Worst:** “flyweight” that still embeds per-user data

## Trade-offs

Memory savings vs more complex identity and lifecycle.

## Real example — Chat reactions

Thousands of messages use the same 20 emoji. The glyph/animation is shared; `{ messageId, userId }` is extrinsic.

### Backend (Hono)

```ts
type EmojiId = "thumbsup" | "heart" | "fire";

/** Intrinsic — shared */
class EmojiGlyph {
  constructor(
    readonly id: EmojiId,
    readonly imageUrl: string,
    readonly shortcode: string,
  ) {}
}

const emojiCatalog = new Map<EmojiId, EmojiGlyph>();
function getEmoji(id: EmojiId): EmojiGlyph {
  let glyph = emojiCatalog.get(id);
  if (!glyph) {
    glyph = new EmojiGlyph(id, `/static/emoji/${id}.webp`, `:${id}:`);
    emojiCatalog.set(id, glyph);
  }
  return glyph;
}

/** Extrinsic reaction row — points at shared glyph id */
type Reaction = { messageId: string; userId: string; emojiId: EmojiId };

app.get("/rooms/:roomId/messages/:messageId/reactions", async (c) => {
  const rows = await reactions.list(c.req.param("messageId"));
  return c.json(
    rows.map((row) => ({
      userId: row.userId,
      emoji: getEmoji(row.emojiId), // shared instances / catalog entries
    })),
  );
});
```

### Frontend (React)

```tsx
const glyphCache = new Map<string, { src: string; label: string }>();

function emojiFlyweight(id: string) {
  let glyph = glyphCache.get(id);
  if (!glyph) {
    glyph = { src: `/emoji/${id}.webp`, label: id };
    glyphCache.set(id, glyph);
  }
  return glyph;
}

function ReactionChip({ emojiId, count }: { emojiId: string; count: number }) {
  const glyph = emojiFlyweight(emojiId);
  return (
    <button type="button">
      <img src={glyph.src} alt={glyph.label} width={16} height={16} />
      {count}
    </button>
  );
}
```

### Side-by-side

| Scale | Without Flyweight | With Flyweight |
|-------|-------------------|----------------|
| 50k heart reactions | 50k copies of image metadata | One heart glyph + 50k light rows |
| New emoji pack | Reload everywhere ad hoc | Catalog factory grows by id |

## Related concepts

Factory, Composite

## Where in this repo

Teaching pattern for high-cardinality UI/domain tokens (emoji, icons, cells).

# 03 — Drizzle + Postgres

Status: not started

## Goal

Connect `clouds/market-place-server` to Postgres with **Drizzle ORM**, a first schema file, and migrations. No marketplace business logic yet beyond a minimal `listings` table you will use in step 04.

## Why Drizzle

| Choice | Why |
|--------|-----|
| Drizzle | Typed SQL-friendly DX; fits Bun/Node; good with Postgres |
| Schema in server `src/db` first | Fast start; extract `packages/db` later if mobile/worker share it |
| Migrations | Repeatable schema for you and teammates |

## Prerequisites

- [01-folder-structure](01-folder-structure.md) done
- [02-postgres-docker](02-postgres-docker.md) done — Postgres running
- `DATABASE_URL` set in `clouds/market-place-server/.env`

## Do this

### 1. Install deps (from repo root)

```bash
pnpm --filter @marketplace/market-place-server add drizzle-orm postgres
pnpm --filter @marketplace/market-place-server add -D drizzle-kit dotenv
```

- `postgres` = `postgres.js` driver (works well with Drizzle + Bun/Node)
- `drizzle-kit` = generate/apply migrations

### 2. Add Drizzle config

`clouds/market-place-server/drizzle.config.ts`:

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

Load env when running kit (Bun often loads `.env` automatically; if not, prefix commands or use dotenv).

### 3. Create client + schema

```ts
// src/db/client.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export function createDb(connectionString: string) {
  const client = postgres(connectionString);
  return drizzle(client, { schema });
}

export type Db = ReturnType<typeof createDb>;
```

```ts
// src/db/schema.ts
import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const listings = pgTable("listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  titleEn: text("title_en").notNull(),
  titleFa: text("title_fa").notNull(),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
```

FA/EN titles as columns keep the first slice simple; a `listing_translations` table can come later.

### 4. Scripts in `package.json`

```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

(Exact migrate command can be `drizzle-kit migrate` or a small `src/db/migrate.ts` — follow current Drizzle Kit docs for your installed version.)

### 5. Generate + migrate

```bash
pnpm --filter @marketplace/market-place-server db:generate
pnpm --filter @marketplace/market-place-server db:migrate
```

Confirm table exists:

```bash
docker compose -f infra/docker-compose.yml exec postgres \
  psql -U marketplace -d marketplace -c "\dt"
```

### 6. Wire db into `createApp` (composition root)

```ts
// sketch — adjust to your create-app.ts
import { createDb } from "./db/client";

const db = createDb(process.env.DATABASE_URL!);
const app = createApp({ corsOrigin, db });
```

Pass `db` into listing routes later (step 04). Do not import `createDb` inside every handler file forever — inject from the root.

## Good practice

- `DATABASE_URL` only from env
- Schema owns column names; API DTOs live in `@marketplace/contracts` (next/parallel)
- Fail fast at boot if `DATABASE_URL` is missing

## Bad practice

- Running raw SQL strings in route handlers with no schema
- Committing real passwords
- Creating every marketplace table in one migration before any API exists

## Acceptance

- [ ] Drizzle deps installed
- [ ] `src/db/client.ts` + `src/db/schema.ts` exist
- [ ] Migration applied; `listings` table visible in Postgres
- [ ] `createApp` can receive a `db` instance (even if listing still returns `[]`)

## Next

[04 — Listing vertical slice](04-listing-slice.md)

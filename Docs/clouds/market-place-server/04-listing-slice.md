# 04 — Listing vertical slice

Status: not started

## Goal

Ship the first real marketplace feature: **create and list listings** with English + Farsi titles, validated with Zod, persisted with Drizzle.

## Why this slice first

Listings are the core catalog unit. They teach:

- module routes → use case → repository
- FA/EN data without full i18n package yet
- contracts shared with a future React app

## Target flow

```text
HTTP POST /v1/listings
  → Zod validate (contracts or local schema)
  → createListing use case
  → listingsRepo.insert
  → JSON response

HTTP GET /v1/listings
  → listListings use case
  → listingsRepo.list
  → JSON response
```

## Suggested files inside `modules/listing`

```text
modules/listing/
  public.ts
  routes.ts
  create-listing.ts      # use case
  list-listings.ts       # use case
  listing.repository.ts  # port + drizzle impl (or split port/adapter)
```

Optional shared package (recommended soon):

- `@marketplace/contracts` with `createListingInput` / `listingDto`

## Do this (outline)

1. Define Zod input: `titleEn`, `titleFa` (non-empty strings).
2. `POST /v1/listings` — insert row, return created listing.
3. `GET /v1/listings` — return `{ items: [...] }`.
4. Map DB columns ↔ API fields in one place (repository).
5. Manual test with curl/httpie; then call from React when the app exists.

### Example curl

```bash
curl -X POST http://localhost:3090/v1/listings \
  -H "content-type: application/json" \
  -d "{\"titleEn\":\"Vintage lamp\",\"titleFa\":\"چراغ قدیمی\"}"

curl http://localhost:3090/v1/listings
```

## Good practice

- Route: validate → call use case → map errors
- Repository hides Drizzle from routes
- Stable error `code` in JSON later (`VALIDATION_ERROR`, etc.)

## Bad practice

- Drizzle queries copied into every route
- Float prices in this slice (add money columns only with integer minor units when you need them)
- Auth/permissions before create/list works at all (add identity next)

## Acceptance

- [ ] `POST /v1/listings` persists and returns a listing
- [ ] `GET /v1/listings` returns stored rows
- [ ] FA + EN titles round-trip correctly
- [ ] No SQL in `routes.ts`

## After this

Suggested order from the thinking doc:

1. `@marketplace/contracts` shared with the React app  
2. Identity (buyer/seller)  
3. Publish/draft status transitions  
4. Orders / payments much later  

Return to [README](README.md) for the path overview.

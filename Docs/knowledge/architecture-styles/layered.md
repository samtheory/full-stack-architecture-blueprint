# Layered architecture

## What it is

Organize code into technical layers (e.g. presentation → application → domain → infrastructure), typically calling **downward**.

## When to use

- Small/medium apps
- Team already thinks in controllers/services/repositories
- Teaching first separation of concerns

## When not to use

- Layers become dumping grounds (`service` does everything)
- You need multiple entry points with strong domain isolation (consider hexagonal)

## Good practice

- Dependencies point inward/down to domain
- Keep layers thin; name by responsibility

## Bad / worst practice

- **Bad:** domain calling UI helpers
- **Worst:** every feature touches all layers with copy-paste

## Trade-offs

Easy to explain; can encourage anemic “pass-through” services.

## Folder structure

Folders are cut by **technical job**. Every feature passes through the same four layers, and a layer calls the one below it. Presentation knows application. Application knows domain and the repository interface it uses. Infrastructure implements storage. Domain knows only its own rules.

The example is a small Notion-style API and editor: rename a page, and list comments. The product is still one app, so a technical cut is enough.

### Hono

**Why this tree.** A route, a service, a rule, and SQL change for different reasons. Putting them in four folders makes that split visible on day one, which matches how many teams already say “controller, service, repository.”

```text
apps/api/src/
  presentation/
    pages.route.ts                     # PATCH /pages/:id — Zod, status codes
    comments.route.ts                  # GET /pages/:id/comments
  application/
    page.service.ts                    # renamePage orchestrates the rule and the save
    comment.service.ts
  domain/
    page.ts                            # assertTitle: trimmed title required
    comment.ts
  infrastructure/
    postgres-page.repository.ts
    postgres-comment.repository.ts
  main.ts                              # infrastructure → services → routes
```

**Example.** `PATCH /pages/p1` with `{ "title": "  " }`. `pages.route.ts` parses the body. `page.service.ts` calls `assertTitle`. The empty title throws in `domain/page.ts`, and the route maps it to `400`. A real title is written in `postgres-page.repository.ts`. `main.ts` is the only file that constructs the repository and hands it to the service.

**Benefits**

- HTTP status codes live in `presentation`. SQL lives in `infrastructure`.
- `assertTitle` is a unit test with no Hono server and no database.
- A new hire can answer “where is the route?” and “where is the query?” from the folder names.

**Cost**

- Rename, share, and export all land in `page.service.ts`, so the service becomes the dumping ground.
- One product change is a horizontal slice across four folders, which makes the review harder to follow.
- The service often does nothing but forward arguments, because the interesting rule was never written down in `domain`.

### React

**Why this tree.** The same four jobs exist in the editor. The screen renders. A hook runs the submit. A pure function checks the title for fast feedback. An HTTP module owns `fetch`. Familiar aliases: presentation ≈ components, application ≈ hooks, infrastructure ≈ the API client.

```text
apps/web/src/
  presentation/
    page-editor.tsx                    # title input, error text, save button
    comment-list.tsx
  application/
    use-rename-page.ts                 # pending state, submit, map 400 to a message
    use-comments.ts
  domain/
    page-title.ts                      # assertTitle for the form, same rule as the API
  infrastructure/
    page-client.ts                     # fetch PATCH /pages/:id
    comment-client.ts
  main.tsx
```

**Example.** The editor submits `"Launch plan"`. `page-editor.tsx` reads the input and calls `use-rename-page`. The hook calls `assertTitle`, then `page-client.ts`. On `400` the hook sets the error string. The component renders that string next to the input. The API remains the authority for the rule; the copy in `domain/page-title.ts` exists so the field can fail before the round trip.

**Benefits**

- A visual change to the editor stays in `presentation`.
- The URL and headers stay in `page-client.ts`, so a second screen can rename a page through the same client.
- `assertTitle` is tested without rendering.

**Cost**

- A one-field form is spread across a component, a hook, a pure function, and a client. The hook often only forwards the click.
- Comments and pages duplicate the four-folder walk even when they share no rule.
- Once `page-editor.tsx` imports `page-client.ts` directly, the application layer is a folder nobody calls.

## Related concepts

Clean Architecture, SRP

## Where in this repo

Mental model for early vertical slice before introducing ports language.

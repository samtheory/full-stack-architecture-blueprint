# Clean architecture

## What it is

A dependency rule: source code dependencies point **inward** toward entities/use cases. Frameworks and DB are outer details. Closely related to hexagonal; different vocabulary and ring diagram.

## When to use

- Long-lived domain with changing delivery mechanisms
- Teams that want strict import rules

## When not to use

- Over-layering a simple feature into entities/use-cases/gateways/presenters when a function would do
- Cargo-cult folder names without dependency discipline

## Good practice

- Enforce import boundaries in ESLint/TS
- Map DTOs at the edges

## Bad / worst practice

- **Bad:** “clean” folders that still import Prisma in entities
- **Worst:** presenter/view-model ceremony with no UI complexity

## Trade-offs

Discipline and ceremony vs framework independence.

## Folder structure

Folders are the **rings**. Source imports point inward.

| Ring | Folder | May import |
|------|--------|------------|
| Entities | `entities/` | Other entities |
| Use cases | `use-cases/` | Entities and the ports declared beside the use case |
| Interface adapters | `interface-adapters/` | Use cases and entities. Maps DTOs at this ring |
| Frameworks | `frameworks/` | Interface adapters. Hono, React, `pg`, and `fetch` live here |

The example is chat: post a message, parse mentions in the entity, format a row for the screen in a presenter. This is the strict ring layout. This repo keeps the dependency rule and uses fewer names: `packages/domain`, `packages/application`, and the Hono or React edge.

### Hono

**Why this tree.** `post-message` is the application rule and should still compile if the HTTP library changes. The controller and the presenter are the mapping ring, so request JSON and response JSON stay out of the entity. `frameworks/hono` is the only folder allowed to import `hono`.

```text
apps/api/src/
  entities/
    message.ts                         # trim body, collect @mentions
  use-cases/
    post-message.ts                    # store, then publish MessagePosted
    ports/
      message-repository.ts
      message-events.ts
  interface-adapters/
    controllers/
      post-message.controller.ts       # request DTO → use case input
    presenters/
      message.presenter.ts             # entity → { id, body, mentionedUserIds }
    gateways/
      postgres-message.gateway.ts      # implements the repository port
      in-process-event.gateway.ts
  frameworks/
    hono/
      routes.ts                        # c.req.json, status codes, calls the controller
      main.ts                          # wires gateways into the use case
    postgres/
      pool.ts
```

**Example.** `POST /rooms/r1/messages` with `{ "body": " @sam deploy failed " }`. `frameworks/hono/routes.ts` reads the JSON and calls the controller. The controller trims nothing itself; it forwards the string. `entities/message.ts` trims and records `mentionedUserIds: ["sam"]`. The use case stores through the repository port and publishes. `message.presenter.ts` builds the JSON. The route sends `201`. A test of `post-message` supplies an in-memory gateway and asserts the publish happens after the insert.

**Benefits**

- ESLint can ban `hono` and `pg` outside `frameworks/`, and ban those folders from being imported by `entities/`.
- Replacing Hono means rewriting `frameworks/hono` and keeping the controller’s function signature.
- The HTTP shape can gain a field in the presenter while the entity stays the stored message.

**Cost**

- One POST is an entity, a use case, a controller, a presenter, and a gateway. That ceremony is wasted when the JSON is the entity.
- Teams copy the ring names and still import the database client from `entities/message.ts`.
- Presenters become a second model nobody asked to see.

### React

**Why this tree.** The same inward rule on the client. JSX and `fetch` are frameworks. The hook is the controller: it accepts the click and calls the use case. The presenter turns a message into the strings the bubble renders (`"just now"`). The entity keeps the mention rule and has no React import.

```text
apps/web/src/
  entities/
    message.ts                         # trim body, collect @mentions
  use-cases/
    send-message.ts
    ports/
      chat-api.ts
  interface-adapters/
    controllers/
      use-send-message.ts              # form event → use case → result state
    presenters/
      message-view-model.ts            # createdAt → "just now"
  frameworks/
    react/
      composer.tsx                     # textarea and button
      thread.tsx                       # renders view models
    http/
      fetch-chat-api.ts                # implements chat-api with fetch
  main.tsx                             # passes fetch-chat-api into the hook’s factory
```

**Example.** The user sends `"@sam deploy failed"`. `composer.tsx` calls `use-send-message`. The hook calls `send-message`, which uses `entities/message.ts` for mentions and `chat-api` to post. `thread.tsx` receives `message-view-model` rows and prints the label. `fetch` appears only in `frameworks/http/fetch-chat-api.ts`.

**Benefits**

- The mention rule is tested without a renderer.
- A redesign of the bubble edits `thread.tsx` and, if the label changes, the presenter.
- The hook’s test passes a fake `chat-api` and asserts the optimistic row.

**Cost**

- A textarea grows four rings. Most screens do not have a view model worth a file.
- The hook quietly absorbs fetching, formatting, and rules, and the rings exist only as folders.
- Sharing `entities/message.ts` with the API is a real package boundary; copying it into the React app creates two mention parsers.

## Related concepts

Hexagonal, DIP

## Where in this repo

We adopt the **dependency rule** without requiring every Uncle Bob folder name.

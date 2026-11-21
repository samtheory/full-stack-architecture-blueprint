# Examples

Cross-layer stories that will map to **web, mobile, API, and database** once the monorepo exists. Each example lists patterns taught, good/bad practice, and acceptance checks.

| Example | Teaches | Phase |
|---------|---------|-------|
| [vertical-slice-todo](vertical-slice-todo/README.md) | First end-to-end architecture | 1 |
| [auth-session](auth-session/README.md) | Strategy, security boundaries | 4 |
| [multi-db-notes](multi-db-notes/README.md) | Adapter/factory, vendor differences | 2–3 |
| [optimistic-ui-sync](optimistic-ui-sync/README.md) | Client sync, observer/invalidation | 4 |

## Rules for examples

1. Same domain operations for web and mobile where practical
2. No pattern without a reason in the story
3. Include “bad practice” anti-example notes (what not to do)
4. Runnable commands go in the example README when code lands

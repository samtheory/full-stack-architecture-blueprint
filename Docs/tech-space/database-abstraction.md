# Database abstraction

## What it is

A **port + adapters** design for persistence: one repository/port for a feature, three vendor adapters (libSQL, MariaDB, PostgreSQL).

## Design goals

1. Use cases do not import vendor SDKs
2. Adapters may use different SQL — that is expected
3. Capability differences are documented and tested, not papered over
4. Local DX: libSQL first (often easiest zero-Docker path — **verify** for your OS)

## Shape

```text
application: NotesRepository {
  create(input): Note
  list(userId): Note[]
  get(id): Note | null
  update(id, patch): Note
}

db: createNotesRepository(driver, client) → adapter
```

Optional: `createDb(config)` returns `{ driver, capabilities, client }` plus repositories.

## Capability flags (illustrative)

Do not invent runtime support — measure per driver during implementation:

| Flag | Why it matters |
|------|----------------|
| `returning` | Insert/update row return style |
| `json` | Native JSON vs text |
| `upsert` | Conflict strategy differs |
| `boolean` | Native bool vs tinyint |

## Good practice

- Contract tests: same suite runs against each adapter
- Migrations per vendor folder until a verified unified tool exists
- Keep transactions explicit at use-case or unit-of-work boundary

## Bad / worst practice

- One generic `query(sql, params)` leaked into domain
- Branching `if (driver === 'postgres')` inside use cases
- Claiming “works on all SQL databases” without tests
- Silent data coercion that changes meaning (bool ↔ 0/1 hidden)

## When to use multi-adapter

- Teaching ports/adapters and interview DB discussions
- Real need to support more than one engine

## When not to use

- Product locked to one engine with no teaching goal — one adapter is enough
- Premature “enterprise” data layer for a toy feature

## Related

- [../knowledge/design-patterns/adapter.md](../knowledge/design-patterns/adapter.md)
- [../knowledge/design-patterns/repository.md](../knowledge/design-patterns/repository.md)
- [../examples/multi-db-notes/README.md](../examples/multi-db-notes/README.md)
- [decisions/0002-database-adapters.md](decisions/0002-database-adapters.md)

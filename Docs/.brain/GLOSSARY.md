# Glossary

Shared vocabulary. Prefer these terms in docs and future code.

| Term | Meaning in this repo |
|------|----------------------|
| **Port** | Interface owned by the domain/application layer that outer code implements |
| **Adapter** | Concrete implementation of a port (HTTP, DB vendor, UI framework) |
| **Composition root** | Single place that wires dependencies (often `main` / app bootstrap) |
| **Use case / application service** | Orchestrates domain logic for one user intention |
| **Domain** | Business rules and entities; no Hono, React, or SQL drivers |
| **Vertical slice** | One feature cut through UI → API → persistence, kept small and runnable |
| **Boundary** | Explicit edge where frameworks stop and domain starts |
| **Driver** | Configured database engine selector (`libsql` / `mariadb` / `postgres`) |
| **Meaningful difference** | Vendor behavior we must not paper over (transactions, JSON, upsert, types) |
| **Interview-ready** | Explains trade-offs and alternatives, not only a happy-path demo |
| **Legacy section** | Clearly marked comparison material (e.g. React class lifecycles) |
| **God node** | Highly connected concept in the Graphify graph; start queries there |
| **ADR** | Architecture Decision Record — short decision + context + consequences |
| **FSD** | Feature-Sliced Design — frontend layers with downward-only imports |
| **Feature folder** | UI module owned by one user scenario with a public `index` API |
| **CWV** | Core Web Vitals (LCP, INP, CLS) — primary web UX performance metrics |
| **Waterfall** | Sequential awaits that delay paint (RSC or client fetch chains) |
| **a11y** | Accessibility — usable with keyboard, AT, and sensory constraints |
| **i18n** | Internationalization — locales, catalogs, `lang`, RTL-aware layout |
| **BFF** | Backend for Frontend — client-shaped façade; must not own domain invariants |
| **Auth UX** | Login/logout/redirect/error experience — not the security boundary |
| **Delivery shell** | Vite SPA, Next.js, or Capacitor host around shared React/contracts |
| **Capability flag** | Documented per-driver persistence feature (`returning`, `json`, `upsert`, `boolean`) |
| **Dialect** | Vendor-specific SQL — lives in adapters, not use cases |
| **Parameterized query** | Bound placeholders (`$1` / `?`) — never string-built user input |
| **libSQL** | SQLite-compatible client/engine used as the local-first adapter driver |
| **Expand/contract** | Additive schema change, then later removal — keeps old+new apps compatible |
| **EXPLAIN** | Database plan output showing how a query will (or did) run |
| **Composite index** | Multi-column index; leftmost equality columns first for typical filters |

## Naming conventions (planned TypeScript)

| Kind | Convention | Example |
|------|------------|---------|
| Packages | `@fsab/<name>` (TBD exact scope name) | `@fsab/domain` |
| Ports | `SomethingPort` or `ISomething` — pick one in ADR | `NotesRepository` |
| Adapters | `<Vendor><Port>Adapter` | `PostgresNotesAdapter` |
| Use cases | verb + noun | `createNote`, `listNotes` |
| Env vars | `SCREAMING_SNAKE` | `DATABASE_DRIVER` |

Final package scope name is an open decision — see `tech-space/decisions/`.

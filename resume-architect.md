# Resume — Software Architect course & agent

**Purpose:** continue this work on **another PC** without losing context.  
**Repo:** `https://github.com/samtheory/full-stack-architecture-blueprint.git`  
**Branch:** `main`

Update the **Progress** section whenever you finish a wave (before you push).

---

## Progress (keep current)

| Phase / wave | Status | Notes |
|--------------|--------|--------|
| Phase 0 — course scaffold | done | `Docs/course/` categories + PLAN |
| Phase 1.1 — foundations | done | FD-02 HTTP · FD-03 TypeScript · FD-05 Git · FD-06 Debugging |
| Phase 1.2 — system architecture | done | SA-01 · SA-02 · SA-03 · SA-10 · `knowledge-tracks.md` |
| Phase 1.3 — SA-14 C4 + ADR capstone | done | [`Docs/course/01-system-architecture/SA-14-capstone-c4-adr.md`](Docs/course/01-system-architecture/SA-14-capstone-c4-adr.md) |
| Phase 2.1 — Backend Hono/Bun | done | BE-01 · BE-02 · BE-03 |
| Phase 2.2 — validation / errors / auth | done | BE-04 · BE-05 · BE-06 |
| Phase 2.3 — composition / workers / versioning | done | BE-07 · BE-08 · BE-09 |
| Phase 2.4 — uploads / idempotency / tests / obs / Bun CTO | done | BE-10 … BE-14 — Phase 2 **complete** |
| Phase 3.1 — Frontend React foundations | done | FE-01 · FE-02 · FE-03 |
| Phase 3.2 — Next / RSC / forms | done | FE-04 · FE-05 · FE-06 |
| Phase 3.3 — FSD / performance / a11y | done | FE-07 · FE-08 · FE-09 |
| Phase 3.4 — BFF / auth UX / CTO SPA | done | FE-10 · FE-11 — Phase 3 ✅ [`Docs/course/03-frontend-react-next/`](Docs/course/03-frontend-react-next/README.md) |
| Phase 4.1 — SQL / Postgres / MariaDB | done | DB-01 · DB-02 · DB-03 |
| Phase 4.2 — libSQL / migrations / indexes | done | DB-04 · DB-05 · DB-06 |
| Phase 4.3 — transactions / port+adapters | done | DB-07 · DB-08 — [`Docs/course/04-data-stores/`](Docs/course/04-data-stores/README.md) |
| **Phase 4.4 — backups/HA / CTO engine pick** | **next** | Say: `implement Phase 4 wave 4.4` (DB-09 · DB-10) |
| Phase 5+ | pending | See [`Docs/course/PLAN.md`](Docs/course/PLAN.md) |

**Knowledge (architecture styles/patterns):** largely upgraded Dummy→CTO under `Docs/knowledge/` — study via [`Docs/knowledge/COURSE.md`](Docs/knowledge/COURSE.md) and [`Docs/course/01-system-architecture/knowledge-tracks.md`](Docs/course/01-system-architecture/knowledge-tracks.md).

---

## On the other PC — setup

### 1. Sync code

```bash
git clone https://github.com/samtheory/full-stack-architecture-blueprint.git
cd full-stack-architecture-blueprint
```

If the repo already exists:

```bash
cd full-stack-architecture-blueprint
git pull origin main
```

**Before leaving a PC:** commit + `git push origin main` so this file and lessons are on GitHub.

### 2. Open in Cursor

Open the repo root. Travels with git:

| Path | What |
|------|------|
| `.cursor/skills/software-architect/` | Architect agent skill |
| `.cursor/rules/software-architect.mdc` | When to act as architect |
| `.cursor/rules/architecture-docs.mdc` | Docs conventions |
| `Docs/course/` | Career curriculum + PLAN |
| `Docs/knowledge/` | Styles, patterns, SOLID |
| `resume-architect.md` | This handoff |

### 3. Optional — global skills (once per machine)

Project skill works without these. For richer help:

```bash
npx skills add mattpocock/skills@improve-codebase-architecture -g -y
npx skills add mattpocock/skills@codebase-design -g -y
npx skills add wshobson/agents@architecture-patterns -g -y
npx skills add spillwavesolutions/design-doc-mermaid@design-doc-mermaid -g -y
npx skills add softaworks/agent-toolkit@c4-architecture -g -y
```

Full catalog notes: `.cursor/skills/software-architect/reference.md`

### 4. Graphify (if you use codebase queries)

```bash
graphify update .
```

Orient via `Docs/.brain/INDEX.md`.

---

## How to continue in chat

Paste one of these:

```text
/software-architect continue from resume-architect.md
```

```text
Act as software architect. Read resume-architect.md and Docs/course/PLAN.md.
Implement Phase 4 wave 4.4.
```

Optional study:

```text
Read Docs/course/04-data-stores/DB-07 and DB-08 (transactions, port+adapters / ADR 0002).
```
---

## Canonical docs (don’t invent a second plan)

1. [`Docs/course/PLAN.md`](Docs/course/PLAN.md) — implementation waves  
2. [`Docs/course/README.md`](Docs/course/README.md) — category hub  
3. [`Docs/course/TRACKS.md`](Docs/course/TRACKS.md) — study paths  
4. [`Docs/knowledge/COURSE.md`](Docs/knowledge/COURSE.md) — architecture depth  
5. [`Docs/tech-space/project-blueprint.md`](Docs/tech-space/project-blueprint.md) — product shape  

---

## Stack defaults (do not silently replace)

pnpm + Turborepo · Next.js web · Capacitor mobile · Hono API · domain/application packages · DB port + adapters (libSQL / Postgres / MariaDB) · Docker Compose → K8s / Terraform later in course.

Teaching stance: **modular monolith** + vertical slices + hexagonal edges; microservices only when earned.

---

## Handoff checklist

**Leaving this PC**

- [ ] Lessons for the finished wave are on disk  
- [ ] Progress table in **this file** updated  
- [ ] `PLAN.md` wave status matches  
- [ ] `git add` · commit · `git push origin main`

**Arriving on the other PC**

- [ ] `git pull`  
- [ ] Read this file + `PLAN.md`  
- [ ] Open Cursor on repo root  
- [ ] Run architect prompt for the **next** wave  

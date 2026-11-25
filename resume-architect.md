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
| **Phase 1.3 — SA-14 C4 + ADR capstone outline** | **next** | Say: `implement Phase 1 wave 1.3` |
| Phase 2+ | pending | See [`Docs/course/PLAN.md`](Docs/course/PLAN.md) |

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
Implement Phase 1 wave 1.3.
```

Or jump ahead:

```text
/software-architect implement Phase 2 wave 2.1
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

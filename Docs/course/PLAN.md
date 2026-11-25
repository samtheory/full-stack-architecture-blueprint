# Course implementation plan

**Goal:** fill `Docs/course/` lesson-by-lesson without boiling the ocean.  
**Now:** category maps + this plan. **Next:** implement phases in order.

## Principles

1. **Plans before prose** — topic IDs stay stable; status moves `planned` → `complete`.
2. **Link > duplicate** — architecture styles/patterns stay in `Docs/knowledge/`.
3. **One wave per session** — finish a phase checklist before opening the next.
4. **Stack-first examples** — Hono/Bun, React/Next, Postgres/MariaDB/SQLite, Docker/K8s/Terraform, GHA.

---

## Phase 0 — Scaffold (done when this folder exists)

- [x] `Docs/course/` hub + categories
- [x] Topic maps per category
- [x] `TRACKS.md` study paths
- [x] Wire `.brain` + `Docs/README`

---

## Phase 1 — Foundations + System architecture wiring

**Outcome:** learner can navigate architecture knowledge + has typed foundations stubs.

| Wave | Work | Status |
|------|------|--------|
| 1.1 | Implement `00-foundations` lessons: TypeScript, HTTP/REST/JSON, Git, debugging | **done** — [FD-02](00-foundations/FD-02-http.md), [FD-03](00-foundations/FD-03-typescript.md), [FD-05](00-foundations/FD-05-git.md), [FD-06](00-foundations/FD-06-debugging.md) |
| 1.2 | `01-system-architecture`: SA-01/02/03/10 + knowledge tracks index | **done** — [SA-01](01-system-architecture/SA-01-what-architecture-is.md), [SA-02](01-system-architecture/SA-02-nfrs.md), [SA-03](01-system-architecture/SA-03-c4.md), [SA-10](01-system-architecture/SA-10-capacity.md), [knowledge-tracks](01-system-architecture/knowledge-tracks.md) |
| 1.3 | Capstone outline: “draw C4 of this blueprint” (SA-14) | pending |

**Exit criteria:** Track Foundations in TRACKS marked studyable; at least 4 foundation lessons `draft+`. → **met** (4× `complete`). Wave 1.2 adds architecture judgment lessons + knowledge wiring.

---

## Phase 2 — Backend (Hono / Bun)

| Wave | Topics (IDs) |
|------|----------------|
| 2.1 | `BE-01` Bun runtime · `BE-02` Hono hello · `BE-03` routing & middleware |
| 2.2 | `BE-04` validation (Zod) · `BE-05` error model · `BE-06` auth session/JWT |
| 2.3 | `BE-07` composition root · `BE-08` workers/queues · `BE-09` API versioning |
| 2.4 | `BE-10` performance · `BE-11` CTO: when Bun vs Node |

**Exit criteria:** learner can explain Hono pipeline matching `tech-space/backend-architecture.md`.

---

## Phase 3 — Frontend (React / Next.js)

| Wave | Topics |
|------|--------|
| 3.1 | `FE-01` React mental model · `FE-02` hooks & state · `FE-03` data fetching |
| 3.2 | `FE-04` Next App Router · `FE-05` RSC vs client · `FE-06` forms & mutations |
| 3.3 | `FE-07` FSD / feature folders · `FE-08` performance · `FE-09` a11y |
| 3.4 | `FE-10` BFF boundaries · `FE-11` CTO: SPA vs Next vs mobile shell |

---

## Phase 4 — Data stores

| Wave | Topics |
|------|--------|
| 4.1 | `DB-01` SQL core · `DB-02` Postgres essentials · `DB-03` MariaDB differences |
| 4.2 | `DB-04` SQLite/libSQL · `DB-05` migrations · `DB-06` indexing & EXPLAIN |
| 4.3 | `DB-07` transactions · `DB-08` port+adapters (link ADR 0002) |
| 4.4 | `DB-09` backups/HA · `DB-10` CTO: pick engine per environment |

---

## Phase 5 — Platform (Docker → K8s → Terraform)

| Wave | Topics |
|------|--------|
| 5.1 | `PL-01` containers · `PL-02` Dockerfile best practices · `PL-03` Compose local stack |
| 5.2 | `PL-04` networking/volumes · `PL-05` K8s mental model · `PL-06` Deployments/Services |
| 5.3 | `PL-07` Ingress/config/secrets · `PL-08` Terraform basics · `PL-09` modules & state |
| 5.4 | `PL-10` GitOps overview · `PL-11` CTO: Compose vs K8s vs PaaS |

---

## Phase 6 — CI/CD

| Wave | Topics |
|------|--------|
| 6.1 | `CI-01` pipeline anatomy · `CI-02` lint/type/test · `CI-03` build artifacts |
| 6.2 | `CI-04` environments · `CI-05` preview deploys · `CI-06` release strategies |
| 6.3 | `CI-07` monorepo pipelines (Turborepo) · `CI-08` supply chain security |
| 6.4 | `CI-09` CTO: DORA metrics & change fail rate |

---

## Phase 7 — Security + Observability + Quality

| Wave | Work |
|------|------|
| 7.1 | Security track: OWASP top risks for this stack, secrets, RLS/authz |
| 7.2 | Observability: structured logs, metrics, traces, SLOs |
| 7.3 | Testing pyramid for monorepo; contract tests; load basics |

---

## Phase 8 — Product delivery + Soft skills

| Wave | Work |
|------|------|
| 8.1 | Specs, ADRs, RFCs, estimation, incident command |
| 8.2 | Feedback, mentoring, stakeholder comms, conflict |
| 8.3 | Hiring loops & engineering culture notes |

---

## Phase 9 — CTO executive

| Wave | Work |
|------|------|
| 9.1 | Tech strategy, portfolio, build-vs-buy |
| 9.2 | Org design, staffing, vendor management |
| 9.3 | Cost/FinOps, risk, board narrative |
| 9.4 | Capstone: 6-month architecture + org plan for a marketplace |

---

## Suggested session cadence

| Session | Do |
|---------|----|
| A | Complete Phase 1.1 (4 foundation lessons) |
| B | Phase 2.1–2.2 backend |
| C | Phase 3.1–3.2 frontend |
| D | Phase 4.1–4.2 data |
| E | Phase 5.1–5.2 platform |
| F | Phase 6 CI/CD |
| G | Phase 7 cross-cutting |
| H | Phase 8–9 leadership/CTO |

Say **“implement Phase N wave X”** to write the next lesson files.

# Lesson ladder — Dummy → CTO

Every course lesson (when implemented) follows this depth. Same idea as [`../knowledge/_PAGE-TEMPLATE.md`](../knowledge/_PAGE-TEMPLATE.md).

| Level | Reader can… | Typical content |
|-------|-------------|-----------------|
| **1 · Dummy** | Point at a diagram and say why it exists | 1 Mermaid, 1 sentence why |
| **2 · Working** | Run / write a thin example in this stack | Folders, commands, worst vs best snippet |
| **3 · Rich** | Name failure modes and a test seam | Edge cases, observability hooks |
| **4 · CTO** | Decide adopt / defer / reject with cost | Trade-offs, ADR trigger, org/ops impact |

## Rules

- One job per lesson file.
- Map to **this monorepo** (`apps/`, `packages/`) when relevant.
- Diagram required for architecture, data flow, or infra topology.
- Soft-skill lessons: Dummy = scenario · Working = script/checklist · Rich = failure modes · CTO = org policy.

# Page template (dummy → CTO)

Use this shape for every new or upgraded page under `Docs/knowledge/`.
Keep one job per page. Prefer Mermaid. Map folders to **this monorepo**.

---

## Architecture style pages

```markdown
# {Name}

## One-line definition
## Problem it solves

## 1. Dummy — 30-second picture
One sentence why + one Mermaid box diagram (3–7 nodes).

## 2. When to use / when not
Bullets + fit table (SPA, Next.js, Hono, worker, marketplace, admin).

## Frontend, backend, or both?
How it maps to React / Next.js / Hono in this stack.

## 3. Working — folders and a thin vertical example
Core rules · dependency Mermaid · folder trees · TypeScript worst vs best.

## 4. Rich — seams, failures, tests
Ports/boundaries · failure modes · unit vs integration seams · anti-patterns.

## 5. Professional / CTO
Cost (team, ops, latency, money) · evolution path · ADR triggers ·
observability · what to automate (lint boundaries, CI).

## Common mistakes · Migration · Related · Where in this repo
```

## Design pattern / SOLID pages

```markdown
# {Name}

## What it is (+ توضیح فارسی for patterns)
## 1. Dummy — one diagram + one sentence
## 2. When / when not · Good · Bad
## 3. Working — Hono worst/best + React worst/best
## 4. Rich — structure Mermaid · edge cases · testing
## 5. CTO — overuse signals · alternatives · monorepo placement
## Related · Where in this repo
```

## Depth ladder

| Level | Reader can… |
|-------|-------------|
| Dummy | Point at the boxes and say why it exists |
| Working | Place files in the monorepo and write a thin example |
| Rich | Test without infra; name failure modes |
| CTO | Decide adopt/defer; write an ADR; cost the trade-off |

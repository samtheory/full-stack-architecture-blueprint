# Software Architect — skill pack reference

Installed via `npx skills` into `~/.agents/skills/` (Cursor-compatible).
PromptScript “global install failed” messages are safe to ignore if the skill
copied successfully.

## Core architecture

| Skill | Installs (approx) | Why |
|-------|-------------------|-----|
| [improve-codebase-architecture](https://skills.sh/mattpocock/skills/improve-codebase-architecture) | 1.3M | Deep modules, seams, refactor RFCs |
| [codebase-design](https://skills.sh/mattpocock/skills/codebase-design) | ~1M | Shared architecture vocabulary |
| [domain-modeling](https://skills.sh/mattpocock/skills/domain-modeling) | ~1M | Domain language / glossary / seams |
| [to-spec](https://skills.sh/mattpocock/skills/to-spec) | 850K | Spec from intent |
| [implement-spec](https://skills.sh/mattpocock/skills/implement-spec) | 400K | Spec → implementation |
| [architecture-patterns](https://skills.sh/wshobson/agents/architecture-patterns) | 26K | Clean / Hexagonal / DDD |
| [architecture-decision-records](https://skills.sh/wshobson/agents/architecture-decision-records) | 26K | ADR workflow |
| [guarding-architecture](https://skills.sh/riekelt/principal-engineer/guarding-architecture) | 28K | Protect boundaries |
| [microservices-patterns](https://skills.sh/wshobson/agents/microservices-patterns) | 14K | Service patterns |
| [nodejs-backend-patterns](https://skills.sh/wshobson/agents/nodejs-backend-patterns) | 51K | Node backend |
| [system-design](https://skills.sh/wondelai/skills/system-design) | 7K | Broad system design |
| [clean-architecture](https://skills.sh/wondelai/skills/clean-architecture) | 8K | Clean Architecture |
| [domain-driven-design](https://skills.sh/wondelai/skills/domain-driven-design) | 8K | DDD |

## Docs & diagrams

| Skill | Installs (approx) | Why |
|-------|-------------------|-----|
| [design-doc-mermaid](https://skills.sh/spillwavesolutions/design-doc-mermaid/design-doc-mermaid) | 109K | Mermaid design docs |
| [documentation-and-adrs](https://skills.sh/addyosmani/agent-skills/documentation-and-adrs) | 83K | Docs + ADRs |
| [write-tech-spec](https://skills.sh/warpdotdev/common-skills/write-tech-spec) | 30K | Tech specs |
| [architecture-blueprint-generator](https://skills.sh/github/awesome-copilot/architecture-blueprint-generator) | 12K | Blueprint docs |
| [c4-architecture](https://skills.sh/softaworks/agent-toolkit/c4-architecture) | 4K | C4 model |
| [mermaid-diagrams](https://skills.sh/softaworks/agent-toolkit/mermaid-diagrams) | 5K | Mermaid helpers |
| [archify](https://skills.sh/tt-a1i/archify/archify) | 196K | Standalone diagram/explainer HTML |

## Layer specialists

| Skill | Installs (approx) | Why |
|-------|-------------------|-----|
| [frontend-design](https://skills.sh/anthropics/skills/frontend-design) | 1.2M | Frontend craft |
| [supabase-postgres-best-practices](https://skills.sh/supabase/agent-skills/supabase-postgres-best-practices) | 498K | Postgres |
| [devops-engineer](https://skills.sh/jeffallan/claude-skills/devops-engineer) | 13K | DevOps |

## Optional next installs

```bash
npx skills add github/awesome-copilot@excalidraw-diagram-generator -g -y
npx skills add cathrynlavery/diagram-design@diagram-design -g -y
npx skills add jeffallan/claude-skills@architecture-designer -g -y
npx skills add wshobson/agents@multi-cloud-architecture -g -y
npx skills add vercel-labs/agent-skills@react-best-practices -g -y
```

## How to invoke

In Cursor chat:

- `@software-architect` or mention “act as software architect”
- Or: “use the software-architect skill to …”

Course track (later): teach styles from dummy → CTO using the teaching ladder
in `SKILL.md`, writing into `Docs/knowledge/` and `Docs/walkthrough/`.

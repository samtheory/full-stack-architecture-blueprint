# Software Architect — example prompts

## Design & docs

- Act as software architect: draft an ADR for switching listing search to CQRS read models.
- Write a tech architecture doc for marketplace listing + order flow with C4 container + sequence diagrams.
- Update `architecture-rules.md` with enforceable bans for the new billing module.

## Teach (course ladder)

- Teach Hexagonal Architecture from dummy → this monorepo → CTO trade-offs; put it in `Docs/knowledge/architecture-styles/hexagonal.md`.
- Expand the Repository pattern page with a toy example then `packages/db` adapter mapping.

## Diagrams

- Draw C4 context + container for apps/web, apps/api, packages/domain, packages/db.
- Add Mermaid sequence for create-listing happy path and failure path.

## Implement

- Turn the modular-monolith rules into walkthrough step wiring for a vertical slice.
- Spec then implement-spec: add postgres adapter for notes example without leaking ORM into domain.

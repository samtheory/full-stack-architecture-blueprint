# Monorepo structure

## What it is

A pnpm workspace where **apps are deployable edges** and **packages hold shared rules and adapters**.

## When to use this shape

- Multiple clients (web + mobile) share domain and contracts
- You want clear import boundaries for teaching DIP
- You need independent test targets per package

## When not to use

- A single tiny script or one-page demo
- When the team cannot maintain workspace tooling

## Good practice

- Apps depend on packages; packages never depend on apps
- `domain` and `application` depend on nothing framework-specific
- Put composition roots only in apps (`createApp`, Next entry, Capacitor entry)
- Enforce boundaries with ESLint `no-restricted-imports` (planned)

## Bad / worst practice

- Importing `apps/api` from `apps/web`
- Putting SQL inside React components
- A `packages/utils` junk drawer with mixed concerns
- Creating a package only to showcase a pattern name

## Proposed dependency direction

```text
web / mobile / api
    ↓
ui / contracts / config / application / db
    ↓
domain
```

`db` adapters may use vendor SDKs; `application` only sees ports.

## Related

- [project-blueprint.md](project-blueprint.md)
- [../knowledge/solid/dip.md](../knowledge/solid/dip.md)
- [decisions/](decisions/README.md)

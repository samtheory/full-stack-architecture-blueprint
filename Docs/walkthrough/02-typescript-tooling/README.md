# 02 — TypeScript tooling

Status: not started

## Goal

Add **shared TypeScript, ESLint, Prettier, and Vitest baselines** so every package uses the same strictness and scripts.

## Why this decision

| Choice | Why |
|--------|-----|
| **TypeScript strict** | Shared contracts across web/mobile/API; catches boundary mistakes early |
| **Shared `tsconfig` bases** | Avoid drifting compiler options per package |
| **ESLint + Prettier** | Lint for correctness/boundaries; Prettier for format only |
| **Vitest at root/packages** | Fast ESM-friendly unit tests ready before domain code grows |

WHY now (before domain code): fixing tooling after five packages exist is painful; boundaries (restricted imports) should exist before people violate them.

## Alternatives considered

| Alternative | Why not now |
|-------------|-------------|
| Biome-only | Attractive all-in-one; verify a11y + `no-restricted-imports` story before replacing ESLint |
| Per-package bespoke configs | Guarantees inconsistency |
| Jest | Fine; more config friction with ESM monorepos |

## Prerequisites

- Step 01 complete (`pnpm install` works)
- Package scope decided (`@fsab/*` or ADR update)

## Commands

```bash
# Root dev tooling (versions: install latest stable and pin lockfile)
pnpm add -Dw typescript prettier eslint vitest @types/node

# Often also (verify names/versions at install time):
pnpm add -Dw eslint-config-prettier typescript-eslint
```

Suggested layout:

```text
tooling/typescript/     # tsconfig.base.json
tooling/eslint/         # shared eslint config package (optional but recommended)
# or packages/typescript-config, packages/eslint-config
```

Root scripts should already call `turbo run lint|typecheck|test`.

Example base `tsconfig` ideas (adapt, do not copy blindly):

- `"strict": true`
- `"noUncheckedIndexedAccess": true` (recommended for teaching)
- composite/paths deferred until packages export correctly

```bash
pnpm exec tsc -v
pnpm exec prettier --version
pnpm lint          # may no-op until packages define lint
pnpm typecheck     # may no-op until packages define typecheck
```

Add `.prettierrc` / `.prettierignore` and wire `format` script:

```bash
pnpm exec prettier --write "Docs/**/*.md"   # optional; decide if Docs are formatted
```

## What to create

| Path | Purpose |
|------|---------|
| `tooling/typescript/tsconfig.base.json` | Shared compiler options |
| ESLint flat config (root or package) | Lint + later import boundaries |
| Prettier config | Formatting |
| `vitest` workspace config (root or per package) | Test runner ready |
| Each stub package: `"typecheck"`, `"lint"` scripts | Turbo can orchestrate |

## Good practice

- One Prettier config for the repo
- Packages extend the base tsconfig; do not fork `strict`
- Plan ESLint `no-restricted-imports` for `domain` forbidding `hono`/`react`/`pg` (can enable in step 03)

## Bad / worst practice

- `"strict": false` “just for now”
- Different indent rules per app
- Adding five meta-framework plugins before any app exists

## Acceptance criteria

- [ ] Shared TS base config exists and at least one package extends it
- [ ] Prettier runs without conflicting with ESLint (eslint-config-prettier or equivalent)
- [ ] Root `pnpm typecheck` / `pnpm lint` / `pnpm test` are defined (even if some packages are stubs)
- [ ] TypeScript version pinned via lockfile

## Agent prompt

```text
Implement Docs/walkthrough/02-typescript-tooling only.
Add shared TypeScript, ESLint, Prettier, and Vitest baselines for the monorepo.
Do not implement domain logic or apps yet.
Follow the step README; pin real versions.
```

## Next step

[03 — Domain package](../03-domain-package/README.md)

## Related

- [../../tech-space/tooling.md](../../tech-space/tooling.md)
- [../../tech-space/decisions/0001-monorepo-tooling.md](../../tech-space/decisions/0001-monorepo-tooling.md)

# Tooling stack

## Recommendations (with why)

| Tool | Role | Why | Alternative considered |
|------|------|-----|------------------------|
| **pnpm** | Package manager | Fast, strict hoisting, first-class workspaces | npm (weaker isolation), yarn (fine, less preferred here) |
| **Turborepo** | Task graph / cache | Simple `turbo run build test lint` | Nx (heavier), Lage |
| **TypeScript strict** | Language | Shared safety across edges | JS-only (rejected for this repo) |
| **ESLint** | Lint | Enforce boundaries and a11y hooks | Biome (verify monorepo maturity when choosing) |
| **Prettier** | Format | Consistent Markdown/TS | Biome format (possible later unification) |
| **Vitest** | Unit/integration | ESM + speed in monorepos | Jest (more config friction) |
| **Playwright** | E2E | Stable web E2E | Cypress |
| **Zod** | Runtime validation | Contracts at API edge | Valibot / ArkType (viable alternatives) |
| **pino** | API logging | Structured, fast | winston |
| **tsup/unbuild** | Package build | TBD via ADR | tsc project references only |

## Good practice

- One `turbo.json` pipeline; packages declare `^build` dependencies correctly
- Shared ESLint/TSConfig packages to avoid drift
- `pnpm` scripts mirrored: `dev`, `test`, `lint`, `typecheck`, `format`

## Bad practice

- Different formatters per app
- Skipping typecheck in CI
- Inventing custom CLI wrappers before Turborepo is insufficient

## Needs verification

- Biome as ESLint+Prettier replacement for this monorepo size
- Capacitor-friendly library compile format (ESM)
- Exact Node LTS version for CI

## Related

- [project-blueprint.md](project-blueprint.md) §2
- [decisions/0001-monorepo-tooling.md](decisions/0001-monorepo-tooling.md)

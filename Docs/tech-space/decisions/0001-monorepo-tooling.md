# 0001 — Monorepo tooling

Status: Proposed  
Date: 2026-11-21

## Context

We need workspaces for web, mobile, API, and shared packages with simple scripts and CI caching.

## Decision

Use **pnpm** workspaces + **Turborepo** + **TypeScript** + **ESLint** + **Prettier** + **Vitest** + **Playwright**.

## Alternatives considered

| Option | Why not first |
|--------|----------------|
| Nx | More generators/concepts than this teaching repo needs |
| npm workspaces | Weaker isolation and slower installs typically |
| Biome-only | Attractive; verify ESLint boundary rules + a11y ecosystem first |

## Consequences

- Low ceremony pipelines
- Contributors must install pnpm
- Shared configs live under `tooling/` or `packages/*-config`

## Needs verification

- Node LTS version pin
- Turborepo + Capacitor watch/dev UX

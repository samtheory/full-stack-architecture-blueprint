# 14 — Auth session

Status: not started

## Goal

Implement the **auth session example**: register/login/logout, session port + strategy, protected Todo routes, and security baseline (HttpOnly cookies or documented token approach, CSRF plan for cookies, log redaction).

## Why this decision

| Choice | Why |
|--------|-----|
| Strategy behind a port | OCP/DIP teaching without Nest guards magic |
| After multi-client | Auth must work for web (and plan for mobile storage) |
| Explicit security notes | Portfolio/interview credibility |

## Alternatives considered

| Alternative | Why not first |
|-------------|---------------|
| Full OAuth provider matrix | Scope explosion |
| Auth.js/Next-only | Couples auth to web framework edge |

## Prerequisites

- Steps 09–13 reasonably stable
- Read [../../examples/auth-session/README.md](../../examples/auth-session/README.md)
- Read [../../tech-space/security-observability.md](../../tech-space/security-observability.md)

## Commands

```bash
# Add only libraries you actually choose after reading current docs
# e.g. cookie signing, password hashing (argon2/bcrypt) — verify packages

pnpm --filter @fsab/api test
pnpm exec playwright test   # include login smoke when ready
```

## What to create

| Path | Purpose |
|------|---------|
| Auth port + strategies | Session vs bearer (if both, keep small) |
| User/session persistence adapters | Per DB or start libSQL |
| Login UI web (+ mobile later) | Forms + a11y |
| Protected routes middleware | API |
| Docs update | Threat model lite + how to run |

## Good practice

- Hash passwords; never log them
- Server verifies every protected request
- Document cookie vs token trade-offs honestly

## Bad / worst practice

- Client-only “auth context” as security
- JWT secret in frontend env
- Rolling custom crypto

## Acceptance criteria

- [ ] Unauthenticated writes to Todos fail
- [ ] Login/logout flow works on web against API
- [ ] Tests cover unauthorized + happy path
- [ ] Example doc marked implemented with file links

## Agent prompt

```text
Implement Docs/walkthrough/14-auth-session only.
Add session-based (or documented token) auth with a strategy port, protect Todo writes,
and update security docs. Do not expand into full OAuth providers.
Verify any crypto/cookie libraries against current docs.
```

## Next step

[15 — Optimistic UI sync](../15-optimistic-ui-sync/README.md)

## Related

- [../../knowledge/design-patterns/strategy.md](../../knowledge/design-patterns/strategy.md)
- [../../examples/auth-session/README.md](../../examples/auth-session/README.md)

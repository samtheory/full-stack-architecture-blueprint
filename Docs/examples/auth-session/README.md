# Example: Auth session

## What it is

Login/logout/session verification demonstrating a **Strategy** behind an auth port, plus security baseline (HttpOnly cookies or documented tokens, CSRF plan, log redaction).

## When to use

- After the Todo slice works
- Teaching “security at the edge, rules in domain”

## When not to use

- Phase 1 — do not block the first vertical slice on full auth

## Good practice

- Auth strategy selected in composition root
- Session store behind a port (memory/DB)
- Never log raw passwords or tokens

## Bad / worst practice

- **Bad:** JWT secret in the client bundle
- **Worst:** “auth” only as a React context with no server verification

## Patterns

Strategy, DIP, Adapter (cookie/header)

## Related concepts

Auth Session Example, Security & observability

## Where in this repo

Phase 4 in the blueprint — docs only for now.

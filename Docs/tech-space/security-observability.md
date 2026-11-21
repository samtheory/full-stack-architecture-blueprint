# Security, accessibility, observability

Designed in from phase 1 — not bolted on after demos look good.

## Security (baseline)

| Topic | Approach |
|-------|----------|
| Input | Validate at API edge; parameterized SQL only |
| Secrets | Env vars; never commit `.env`; redact in logs |
| HTTP | Security headers middleware; tight CORS for known web origins |
| Auth (later) | HttpOnly cookies or documented token strategy; CSRF plan for cookie auth |
| Dependencies | Lockfile + CI audit (tool TBD) |

**Bad:** logging Authorization headers. **Worst:** string-built SQL.

## Accessibility

- Semantic HTML in `packages/ui`
- Labeled inputs, keyboard focus, contrast
- eslint-plugin-jsx-a11y (planned) + Playwright a11y checks on critical flows

## Observability

- `requestId` on every API log line and error response (correlation)
- Structured logs (level, route, status, duration)
- Health endpoint for API process
- Avoid PII in log fields by default

## Good practice

- Fail closed on missing auth for protected routes
- Explicit public vs protected route lists

## Bad practice

- “Debug” endpoints in production builds
- Silent catch blocks that swallow errors

## Related

- [backend-architecture.md](backend-architecture.md)
- [../examples/auth-session/README.md](../examples/auth-session/README.md)

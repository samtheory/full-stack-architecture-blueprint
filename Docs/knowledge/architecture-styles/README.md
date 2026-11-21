# Architecture styles

Styles are **organizational patterns for the whole system**, not drop-in libraries. This repo demonstrates several and explains **when each fits**. None is universally best.

| Style | Page | One-line fit |
|-------|------|--------------|
| Layered | [layered.md](layered.md) | Simple apps with clear technical layers |
| Hexagonal | [hexagonal.md](hexagonal.md) | Domain isolated from UI/DB/HTTP |
| Clean | [clean.md](clean.md) | Strict dependency rule toward domain |
| Modular monolith | [modular-monolith.md](modular-monolith.md) | One deployable, strong module boundaries |
| Microservices | [microservices.md](microservices.md) | Independent deploy/scale — costly |

**This repo’s default teaching stance:** modular structure with hexagonal ports/adapters at persistence and HTTP edges — still one (or few) deployables unless a lesson needs services.

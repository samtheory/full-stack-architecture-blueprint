# Observer pattern

## What it is

Dependents (**observers**) get notified when a subject’s state changes. In UI stacks this often appears as store subscriptions, event emitters, or query cache invalidation.

## When to use

- Optimistic UI that must refresh multiple views after mutation
- Domain events inside a process (carefully)

## When not to use

- Direct call is enough and clearer
- Cross-service “events” without delivery guarantees pretending to be Observer

## Good practice

- Explicit subscriptions and teardown (avoid leaks)
- Keep domain notifications framework-agnostic if used

## Bad / worst practice

- **Bad:** silent global bus with stringly-typed events everywhere
- **Worst:** observers performing more writes that re-enter the subject unboundedly

## Trade-offs

Decoupling vs harder-to-follow control flow.

## Related concepts

Optimistic UI Sync Example

## Where in this repo

Client cache invalidation / sync example (planned).

# Microservices

## What it is

Independently deployable services, usually with separate data and network boundaries.

## When to use

- Independent scale/release cadence is a real requirement
- Clear bounded contexts and platform maturity (observability, CI/CD)
- Organizational ownership aligns with services

## When not to use

- Early-stage learning repo or small team
- Splitting for resume-driven development
- When you cannot operate distributed tracing, auth, and failure modes

## Good practice

- Split only with proven module boundaries (often after modular monolith)
- Own data per service; explicit contracts

## Bad / worst practice

- **Bad:** nanoservices per entity with chatty HTTP
- **Worst:** shared DB + distributed deploys (distributed monolith)

## Trade-offs

Autonomy and scale vs complexity, latency, and operational cost.

## Related concepts

Modular Monolith

## Where in this repo

Documented for contrast; **not** the default implementation target for early phases.

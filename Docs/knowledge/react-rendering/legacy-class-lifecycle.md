# Legacy class lifecycle (comparison only)

> **LEGACY / COMPARISON SECTION**  
> Not the default for this repository. Included so interviews can map old names to modern equivalents.

## What it is

Class components used methods like `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, and older unsafe APIs (`componentWillMount`, etc.).

## Rough mapping

| Legacy | Modern direction |
|--------|------------------|
| `componentDidMount` | `useEffect(() => { ... }, [])` or framework data APIs |
| `componentDidUpdate` | `useEffect` with deps; often rethink derived state |
| `componentWillUnmount` | Effect cleanup function |
| `shouldComponentUpdate` | `React.memo`, careful props, compiler tooling where used |
| `componentDidCatch` | Error boundaries (still class-based or specialized libraries) |

## When to use

- Maintaining legacy codebases
- Interview questions that use old terminology

## When not to use

- Any new feature in this monorepo

## Good practice

- Translate questions to hooks/server-centric answers
- Note which lifecycles are deprecated/unsafe

## Bad / worst practice

- Starting a 2026 learning repo with class components as the happy path
- Mixing deprecated lifecycles into new examples “for completeness”

## Trade-offs

Historical literacy vs confusing newcomers about what to write today.

## Related concepts

React Modern Rendering Model

## Where in this repo

Docs only — no class-based feature demos planned.

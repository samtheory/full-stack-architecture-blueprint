# React modern rendering model

## What it is

UI is a function of state/props. React **renders** (computes element trees), **commits** to the DOM, and may **re-render** when state/props/context change. Hooks (`useState`, `useEffect`, `useEffectEvent`, etc.) express state and side effects in function components. In Next.js App Router, **Server Components** run on the server by default; **Client Components** opt into interactivity with `"use client"`.

## When to use

- All new React code in this repository
- Teaching data fetching, forms, and optimistic UI

## When not to use

- N/A as the default — prefer this model

## Good practice

- Keep render pure; put side effects in effects or event handlers
- Prefer deriving values during render over syncing state in effects when possible
- Explicit Client Components only where needed
- Understand that effects run after commit; cleanup matters

## Bad / worst practice

- **Bad:** fetching in `useEffect` without handling race/cancellation when a library or server approach is better
- **Worst:** mutating props/state during render, or teaching class lifecycles as the default path

## Trade-offs

Hooks rules and mental model take practice; Server/Client split adds a boundary to learn.

## Related concepts

Separation of UI and Domain, Optimistic UI Sync

## Where in this repo

Web and mobile React apps (planned); contrast page: [legacy-class-lifecycle.md](legacy-class-lifecycle.md)

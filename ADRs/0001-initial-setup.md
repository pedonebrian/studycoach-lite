# ADR 0001: Initial Setup

## Status
Accepted

## Context
We need a starting point that balances speed of iteration with production-grade practices. The goal is to showcase staff-level decision making on a small, public project.

## Decision
- Use **Next.js App Router** with **TypeScript** for strong typing and future-proof routing.
- Use **Redux Toolkit** for app/UI state and **TanStack Query** for server state.
- Use **shadcn/ui** + **Radix primitives** for accessibility and consistent design.
- Start with a **mock AI provider**; allow pluggable providers (OpenAI, Claude, etc).
- Add Storybook, tests, and ADRs from day 1 to demonstrate engineering discipline.

## Consequences
- Allows fast iteration but shows how we separate concerns (UI vs server state).
- Accessibility is baked in (Radix primitives).
- CI/CD setup will include lint, typecheck, tests, and Lighthouse perf budgets.
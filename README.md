# TeddyPups U.A.E. — website clone

A faithful rebuild of [puppy.instabizweb.com](https://puppy.instabizweb.com/) in **Next.js, React and TypeScript**: every page, the illustrated design system, scroll scenes and forms.

## Tech stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with theme tokens + layered component CSS
- **zustand** for shared UI state (menu, lightbox, curtain)
- **next/font** — Fraunces, Figtree, Shantell Sans

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build (all pages prerendered) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
docs/            planning: aim, tasks, design context, architecture, PR plan, QA
public/          brand assets, cursors, media
src/
  app/           routes + API
  components/    layout · home · puppies · puppy · families · faq · how · contact · illustrations · ui
  data/          typed content
  lib/           helpers, site constants, validation
  store/         zustand stores
  styles/        component-layer CSS by area
  types/         shared types
```

## Planning docs

| Doc | Purpose |
|---|---|
| [Aim](docs/Aim.md) | Definition of done |
| [Tasks](docs/tasks.md) | Live progress tracker |
| [Context](docs/context.md) | Measured colours, type, spacing, motion |
| [Architecture](docs/architecture.md) | Stack and folder layout |
| [PR plan](docs/pr-plan.md) | Milestones and PR template |
| [Decisions](docs/decisions.md) | Why things are the way they are |
| [QA checklist](docs/qa-checklist.md) | Walked before every PR |

## Credits

Content, photos and brand belong to TeddyPups U.A.E. and are used here only for this assessment.

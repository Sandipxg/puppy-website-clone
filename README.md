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

## Pages

| Route | What's there |
|---|---|
| `/` | Hero with puppies peeking over a quilt · pinned street of doors · signpost & flight · WhatsApp phone story · puppy passport · dusk photo wall · starry FAQ · porch — with Teddy walking you through it |
| `/puppies` | Sketchbook cards with URL filters (where / breed / boy or girl) + gone-home strip |
| `/puppies/[slug]` | 42 storybook profiles: gallery + viewer, details tag, way home, enquiry letter, prev/next |
| `/gone-home` | "Admit one" tickets |
| `/happy-families` | 64-photo polaroid wall with viewer |
| `/how-it-works` | In Dubai / Imported switch, promise stamps, delivery, why us |
| `/faq` | Corkboard notes with live search |
| `/contact` | Fill-in-the-blanks letter that gets posted |

## Environment

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute URL for metadata, sitemap and robots |
| `ENQUIRY_WEBHOOK_URL` | Optional — enquiries are POSTed here as JSON (otherwise logged) |

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
| [QA report](docs/qa-report.md) | Latest parity and behaviour results |
| [Pull requests](docs/pull-requests/) | Title + description for every PR |

## Credits

Content, photos and brand belong to TeddyPups U.A.E. and are used here only for this assessment.

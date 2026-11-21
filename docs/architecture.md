# Architecture

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router, Turbopack) | File-based routing, static generation for every page, `next/image` and `next/font` |
| UI | React 19 + TypeScript (strict) | Typed props and data end to end |
| Styling | Tailwind CSS v4 + layered component CSS | Tokens in `@theme`; bespoke illustrated pieces in `src/styles/*` |
| Client state | zustand | Tiny store for cross-component UI state (menu, lightbox, chat widget) without prop drilling or context re-renders |
| Fonts | `next/font/google` | Fraunces (display), Figtree (body), Shantell Sans (handwritten) — self-hosted, no layout shift |

## Folder structure

```
docs/                     planning: aim, tasks, context, PR plan, QA, decisions
public/
  brand/                  logo
  media/                  puppy, family and showroom photos/videos
src/
  app/                    routes (one folder per page) + api/enquiry, sitemap, robots
  components/
    layout/               Header, MobileMenu, Footer, ActionBar
    home/                 one component per home-page section
    puppies/  puppy/      listing + profile pieces
    families/ faq/ how/ contact/
    illustrations/        inline SVG mascot, icons, decorative shapes
    ui/                   shared primitives (Button, Photo, Lightbox, Reveal…)
  data/                   typed content (puppies, families, faq)
  lib/                    data access, site constants, validation, helpers
  store/                  zustand stores
  styles/                 component-layer CSS split by area
  types/                  shared TypeScript types
```

## Rendering model

- **Server components by default.** Client components only where there is state or browser APIs (menu, filters, galleries, scroll scenes, forms).
- Every route is statically generated; puppy profiles via `generateStaticParams`.
- Filters are encoded in the URL so they are shareable and back-button friendly.

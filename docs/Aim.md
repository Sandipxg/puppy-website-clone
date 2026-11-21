# Aim

## Ultimate goal

Build a **pixel-faithful, behaviour-faithful clone** of [puppy.instabizweb.com](https://puppy.instabizweb.com/) (TeddyPups U.A.E.) in **Next.js + React + TypeScript**, written from scratch, with a clean codebase that reads like a real production project.

We are done only when **all** of the following are true:

1. **Every route exists** and matches the reference: `/`, `/puppies`, `/puppies/[slug]`, `/gone-home`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, plus a 404 page.
2. **Visual parity** at desktop (1440px) and phone (390px): same layout, spacing, colours, typography, illustrations, imagery and copy. Side-by-side screenshots are indistinguishable at a glance.
3. **Behaviour parity**: header/mobile menu, scroll scenes and reveals, carousels, filters, galleries and lightboxes, FAQ accordion and search, forms with validation, WhatsApp/call actions.
4. **Quality bar**: `tsc`, `eslint` and `next build` pass clean; no console errors; no horizontal overflow; keyboard accessible; `prefers-reduced-motion` respected.
5. **Traceable history**: work lands through small, well-described pull requests, one milestone each (see [`pr-plan.md`](./pr-plan.md)).

## Non-goals

- Shipping the reference's built bundles. Every component and stylesheet lives here as readable source.
- A CMS or real backend. Content lives in typed local data; the enquiry endpoint validates and logs.

## How we keep ourselves honest

- [`tasks.md`](./tasks.md) is the single source of truth for what is done and what is next.
- [`context.md`](./context.md) holds every measured token (colours, fonts, sizes, breakpoints) so nothing is eyeballed twice.
- [`qa-checklist.md`](./qa-checklist.md) is walked before every PR is opened.

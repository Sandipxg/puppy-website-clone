# Pull request plan

Each milestone ships as its own branch and PR into `main`. PRs are kept small enough to review in one sitting and are opened in order, so the history reads as a timeline of the build.

| # | Branch | Title | Scope |
|---|--------|-------|-------|
| 1 | `chore/project-setup` | chore: scaffold Next.js app and planning docs | Next 16, React 19, TS, Tailwind v4, ESLint, zustand; `docs/` planning set |
| 2 | `feat/design-system` | feat: design tokens, fonts, content data and media | Theme tokens, next/font, typed data layer, media library |
| 3 | `feat/layout-shell` | feat: site header, mobile menu, footer and action bar | Global chrome, skip link, UI store |
| 4 | `feat/home-hero` | feat(home): hero with puppy arches and fence | Hero scene, mascot illustration |
| 5 | `feat/home-meet-the-pups` | feat(home): meet the pups and two ways home | Horizontal street, signpost cards |
| 6 | `feat/home-journey-to-porch` | feat(home): journey, passport, trust, families, FAQ, porch | Remaining home scenes |
| 7 | `feat/puppies` | feat(puppies): listing with filters and puppy profiles | `/puppies`, `/puppies/[slug]`, `/gone-home` |
| 8 | `feat/families-how-faq` | feat: happy families, how it works and FAQ pages | Lightbox, tabs, accordion + search |
| 9 | `feat/contact` | feat(contact): enquiry forms and API route | Validation shared by client and `/api/enquiry` |
| 10 | `chore/qa-polish` | chore: responsive QA, a11y and SEO polish | Visual diff fixes, metadata, sitemap, robots |

## PR description template

```
## What
One paragraph on what this PR adds.

## Why
Which part of the reference it reproduces / which goal in Aim.md it moves.

## How
Key implementation notes and decisions.

## Screenshots
Desktop 1440 / phone 390.

## Checklist
- [ ] tsc, lint, build pass
- [ ] Matches reference at 1440 and 390
- [ ] Keyboard + reduced motion checked
- [ ] tasks.md updated
```

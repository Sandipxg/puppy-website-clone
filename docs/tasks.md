# Tasks

Live tracker. `[x]` done · `[~]` in progress · `[ ]` next. Each milestone maps to one PR (see [`pr-plan.md`](./pr-plan.md)).

## PR 1 — Project setup `chore/project-setup`
- [x] Scaffold Next.js 16 + React 19 + TypeScript (strict) + Tailwind v4 + ESLint
- [x] Add zustand and clsx
- [x] Planning docs: Aim, tasks, context, architecture, decisions, PR plan, QA checklist
- [x] Clean folder structure and README

## PR 2 — Design system & content `feat/design-system`
- [x] Theme tokens, fonts (Fraunces, Figtree, Shantell Sans) (self-hosted, Fontsource)
- [x] Base, component and area stylesheets in cascade layers
- [x] Typed content: puppies (15 available, 27 gone home), families (64), FAQ, showroom
- [x] Media library under `public/media`
- [x] Shared primitives: Photo, Paw icon, Star, Pup mascot (all poses)

## PR 3 — Layout shell `feat/layout-shell`
- [x] Header with scalloped hem, active paw, hide-on-scroll
- [x] Mobile menu dialog (circle reveal, staggered links)
- [x] Footer (hill, stars, moon, basket pup) + phone action bar
- [x] Page curtain transition, paw cursor

## PR 4 — Home: hero `feat/home-hero`
- [x] Hero copy, sunrise glow, puppy lineup arches, quilt scallop, peeking Teddy
- [x] Lineup duck/pop rotation, hover name tags

## PR 5 — Home: meet the pups & two ways `feat/home-meet-the-pups`
- [x] Pinned horizontal street of doors with floor + walking Teddy
- [x] Signpost, showroom window, flight path

## PR 6 — Home: journey → porch `feat/home-journey-to-porch`
- [x] WhatsApp phone story with sticky steps
- [x] Puppy passport with stamps
- [x] Dusk families wall, night FAQ, porch with opening door

- [ ] Showroom video for the chat clip (needs downloading from the live site)
- [ ] Roaming Teddy: one mascot that walks between scenes as you scroll, leaving paw prints (planned for PR 10)

## PR 7 — Puppies `feat/puppies`
- [x] Sketchbook listing + URL filters (where / breed / boy or girl)
- [x] Puppy profile pages (gallery + viewer, details tag, way home, enquiry letter, prev/next) — all 42 prerendered
- [x] Gone home "admit one" tickets
- [x] Enquiry validation shared by forms and `/api/enquiry` (honeypot, 422 field errors, WhatsApp hand-off)

## PR 8 — Families, how it works, FAQ `feat/families-how-faq`
- [x] Happy families: masonry polaroid wall (64), paw-pat bounce-in, viewer with arrow keys
- [x] How it works: In Dubai / Imported tab switch with postcards + steps, promise stamps, delivery, why us
- [x] FAQ corkboard: pinned notes that unfold, live search with highlights, Teddy's ?→! bubble
## PR 9 — Contact `feat/contact`
- [x] Fill-in-the-blanks letter form with inline validation summary
- [x] Seal → post animation (envelope into post box) and thank-you note
- [x] WhatsApp / call / email details and the Downtown Dubai shopfront card
- [x] "Lost" poster 404 page with tear-off tabs
## PR 10 — QA & polish `chore/qa-polish`

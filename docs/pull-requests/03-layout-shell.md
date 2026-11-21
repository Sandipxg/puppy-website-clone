# feat: site header, mobile menu, footer and action bar

## What
The chrome shared by every page:
- **Header**: logo, centered nav with a paw under the active link, WhatsApp button. Transparent over the home hero, then milk with a scalloped hem once you scroll; tucks away while scrolling down.
- **Mobile menu**: native `<dialog>` that opens with a circular reveal from the Menu button and staggers its links in.
- **Footer**: night hill, twinkling stars and moon, Teddy snug in a wicker basket, Explore / Say hello columns, socials.
- **Action bar**: sticky WhatsApp + Call on phones.
- **Page curtain**: a quilted blanket sweeps over the page with Teddy galloping across on first load and between pages.
- Skip link, paw cursor, Lenis smooth scrolling.

## How
- UI state (menu open, curtain phase) in a small zustand store, `src/store/ui.ts`
- Curtain intercepts same-origin link clicks, covers, `router.push`es, then lifts when the pathname changes
- Menu closes on Escape (`cancel`), on route change, and plays its close animation before `dialog.close()`
- Everything respects `prefers-reduced-motion`

## Screenshots
Desktop 1440: header + footer match the reference.

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] Keyboard: skip link, Escape closes menu
- [x] `docs/tasks.md` updated

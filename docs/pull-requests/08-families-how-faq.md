# feat: happy families, how it works and FAQ pages

## What
- **`/happy-families`**: "our wall of happy endings". There are 64 polaroids in a masonry wall (2 → 3 → 4 columns), each with a washi-tape strip. They bounce in as you scroll while a paw pats each one, and any print opens the full-screen viewer (arrow keys, Escape). A taped testimonial note sits in the header, and Teddy signs off at the bottom.
- **`/how-it-works`**: chip links to the four sections. *Two ways home* is an **In Dubai / Imported** pill switch, built as proper ARIA tabs with arrow-key support, showing a postcard and four illustrated steps for each. Below it: the premium puppy promise as passport stamps, delivery & collection with the parked plane over the skyline, why choose us, and a closing card with a bowing Teddy.
- **`/faq`**: questions pinned to a corkboard as paper notes with coloured pins. Notes unfold like an accordion, the search filters and highlights as you type, and Teddy's thought bubble flips from "?" to "!" while a note is open.

## How
- The wall reuses the zustand photo-viewer store from the home page
- `Flight` was extracted into `components/illustrations` so the home page (scroll-flown, with a passenger) and this page (parked) share it
- Passport stamps are exported as `StampEntry` so the promise section reuses the exact stamp styles
- Accordion: `aria-expanded` + `aria-controls`, answers are `inert` while folded, the grid-rows `0fr → 1fr` transition is in CSS

## Checklist
- [x] `tsc`, `lint`, `build` pass (52 static pages)
- [x] No console errors, no horizontal overflow
- [x] Keyboard: tabs (arrow keys), accordion buttons, viewer
- [x] `docs/tasks.md` updated

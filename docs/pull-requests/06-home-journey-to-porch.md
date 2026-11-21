# feat(home): journey, passport, families, night FAQ and porch

## What
The rest of the home page, as the day turns to night:
- **Your puppy journey**: three steps beside a WhatsApp phone. As each step reaches the middle of the screen it lights up, the phone shows "typing…", then the reply lands: breed chips, then showroom snaps and a video clip, then a delivery route home. The phone sticks while the steps scroll on desktop.
- **Why families trust TeddyPups**: an open puppy passport; four ink stamps thump onto the right-hand page as it scrolls in. Below it the Dubai skyline with the sun setting.
- **Happy families & puppies**: a testimonial speech bubble and eight polaroids taped to the showroom's wooden front. They drop in one by one, and clicking one opens a full-screen viewer (arrows and Escape work). The door, a street lamp, Teddy and the "See every happy family" button sit below.
- **Questions, answered**: a starry night with three FAQs and a puzzled Teddy with a floating "?".
- **Porch**: a house whose front door swings open onto Max, a welcome mat, Teddy bowing, and the closing CTAs.

## How
- `Reveal` arms `[data-reveal]` children after hydration and flips `data-revealed` with an `IntersectionObserver`, so there's no hydration mismatch and no-JS users still see everything
- The photo viewer state lives in a zustand store (`src/store/viewer.ts`) so any page can open it; it's a native `<dialog>`
- The home viewer orders captioned photos first, matching the reference ("1 / 64 — Lulu…")
- Stamps, the sunset and the porch door use `animation-timeline: view()` where supported

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] Section heights match the reference at 1440 × 900
- [x] `docs/tasks.md` updated

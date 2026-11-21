# feat(home): hero with puppy arches and quilt

## What
The home page's opening scene:
- "every puppy is family" note with a hand-drawn squiggle underline
- Display headline (Fraunces SOFT/WONK) and lede, primary + ghost CTAs
- A warm sunrise glow that rises on load
- Six puppies peeking over a scalloped, cross-stitched quilt in arched frames, with Teddy peeking up in the middle

## How
- `Scene` wraps each home section, paints its sky gradient (each scene starts where the last ended) and exposes `data-here` / `data-visited` from an `IntersectionObserver` (`useInView`)
- The lineup renders a stable order on the server, shuffles after hydration, then every ~3.4s one arch **ducks** and a different puppy **pops** up; the next puppy is preloaded off-screen so the swap never flashes empty
- Hover or focus shows the puppy's name tag above its arch
- Photos use each image's focal point and average colour as the placeholder

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] Matches the reference at 1440 × 900
- [x] Reduced motion: no rotation
- [x] `docs/tasks.md` updated

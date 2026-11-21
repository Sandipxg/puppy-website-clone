# chore: roaming Teddy, QA pass, SEO and docs

## What
- **Roaming Teddy**: on desktop the home page's static mascots hand over to a single Teddy on a fixed layer. He trots from stop to stop as you scroll, easing between poses (peek → walk → sit → bow → snug) with a little hop, swings his legs while moving, trots on the spot while the street scrolls, and slips behind the quilt or into his basket where the stop says so. Phones, touch screens and reduced motion keep the static, posed Teddys.
- **QA pass** at 1440 and 390 on every route (see `docs/qa-report.md`). Home section heights now match the reference within a few pixels.
- **SEO**: `sitemap.xml` (all pages + 42 puppies), `robots.txt`, Open Graph / Twitter metadata, per-page titles and descriptions.
- `.env.example` for `NEXT_PUBLIC_SITE_URL` and `ENQUIRY_WEBHOOK_URL`.

## How
- `Pup` now accepts an explicit pose spec and exports `lerpPose`, so in-between poses are just interpolated numbers
- `PupJourney` reads every `[data-pup-stop]` once, then each animation frame finds the two stops around a probe line at 55% of the viewport and blends position, size and pose between them. It sets `html[data-pup]`, which hides the static stops and switches the porch door to "opens when visited"

## Checklist
- [x] `tsc`, `lint`, `build` pass (55 routes)
- [x] QA report written; `docs/tasks.md` updated

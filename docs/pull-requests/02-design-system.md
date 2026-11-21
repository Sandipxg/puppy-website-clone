# feat: design tokens, fonts, content data and media

## What
The foundation every page renders from: theme tokens, self-hosted variable fonts, the stylesheet system, typed content for all 42 puppies, 64 family photos, FAQs and showroom shots, the media library, and the shared illustration primitives (paw, star, Teddy the mascot).

## Why
Matching the reference pixel for pixel depends on exact tokens (colour, type axes, easing) being defined once. See `docs/context.md` for every measured value.

## How
- **Tokens** in `@theme` (`src/app/globals.css`): cocoa / milk / honey / toffee palette, easing curves, font families
- **Utilities**: `font-plush` (Fraunces SOFT 100 / WONK 1 / opsz 144), `font-scrawl` (Shantell Sans INFM 60 / BNCE 30), `text-huge`, `text-big`, `text-lede`, `gutter`
- **Fonts**: Fontsource variable builds with all axes; no network request at runtime (decision D5)
- **Styles** split by area in `src/styles/` (base, components, chrome, home, pages) and imported into `@layer components` so utilities still override them
- **Content**: `src/data/*.ts` typed by `src/types/content.ts`; helpers in `src/lib/puppies.ts`
- **Mascot**: `Pup` is one SVG rig posed by a transform table (`peek`, `walk`, `sit`, `bow`, `snug`)
- Paw cursors in `public/cursor/`

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] `docs/tasks.md` updated

# Decision log

Short records of choices that shape the codebase. Newest last.

### D1 — Next.js 16 App Router + TypeScript
Matches the reference's runtime model (static pages, image optimisation) and gives typed content.

### D2 — Tailwind v4 tokens + component CSS layer
Utilities for layout; hand-written CSS for illustrated shapes (scalloped edges, arches, fence) that would be unreadable as utility soup. Component CSS is imported into `layer(components)` so utilities can still override it.

### D3 — zustand for UI state
The menu, lightbox and floating chat are opened from many places (header, cards, CTAs). A small store keeps that wiring explicit and avoids a provider tree.

### D4 — Content as typed data
Puppies, families and FAQs live in `src/data` with types in `src/types`, so pages are pure render functions of data and adding a puppy is a data change.

### D5 — Self-hosted variable fonts via Fontsource
Fraunces needs its `SOFT`, `WONK` and `opsz` axes and Shantell Sans its `BNCE` and `INFM` axes. The Fontsource "full" builds ship every axis as local woff2 files, so builds work offline and the page never waits on Google Fonts.

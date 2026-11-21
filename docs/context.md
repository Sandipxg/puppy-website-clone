# Design context

Every value here was measured from the reference with the browser's computed styles at 1440 × 900 (desktop) and 390 × 844 (phone). When building, use these tokens — never eyeball.

## Colour palette

| Token | Hex | Used for |
|---|---|---|
| `cocoa` | `#2a170e` | Ink: text, 3px outlines, hard shadows |
| `cocoa-soft` | `#5a3a28` | Secondary text |
| `milk` | `#fffdf8` | Page background, cards |
| `honey` | `#f2be6b` | Highlights, selection, stars |
| `honey-soft` | `#fbe3b4` | Chips, soft fills |
| `toffee` | `#c2622b` | Accents, paw prints |
| `toffee-deep` | `#a24a1a` | Primary button, focus ring |
| `toffee-ink` | `#8e3f15` | Handwritten notes, link text |
| `blush` | `#f9cdbf` | Form alerts, tape |
| `sky` / `sky-deep` | `#bfddf5` / `#2f6e9e` | Ruled paper lines |
| WhatsApp green | `#1f7a4d` | `.btn-whatsapp` |
| Footer night | `#24130b` | Footer background |

### Home-page sky (each scene fades into the next)

| Scene | `--sky-top` → `--sky-bottom` | Tone |
|---|---|---|
| Hero | `#fffdf8` → `#fff1d8` (quilt `#fff1d8`) | light |
| Meet the pups | `#fff1d8` → `#fbe3b4` | light |
| Two ways | `#fbe3b4` → `#f7d18d` | light |
| Journey (chat) | `#f7d18d` → `#f0b866` | light |
| Passport (trust) | `#f0b866` → `#a65a30` | light |
| Families (dusk) | `#a65a30` → `#4d2b19` | dark |
| Questions (night) | `#4d2b19` → `#2f1a10` | dark |
| Porch CTA | `#2f1a10` → `#24130b` | dark |

Door colours on "Meet the pups" cycle: `#a24a1a, #5a3a28, #d4893f, #b8644a, #7a4a2e`.

## Typography

| Role | Family | Settings |
|---|---|---|
| Display (`font-plush`) | Fraunces 800 | `font-variation-settings: "SOFT" 100, "WONK" 1, "opsz" 144`; `letter-spacing: -.025em`; `line-height: .92`; `text-wrap: balance` |
| Display text (`font-plush-text`) | Fraunces | `"SOFT" 100, "WONK" 0, "opsz" 36` |
| Body | Figtree 300–900 | 17px (`1.0625rem`), line-height 1.6 |
| Handwritten (`font-scrawl`) | Shantell Sans 500 | `"INFM" 60, "BNCE" 30` |

| Scale | Value |
|---|---|
| `text-huge` (section H2) | `clamp(2.6rem, 6.4vw, 6.25rem)` → 91.2px @1440 |
| `text-big` | `clamp(2rem, 4.2vw, 4rem)` |
| `text-lede` | `clamp(1.125rem, 1.4vw, 1.375rem)`, lh 1.5 |
| Hero H1 | `clamp(2.6rem, min(9.2vw, 11vh), 8.4rem)` → 99px @1440×900 |

## Layout

| Token | Value |
|---|---|
| `--gutter` | `clamp(1rem, 4vw, 3.5rem)` |
| `--header-h` | `4.75rem` (desktop) / `4rem` (< 768px) |
| `--bar-h` | `0` (desktop) / `calc(4rem + safe-area)` (phone action bar) |
| Max content width | `110rem` |
| Breakpoints | 640 / 768 / 900 / 1024 / 1100 / 1280 / 1680 |

## Shape language

- 3px `cocoa` outlines on every card, button and illustration.
- Hard offset shadows, no blur: `6px 8px #2a170e24`, buttons `0 .5rem 0 -.15rem cocoa`.
- Arches (`border-radius: 999px 999px 0 0`) for doors, windows, photo frames.
- Scalloped edges drawn as SVG patterns (header hem 44×14, quilt/curtain 76×40).

## Motion

| Easing | Curve |
|---|---|
| `--ease-silk` | `cubic-bezier(.22, 1, .36, 1)` |
| `--ease-pounce` | `cubic-bezier(.34, 1.56, .64, 1)` |
| `--ease-snap` | `cubic-bezier(.7, 0, .2, 1)` |

Scroll reveals use `animation-timeline: view()` where supported; everything is disabled under `prefers-reduced-motion`.

## Buttons

| Class | Spec |
|---|---|
| `.btn` | min-height 3.25rem, padding `.85rem 1.6rem`, 17px / 650, radius 999px |
| `.btn-primary` | bg `toffee-deep`, text `milk`, shadow `0 .5rem 0 -.15rem cocoa`; hover lifts 2px and tilts −1° |
| `.btn-ghost` | 2px `cocoa` border, transparent; hover inverts |
| `.btn-whatsapp` | bg `#1f7a4d`, white text |

## Contact constants

- Display phone: `+971 50 000 0000` (`tel:+971500000000`)
- WhatsApp link: `https://wa.me/919898124987?text=…`
- Email: `info@instabizweb.com`
- Address: Downtown Dubai, United Arab Emirates

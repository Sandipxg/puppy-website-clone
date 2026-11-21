# QA report

Last run against the production build (`next build && next start`) with headless Chromium.

## Parity with the reference (1440 × 900)

| Home section | Reference height | Clone height |
|---|---|---|
| Hero | 824 | 824 |
| Meet the pups (pinned) | 4109 | 4126 |
| Two ways | 1106 | 1107 |
| Journey | 1695 | 1697 |
| Passport | 922 | 922 |
| Families | 1574 | 1575 |
| Questions | 634 | 636 |
| Porch | 1018 | 1021 |

## Pages

| Route | 1440 | 390 | Console errors | Overflow |
|---|---|---|---|---|
| `/` | ✅ | ✅ | none | none |
| `/puppies` | ✅ | ✅ | none | none |
| `/puppies/[slug]` (42) | ✅ | ✅ | none | none |
| `/gone-home` | ✅ | ✅ | none | none |
| `/happy-families` | ✅ | ✅ | none | none |
| `/how-it-works` | ✅ | ✅ | none | none |
| `/faq` | ✅ | ✅ | none | none |
| `/contact` | ✅ | ✅ | none | none |
| 404 | ✅ | ✅ | — | none |

## Behaviour

- Filters: Maltipoo → 6, Pomeranian → 4, Poodle → 2, Cavapoo → 2, Shih Tzu → 2, Boys → 6, Girls → 10, Korean Teacup → 5 (same as reference)
- FAQ search "deliver" → 1 note
- Contact: empty submit → 2 field errors; valid submit → posted animation → thank-you
- `/api/enquiry`: malformed → 400, invalid → 422 with field errors, honeypot → 200 (dropped), valid → 200 + WhatsApp link
- Reduced motion: pinning, curtain, lineup rotation, roaming Teddy and scroll animations all disabled

## Parity pass (PR 11)

Measured every section's top and height on the reference and the clone with the same browser.

| Page (390 × 844) | Reference | Clone |
| --- | --- | --- |
| Home | 12 904 | 12 904 |
| Puppies | 5 639 | 5 639 |
| How it works | 7 810 | 7 810 |
| Happy families | 10 759 | 10 761 |

Fixed along the way: cascade layer order, 14 portrait photos with swapped dimensions, the `measure` utility, server-rendered tab panels, `sizes` hints, and titles/descriptions on every page.

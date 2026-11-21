# fix: side-by-side parity pass (cascade, photo sizes, SEO copy)

A page-by-page comparison of the live reference and the deployed clone, at 1440 × 900 and 390 × 844, measuring every section's position and height and diffing metadata. This PR fixes everything that comparison turned up.

## What
- **CSS cascade**: page and scene styles (`chrome.css`, `home.css`, `pages.css`) are now unlayered, as on the reference; only the shared components stay in the `components` layer. Before, utilities such as `font-plush` (line-height 0.92) beat rules like `.tp-door__name { line-height: 1 }`, which made headings and puppy door names slightly shorter.
- **Happy families wall**: 14 portrait photos had their width and height swapped (camera EXIF rotation), so they showed as short landscape prints and the wall was ~640px shorter than the reference.
- **`measure` utility** (`max-width: 62ch`) for the "Unique and high quality puppies" text on How it works.
- **How it works**: both tab panels' steps are now server-rendered (the hidden panel is in the HTML, like the reference), so search engines and no-JS visitors see all eight steps.
- **Responsive image hints**: every `sizes` attribute matches the reference, so browsers download the same image widths.
- **SEO copy**: title separator is now `|` ("Available puppies | TeddyPups U.A.E."), each page's description matches the reference, and puppy profiles build their title, description and share-image alt from the puppy's details (e.g. "Meet Max: Maltipoo, boy, 3 months old, imported. Real photos and video from TeddyPups U.A.E.").

## Result
| Page (390 × 844) | Reference height | Clone height |
| --- | --- | --- |
| Home | 12 904 | 12 904 |
| Puppies | 5 639 | 5 639 |
| How it works | 7 810 | 7 810 |
| Happy families | 10 759 | 10 761 |

At 1440 the remaining differences are a few pixels, from scrollbar width in the measuring setup.

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] Titles and descriptions checked for all 42 puppy profiles
- [x] `docs/qa-report.md` and `docs/tasks.md` updated

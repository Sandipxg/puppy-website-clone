# feat(contact): letter-style enquiry form and lost-poster 404

## What
- **`/contact`**: the enquiry form written as a letter. *"Dear TeddyPups, my name is ___, and you can reach me on ___ …"* The blanks are dashed handwriting lines, the puppy picker is a select of every available puppy, and there's a lined note area. Errors appear in a blush summary and the invalid blanks turn red. On send, the letter folds away, an envelope seals and drops into a TeddyPups post box whose flag pops up, then a thank-you note with a WhatsApp hand-off. Beside it are WhatsApp / call / email details and a striped-awning "Visit us in Downtown Dubai" card with the showroom photo.
- **404**: a "LOST" poster taped to the wall with Teddy sniffing around, and tear-off tabs back to the real pages.

## How
- Uses the same `validateEnquiry` as the profile form and `/api/enquiry`
- `data-phase` on the wrapper drives the CSS sequence (writing → sealing → posting → sent); the network request runs alongside the animation, so a failure returns you to the letter with a message
- Focus moves to the first invalid blank, then to the thank-you note
- Reduced motion skips the animation entirely
- New `sniff` pose for Teddy

## Checklist
- [x] `tsc`, `lint`, `build` pass (53 static pages)
- [x] Tested: empty submit → 2 field errors; valid submit → sent; API 400 / 422 / honeypot 200
- [x] `docs/tasks.md` updated

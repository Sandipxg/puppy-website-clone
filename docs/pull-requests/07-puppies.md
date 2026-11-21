# feat(puppies): sketchbook listing, puppy profiles and gone home

## What
- **`/puppies`**: "from Teddy's sketchbook". Every available puppy is drawn in as a sketch card: a watercolour wash, the photo cut to a wobbly shape, an ink outline that draws itself in, a retrace stroke and a couple of doodles. Sticker-chip filters for *where*, *breed* and *boy or girl* live in the URL (`?origin=`, `?collection=korean-teacup`, `?breed=`, `?gender=`), so links from the home page chat chips work. Below, a honey strip of puppies who have already gone home.
- **`/puppies/[slug]`**: a storybook profile for all 42 puppies (prerendered). It has a page-turning gallery with thumbnails, video and a full-screen viewer; a luggage-tag details card with Teddy peeking over it; "Every Teddy Pup comes" on patterned paper; the four-step way home with paw-print trails; an enquiry letter; and previous/next pups. A bookmark ribbon grows down the margin as you read. Gone-home profiles switch their copy ("the day they went home", "Looking for a puppy like this?").
- **`/gone-home`**: "admit one" tickets for every puppy that found a family, under a ticket booth with Teddy peeking.
- **`/api/enquiry`**: validates and accepts enquiries.

## How
- `src/lib/sketch.ts` generates each card's shapes from a seeded PRNG (the slug), so every card is unique but stable between server and client
- Filters: `readFilters` / `applyFilters` in `src/lib/puppies.ts`; the browser reads `useSearchParams` inside `<Suspense>` with the full grid as fallback, so the prerendered HTML already lists every puppy
- `src/lib/enquiry.ts` is the single validation definition used by the form (instant feedback) and the API (authority). There is a honeypot field. Responses: 422 with field errors, 400 for malformed JSON, 200 with a pre-filled WhatsApp link. Set `ENQUIRY_WEBHOOK_URL` to forward enquiries

## Checklist
- [x] `tsc`, `lint`, `build` pass (49 static pages)
- [x] No console errors, no horizontal overflow at 1440
- [x] Filter counts match the reference (e.g. Maltipoo 6, Pomeranian 4, Girls 10)
- [x] `docs/tasks.md` updated

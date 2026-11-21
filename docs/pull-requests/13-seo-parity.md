# feat(seo): canonical URLs, structured data and sitemap parity

The visible metadata (titles, descriptions, share cards) was matched in #11. This PR adds the SEO pieces the reference has under the hood. Built on top of #12.

## What
- **Correct site URL in production**: links in metadata, the sitemap and robots.txt fell back to `http://localhost:3000` when `NEXT_PUBLIC_SITE_URL` wasn't set, as on our Vercel deployment. `siteUrl` now falls back to Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`) before localhost.
- **Canonical URL** on every page (`<link rel="canonical">`).
- **Structured data (JSON-LD)**: a `PetStore` entry on the home page (name, logo, phone, email, address, socials) and a `BreadcrumbList` (Puppies → name) on every puppy profile.
- **`application-name`** meta tag.
- **Share cards** match the reference: the home page shares the logo; inner pages carry `og:site_name`, `og:locale` and `og:type`; puppy pages share their own cover photo.
- **Icons** use Next's file convention (`app/icon.png`, `app/apple-icon.png`), as on the reference.
- **sitemap.xml**: 7 pages plus 42 puppy profiles, each with its cover photo (image sitemap), with no changefreq or priority, as on the reference.
- **robots.txt**: allow `/`, disallow `/admin` and `/api`, sitemap link.

## Checklist
- [x] `tsc`, `lint`, `build` pass
- [x] Head tags compared against the reference on home, an inner page, a puppy profile and the 404 page
- [x] sitemap: 49 URLs, 42 images

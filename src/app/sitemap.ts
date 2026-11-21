import type { MetadataRoute } from "next";
import { puppies } from "@/data/puppies";
import { cover } from "@/lib/puppies";
import { siteUrl } from "@/lib/site";

const PAGES = ["/", "/puppies", "/gone-home", "/happy-families", "/how-it-works", "/faq", "/contact"];

/** Every page, then every puppy profile with its cover photo (image sitemap). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({ url: `${siteUrl}${path}` })),
    ...puppies.map((p) => ({ url: `${siteUrl}/puppies/${p.slug}`, images: [`${siteUrl}${cover(p).src}`] })),
  ];
}

import type { MetadataRoute } from "next";
import { puppies } from "@/data/puppies";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/puppies", "/gone-home", "/happy-families", "/how-it-works", "/faq", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.8 })),
    ...puppies.map((p) => ({
      url: `${base}/puppies/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: p.status === "available" ? 0.7 : 0.4,
    })),
  ];
}

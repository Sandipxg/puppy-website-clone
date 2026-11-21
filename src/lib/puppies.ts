import { puppies } from "@/data/puppies";
import type { Img, Puppy } from "@/types/content";

export const available = puppies.filter((p) => p.status === "available");
export const goneHome = puppies.filter((p) => p.status === "gone-home");

export function getPuppy(slug: string): Puppy | undefined {
  return puppies.find((p) => p.slug === slug);
}

/** The first still image of a puppy (video posters count). */
export function cover(p: Puppy): Img {
  const first = p.gallery[0];
  return first.type === "video" ? first.poster : first;
}

export const hasVideo = (p: Puppy) => p.gallery.some((g) => g.type === "video");

/** "Maltipoo, boy, 3 months, with video" — breed is dropped when it is the puppy's name. */
export function doorMeta(p: Puppy): string {
  const parts: string[] = [];
  if (p.name !== p.breed) parts.push(p.breed);
  parts.push(p.sex.toLowerCase());
  const head = parts.join(", ");
  return `${head}, ${p.age}${hasVideo(p) ? ", with video" : ""}`;
}

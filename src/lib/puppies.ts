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

/* ---------- Listing filters (kept in the URL so links are shareable) ---------- */

export type Filters = {
  origin?: "local" | "imported";
  collection?: "korean-teacup";
  breed?: string;
  gender?: "male" | "female";
};

export const BREED_FILTERS = [
  { value: "maltipoo", label: "Maltipoo" },
  { value: "pomeranian", label: "Pomeranian" },
  { value: "poodle", label: "Poodle" },
  { value: "cavapoo", label: "Cavapoo" },
  { value: "shih-tzu", label: "Shih Tzu" },
] as const;

export function readFilters(params: URLSearchParams): Filters {
  const f: Filters = {};
  const origin = params.get("origin");
  if (origin === "local" || origin === "imported") f.origin = origin;
  if (params.get("collection") === "korean-teacup") f.collection = "korean-teacup";
  const breed = params.get("breed");
  if (breed && BREED_FILTERS.some((b) => b.value === breed)) f.breed = breed;
  const gender = params.get("gender");
  if (gender === "male" || gender === "female") f.gender = gender;
  return f;
}

export function applyFilters(list: Puppy[], f: Filters): Puppy[] {
  return list.filter((p) => {
    const breed = p.breed.toLowerCase();
    const sex = p.sex.toLowerCase();
    if (f.origin && p.origin !== f.origin) return false;
    if (f.collection && !breed.startsWith("korean teacup")) return false;
    if (f.breed) {
      const label = BREED_FILTERS.find((b) => b.value === f.breed)!.label.toLowerCase();
      if (!breed.includes(label)) return false;
    }
    if (f.gender === "male" && !sex.includes("boy")) return false;
    if (f.gender === "female" && !sex.includes("girl")) return false;
    return true;
  });
}

export function countLine(n: number, filtered: boolean) {
  if (!filtered) return `${n} ${n === 1 ? "puppy" : "puppies"} looking for a home`;
  if (n === 0) return "No puppies match — try fewer filters";
  return n === 1 ? "1 puppy matches" : `${n} puppies match`;
}

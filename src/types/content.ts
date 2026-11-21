/** A photo with its intrinsic size, average colour (placeholder) and focal point. */
export type Img = {
  src: string;
  width: number;
  height: number;
  color: string;
  alt: string;
  /** CSS object-position, e.g. "53.8% 44.3%" */
  focal?: string;
};

export type GalleryItem =
  | ({ type: "image" } & Img)
  | { type: "video"; src: string; poster: Img };

export type Sex = "Boy" | "Girl" | "Boy & girl";
export type Origin = "local" | "imported";
export type PuppyStatus = "available" | "gone-home";

export type Puppy = {
  slug: string;
  name: string;
  breed: string;
  sex: Sex | string;
  age: string;
  origin: Origin;
  status: PuppyStatus | string;
  description: string;
  gallery: GalleryItem[];
  /** Watercolour wash behind the sketch card */
  wash?: string;
  /** "Admit one" ticket copy for puppies who have gone home */
  ticket?: { line: string; from: string };
};

export type FamilyPhoto = Img & { caption?: string };

export type Faq = { question: string; answer: string };

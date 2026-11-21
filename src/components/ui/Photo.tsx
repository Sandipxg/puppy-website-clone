import Image from "next/image";
import type { Img } from "@/types/content";

/**
 * A cover-cropped photo that fills its (positioned) parent.
 * Uses the photo's focal point for cropping and its average colour while loading.
 */
export function Photo({
  img,
  sizes = "(max-width: 768px) 50vw, 20vw",
  alt,
  priority,
  className,
}: {
  img: Img;
  sizes?: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={img.src}
      alt={alt ?? img.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      style={{ objectFit: "cover", objectPosition: img.focal ?? "50% 50%", backgroundColor: img.color }}
    />
  );
}

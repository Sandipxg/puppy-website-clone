import Link from "next/link";
import type { CSSProperties } from "react";
import { PAW_PATH } from "@/components/illustrations/Icons";
import { Photo } from "@/components/ui/Photo";
import { cover, hasVideo } from "@/lib/puppies";
import { maskUrl, sketch } from "@/lib/sketch";
import type { Puppy } from "@/types/content";

function sexWord(p: Puppy) {
  return p.sex.toLowerCase();
}

/** "Max, Maltipoo, boy, 3 months, available" */
function label(p: Puppy) {
  const parts = [p.name];
  if (p.name !== p.breed) parts.push(p.breed);
  parts.push(sexWord(p), p.age, p.status === "available" ? "available" : "gone home");
  return parts.join(", ");
}

/** "Maltipoo · boy · 3 months" (breed dropped when it's the name) */
function meta(p: Puppy) {
  const parts: string[] = [];
  if (p.name !== p.breed) parts.push(p.breed);
  parts.push(sexWord(p), p.age);
  return parts.join(" · ");
}

/**
 * A puppy drawn into Teddy's sketchbook: a watercolour wash, the photo cut to
 * a wobbly shape, an ink outline that draws itself on reveal, and doodles.
 */
export function SketchCard({ puppy, index, small = false }: { puppy: Puppy; index: number; small?: boolean }) {
  const s = sketch(puppy.slug, puppy.tilt);
  const home = puppy.status !== "available";
  const wash = puppy.wash ?? (home ? "#f9cdbf" : "#fbe3b4");
  const mask = maskUrl(s.mask);
  return (
    <Link
      className={`tp-sketch${small ? " tp-sketch--small" : ""}`}
      data-reveal="true"
      aria-label={label(puppy)}
      href={`/puppies/${puppy.slug}`}
      style={{ "--tilt": `${s.tilt}deg`, "--d": `${(index % 8) * 70}ms`, "--wash": wash } as CSSProperties}
    >
      <span className="tp-sketch__frame">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="tp-sketch__wash" style={{ translate: s.washShift }}>
          <path d={s.wash} />
        </svg>
        <span className="tp-sketch__photo" style={{ maskImage: mask, WebkitMaskImage: mask }}>
          <Photo img={cover(puppy)} alt="" sizes={small ? "140px" : "(max-width: 640px) 45vw, 280px"} />
        </span>
        <svg aria-hidden="true" viewBox="0 0 100 100" className="tp-sketch__ink">
          <path d={s.line} pathLength={1} className="tp-sketch__line" />
          <path d={s.retrace} pathLength={1} className="tp-sketch__line tp-sketch__line--retrace" />
          {s.doodles.map((d, i) => (
            <g key={i} transform={`translate(${d.x.toFixed(1)} ${d.y.toFixed(1)}) rotate(${d.rotate}) scale(${d.scale.toFixed(2)})`}>
              <g className="tp-sketch__doodle">
                {d.kind === "paw" ? (
                  <path d={PAW_PATH} transform="scale(.17) translate(-32 -34)" fill={d.color} opacity="0.85" />
                ) : d.stroke ? (
                  <path d={d.d} fill="none" stroke={d.color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d={d.d} fill={d.color} />
                )}
              </g>
            </g>
          ))}
        </svg>
        {home ? (
          <span className="tp-sketch__sticker tp-sketch__sticker--home font-scrawl">gone home ♥</span>
        ) : (
          <span className="tp-sketch__sticker font-scrawl">Available</span>
        )}
        {!small && hasVideo(puppy) && <span className="tp-sketch__video">▶ video</span>}
      </span>
      <span className="tp-sketch__name font-plush">{puppy.name}</span>
      {!small && <span className="tp-sketch__meta">{meta(puppy)}</span>}
    </Link>
  );
}

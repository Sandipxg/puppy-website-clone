import { Star } from "./Icons";

export type StarSpec = { left: string; top: string; size: number };

/** A field of softly twinkling stars, each offset by 0.4s. */
export function Stars({ stars, className }: { stars: StarSpec[]; className?: string }) {
  return (
    <div aria-hidden="true" className={className ?? "pointer-events-none absolute inset-0"}>
      {stars.map((s, i) => (
        <Star
          key={i}
          className="tp-twinkle absolute text-honey"
          style={{ left: s.left, top: s.top, width: `${s.size}px`, animationDelay: `${(i * 0.4).toFixed(2)}s` }}
        />
      ))}
    </div>
  );
}

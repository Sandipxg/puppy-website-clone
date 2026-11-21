"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

export type Sky = { top: string; bottom: string; quilt?: string };

/**
 * One "scene" of the home page. Each paints a sky gradient that picks up
 * exactly where the previous scene's ended, so the page reads as one long
 * day turning into night.
 */
export function Scene({
  id,
  titleId,
  className,
  sky,
  tone = "light",
  children,
  style,
  attrs,
}: {
  id: string;
  /** Defaults to `${id}-title` */
  titleId?: string;
  className: string;
  sky: Sky;
  tone?: "light" | "dark";
  children: ReactNode;
  style?: CSSProperties;
  /** Extra data-* attributes for the section (e.g. data-pinned). */
  attrs?: Record<string, string>;
}) {
  const ref = useRef<HTMLElement>(null);
  const { here, visited } = useInView(ref);
  return (
    <div data-section={id}>
      <section
        ref={ref}
        data-pup-scene="true"
        data-tone={tone}
        className={`tp-scene ${className}`}
        style={
          {
            "--sky-top": sky.top,
            "--sky-bottom": sky.bottom,
            ...(sky.quilt ? { "--quilt": sky.quilt } : {}),
            ...style,
          } as CSSProperties
        }
        aria-labelledby={titleId ?? `${id}-title`}
        data-here={here}
        data-visited={visited}
        {...attrs}
      >
        {children}
      </section>
    </div>
  );
}

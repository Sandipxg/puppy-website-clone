"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Arms every `[data-reveal]` element inside it once JavaScript is running, then
 * marks each `data-revealed` as it scrolls into view. Without JS (or with
 * reduced motion) nothing is armed, so content is simply visible.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  rootMargin = "0px 0px -12% 0px",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-revealed", "");
          io.unobserve(e.target);
        }
      },
      { rootMargin },
    );
    for (const el of targets) {
      el.setAttribute("data-armed", "");
      io.observe(el);
    }
    return () => io.disconnect();
  }, [rootMargin]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

"use client";

import { useEffect, useRef } from "react";

/** A bookmark ribbon down the page edge that grows as you read the profile. */
export function Ribbon() {
  const ref = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const host = ref.current?.parentElement;
    const el = band.current;
    if (!host || !el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
        el.style.transform = `scaleY(${(0.06 + p * 0.94).toFixed(4)})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="tp-ribbon">
      <div className="tp-ribbon__track">
        <span ref={band} className="tp-ribbon__band" style={{ transform: "scaleY(0.06)" }} />
      </div>
    </div>
  );
}

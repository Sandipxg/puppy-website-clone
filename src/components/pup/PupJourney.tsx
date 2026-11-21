"use client";

import { useEffect, useRef, useState } from "react";
import { lerpPose, POSES, Pup, type PoseSpec, type PupPose } from "@/components/illustrations/Pup";

type Stop = { el: HTMLElement; pose: PupPose; behind: boolean };
type Frame = { x: number; y: number; w: number; spec: PoseSpec; facing: "left" | "right"; walking: boolean; behind: boolean };

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Where the stop sits on screen (its box, since the SVG keeps a 300×240 ratio). */
function box(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.width * 0.8 };
}

/**
 * Teddy walks the home page with you. Every section has a "stop" where a
 * posed Teddy sits; once this runs, those are hidden and a single Teddy on a
 * fixed layer trots from stop to stop as you scroll — easing into each pose
 * when he arrives, and hopping behind the quilt or into his basket.
 */
export function PupJourney() {
  const [frame, setFrame] = useState<Frame | null>(null);
  const stops = useRef<Stop[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference) and (hover: hover)");
    if (!mq.matches) return;

    stops.current = Array.from(document.querySelectorAll<HTMLElement>("[data-pup-stop]")).map((el) => ({
      el,
      pose: (el.dataset.pose as PupPose) ?? "sit",
      behind: el.dataset.behind === "true",
    }));
    if (stops.current.length < 2) return;
    document.documentElement.setAttribute("data-pup", "");

    let raf = 0;
    let lastX = 0;
    let facing: "left" | "right" = "right";
    let moving = 0;
    let scrolled = 0;
    let lastScroll = window.scrollY;

    const tick = () => {
      const vh = window.innerHeight;
      const probe = vh * 0.55;
      // Distance of each stop's centre from the probe line (screen space).
      const list = stops.current.map((s) => {
        const b = box(s.el);
        return { s, b, mid: b.y + b.h / 2 };
      });
      // a = last stop above the probe, b = the next one below it.
      let i = list.findIndex((l) => l.mid > probe);
      if (i === -1) i = list.length;
      const a = list[Math.max(0, i - 1)];
      const b = list[Math.min(list.length - 1, i)];
      let t = a === b ? 0 : clamp01((probe - a.mid) / (b.mid - a.mid));
      if (i === 0) t = 1;

      // Dwell at each stop for the first/last fifth of the walk.
      const walk = clamp01((t - 0.2) / 0.6);
      const k = ease(walk);
      const x = a.b.x + (b.b.x - a.b.x) * k;
      const w = a.b.w + (b.b.w - a.b.w) * k;
      // A little hop between stops.
      const arc = Math.sin(Math.PI * k) * -Math.min(80, Math.abs(b.b.x - a.b.x) * 0.12);
      const y = a.b.y + (b.b.y - a.b.y) * k + arc;

      const walking = walk > 0 && walk < 1;
      let spec: PoseSpec;
      if (!walking) spec = POSES[(walk >= 1 ? b : a).s.pose];
      else if (k < 0.25) spec = lerpPose(POSES[a.s.pose], POSES.walk, k / 0.25);
      else if (k > 0.75) spec = lerpPose(POSES.walk, POSES[b.s.pose], (k - 0.75) / 0.25);
      else spec = POSES.walk;

      if (Math.abs(x - lastX) > 0.5) {
        facing = x < lastX ? "left" : "right";
        moving = performance.now();
      }
      if (!walking) facing = "right";
      lastX = x;
      if (window.scrollY !== lastScroll) {
        scrolled = performance.now();
        lastScroll = window.scrollY;
      }
      const now = performance.now();
      // Trot while travelling between stops, or on the treadmill while the street scrolls.
      const trotting =
        (walking && now - moving < 180) || (!walking && spec === POSES.walk && now - scrolled < 180);

      const near = walk < 0.5 ? a : b;
      setFrame({
        x,
        y,
        w,
        spec,
        facing,
        walking: trotting,
        behind: near.s.behind && (walk <= 0.05 || walk >= 0.95),
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.removeAttribute("data-pup");
    };
  }, []);

  if (!frame) return null;
  return (
    <div className="pup-layer" data-front={!frame.behind} aria-hidden="true">
      <div
        className="pup-actor"
        data-walking={frame.walking ? "" : undefined}
        style={{ transform: `translate3d(${frame.x.toFixed(1)}px, ${frame.y.toFixed(1)}px, 0)` }}
      >
        <div className="pup-actor__body" style={{ transform: `scale(${(frame.w / 300).toFixed(4)})` }}>
          <Pup spec={frame.spec} facing={frame.facing} />
        </div>
      </div>
    </div>
  );
}

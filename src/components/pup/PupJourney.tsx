"use client";

import { useEffect, useRef, useState } from "react";
import { lerpPose, POSES, Pup, type PoseSpec, type PupPose } from "@/components/illustrations/Pup";

type Stop = { el: HTMLElement; pose: PupPose; behind: boolean; lane: boolean };
type Frame = {
  x: number;
  y: number;
  w: number;
  spec: PoseSpec;
  /** -1 (facing left) … 1 (facing right); in between while turning. */
  flip: number;
  walking: boolean;
  behind: boolean;
};

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Where the stop sits on screen (its box, since the SVG keeps a 300×240 ratio). */
function box(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, w: r.width, h: r.width * 0.8 };
}

/** Phone "lane": Teddy peeks over the bottom bar, switching sides at each new scene. */
const LANE = {
  width: 180, // 300px rig at 0.6
  left: -72,
  right: (vw: number) => vw - 185,
  fromBottom: 167, // head and paws show above the action bar
  hop: 40, // how far he stands up as a scene boundary passes
  hopZone: 160, // px either side of a boundary
};

function useMode() {
  const [mode, setMode] = useState<"street" | "lane" | null>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const pick = () => setMode(desktop.matches ? "street" : "lane");
    pick();
    desktop.addEventListener("change", pick);
    return () => desktop.removeEventListener("change", pick);
  }, []);
  return mode;
}

/**
 * Teddy walks the home page with you. Every section has a "stop" where a
 * posed Teddy sits; once this runs, those are hidden and a single Teddy on a
 * fixed layer takes over.
 *
 * - Street (desktop): he trots from stop to stop as you scroll, easing into
 *   each pose when he arrives and hopping behind the quilt or into his basket.
 * - Lane (phones and touch): the in-between stops are hidden, so he climbs out
 *   of the hero, peeks over the bottom bar and trots to the other side at each
 *   new scene, then hops into his basket in the footer.
 */
export function PupJourney() {
  const [frame, setFrame] = useState<Frame | null>(null);
  const mode = useMode();
  const stops = useRef<Stop[]>([]);

  useEffect(() => {
    if (!mode) return;
    stops.current = Array.from(document.querySelectorAll<HTMLElement>("[data-pup-stop]")).map((el) => ({
      el,
      pose: (el.dataset.pose as PupPose) ?? "sit",
      behind: el.dataset.behind === "true",
      lane: el.dataset.lane === "true",
    }));
    const laneStops = stops.current.filter((s) => s.lane);
    if (mode === "street" ? stops.current.length < 2 : laneStops.length < 2) return;
    document.documentElement.setAttribute("data-pup", mode === "lane" ? "lane" : "");

    let raf = 0;
    const tick = mode === "street" ? streetTicker(stops.current, setFrame) : laneTicker(laneStops, setFrame);
    const loop = (now: number) => {
      tick(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.removeAttribute("data-pup");
      setFrame(null);
    };
  }, [mode]);

  if (!frame) return null;
  return (
    <div className="pup-layer" data-front={!frame.behind} aria-hidden="true">
      <div
        className="pup-actor"
        data-walking={frame.walking ? "" : undefined}
        style={{ transform: `translate3d(${frame.x.toFixed(1)}px, ${frame.y.toFixed(1)}px, 0)` }}
      >
        <div className="pup-actor__body" style={{ transform: `scale(${(frame.w / 300).toFixed(4)})` }}>
          <Pup spec={frame.spec} flip={frame.flip} />
        </div>
      </div>
    </div>
  );
}

/** Desktop: blend between the two stops either side of a probe line at 55% of the viewport. */
function streetTicker(stops: Stop[], setFrame: (f: Frame) => void) {
  let lastX = 0;
  let facing = 1;
  let moving = 0;
  let scrolled = 0;
  let lastScroll = window.scrollY;

  return (now: number) => {
    const probe = window.innerHeight * 0.55;
    const list = stops.map((s) => {
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
    const x = mix(a.b.x, b.b.x, k);
    const w = mix(a.b.w, b.b.w, k);
    // A little hop between stops.
    const arc = Math.sin(Math.PI * k) * -Math.min(80, Math.abs(b.b.x - a.b.x) * 0.12);
    const y = mix(a.b.y, b.b.y, k) + arc;

    const walking = walk > 0 && walk < 1;
    let spec: PoseSpec;
    if (!walking) spec = POSES[(walk >= 1 ? b : a).s.pose];
    else if (k < 0.25) spec = lerpPose(POSES[a.s.pose], POSES.walk, k / 0.25);
    else if (k > 0.75) spec = lerpPose(POSES.walk, POSES[b.s.pose], (k - 0.75) / 0.25);
    else spec = POSES.walk;

    if (Math.abs(x - lastX) > 0.5) {
      facing = x < lastX ? -1 : 1;
      moving = now;
    }
    if (!walking) facing = 1;
    lastX = x;
    if (window.scrollY !== lastScroll) {
      scrolled = now;
      lastScroll = window.scrollY;
    }
    // Trot while travelling between stops, or on the treadmill while the street scrolls.
    const trotting = (walking && now - moving < 180) || (!walking && spec === POSES.walk && now - scrolled < 180);

    const near = walk < 0.5 ? a : b;
    setFrame({
      x,
      y,
      w,
      spec,
      flip: facing,
      walking: trotting,
      behind: near.s.behind && (walk <= 0.05 || walk >= 0.95),
    });
  };
}

/** Phones: hero stop → bottom lane (left/right per scene) → basket stop. */
function laneTicker(stops: Stop[], setFrame: (f: Frame) => void) {
  const first = stops[0];
  const last = stops[stops.length - 1];
  const scenes = Array.from(document.querySelectorAll<HTMLElement>("main section.tp-scene"));

  // Smoothed state, so he trots across instead of teleporting.
  let laneX = LANE.left;
  let rise = 0;
  let stand = 0;
  let flip = 1;
  let prev = performance.now();

  return (now: number) => {
    const dt = Math.min(64, now - prev);
    prev = now;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const probe = vh * 0.55;

    // Which scene is under the probe line? Hero = 0, then alternate sides: left, right, left…
    const tops = scenes.map((s) => s.getBoundingClientRect().top);
    let idx = 0;
    tops.forEach((top, i) => {
      if (top <= probe) idx = i;
    });
    const side: "left" | "right" = idx % 2 === 1 || idx === 0 ? "left" : "right";
    const targetX = side === "left" ? LANE.left : LANE.right(vw);

    // He stands up as a scene boundary passes the probe line.
    const nearest = tops.slice(1).reduce((d, top) => Math.min(d, Math.abs(top - probe)), Infinity);
    const targetRise = LANE.hop * clamp01(1 - nearest / LANE.hopZone);

    const follow = 1 - Math.exp(-dt / 140);
    laneX += (targetX - laneX) * follow;
    rise += (targetRise - rise) * (1 - Math.exp(-dt / 90));
    const gap = targetX - laneX;
    const walking = Math.abs(gap) > 3;
    stand += ((walking ? 1 : rise / LANE.hop) - stand) * (1 - Math.exp(-dt / 110));

    // Face where he's going; once parked, turn to face into the screen.
    const targetFlip = walking ? Math.sign(gap) : side === "left" ? 1 : -1;
    const turn = dt / 220;
    flip = Math.abs(targetFlip - flip) <= turn ? targetFlip : flip + Math.sign(targetFlip - flip) * turn;

    const lane = {
      x: laneX,
      y: vh - LANE.fromBottom - rise,
      w: LANE.width,
      spec: lerpPose(POSES.peek, POSES.walk, clamp01(stand)),
    };

    // Climb out of the hero, and into the basket at the end.
    const out = ease(clamp01((window.scrollY - 80) / 520));
    const basket = box(last.el);
    const into = ease(clamp01((vh + 400 - basket.y) / 600));
    const hero = box(first.el);

    const from = out < 1 ? hero : null;
    let x = lane.x;
    let y = lane.y;
    let w = lane.w;
    let spec = lane.spec;
    if (from) {
      x = mix(from.x, x, out);
      y = mix(from.y, y, out) - Math.sin(Math.PI * out) * 30;
      w = mix(from.w, w, out);
      spec = lerpPose(POSES[first.pose], spec, out);
    }
    if (into > 0) {
      x = mix(x, basket.x, into);
      // Rise straight to the basket even while it is still below the fold.
      y = mix(y, Math.min(basket.y, lane.y), into) - Math.sin(Math.PI * into) * 30;
      w = mix(w, basket.w, into);
      spec = lerpPose(spec, POSES[last.pose], into);
    }

    setFrame({
      x,
      y,
      w,
      spec,
      flip: into > 0.5 || out < 0.5 ? 1 : flip,
      walking: walking && out >= 1 && into <= 0,
      behind: (out <= 0.05 && first.behind) || (into >= 0.95 && last.behind),
    });
  };
}

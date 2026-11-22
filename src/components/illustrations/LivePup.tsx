"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { lerpPose, POSES, Pup, type PoseSpec, type PupPose } from "./Pup";

type Look = { spec: PoseSpec; blink: number; shut: number; lift: number };
type Trick = { say: string; ms: number; needsBody?: boolean; apply: (base: PoseSpec, k: number, out: Look) => void };

const TAU = Math.PI * 2;
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const rand = (a: number, b: number) => a + Math.random() * (b - a);
/** 0 → 1 → 0 over a trick: quick in, hold, ease out. */
const envelope = (k: number) => Math.min(clamp01(k / 0.15), clamp01((1 - k) / 0.22));

const clone = (p: PoseSpec): PoseSpec => ({
  ...p,
  body: { ...p.body },
  front: [...p.front],
  haunch: { ...p.haunch },
  head: { ...p.head },
  ears: [...p.ears],
});

const TRICKS: Trick[] = [
  {
    say: "treat, please?",
    ms: 2400,
    needsBody: true,
    apply: (base, k, out) => {
      const e = envelope(k);
      const beg: PoseSpec = {
        ...clone(base),
        body: { ...base.body, y: -6, rotate: -36 },
        head: { x: -18, y: -18, rotate: 0 },
        front: [-27, -27],
        happy: 1,
      };
      out.spec = lerpPose(out.spec, beg, e);
      out.spec.tail += 14 * Math.sin(TAU * k * 9) * e;
    },
  },
  {
    say: "play with me!",
    ms: 2400,
    needsBody: true,
    apply: (_, k, out) => {
      out.spec = lerpPose(out.spec, POSES.bow, envelope(k));
    },
  },
  {
    say: "I like you!",
    ms: 2400,
    apply: (base, k, out) => {
      const e = envelope(k);
      if (base.body.opacity > 0.5) out.spec = lerpPose(out.spec, POSES.bow, e);
      out.spec.happy = Math.max(out.spec.happy, e);
    },
  },
  {
    say: "woof woof!",
    ms: 1800,
    apply: (_, k, out) => {
      const e = envelope(k);
      const bark = Math.abs(Math.sin(Math.PI * clamp01(k / 0.7) * 2));
      out.spec.head.y -= 6 * bark * e;
      out.spec.head.rotate -= 5 * bark * e;
      out.spec.ears = [out.spec.ears[0] - 12 * bark * e, out.spec.ears[1] + 12 * bark * e];
    },
  },
  {
    say: "achoo!",
    ms: 1900,
    apply: (_, k, out) => {
      // Wind up with eyes squeezed shut, then a little jerk forward.
      const wind = clamp01((k - 0.1) / 0.3) * (1 - clamp01((k - 0.55) / 0.15));
      const jerk = Math.sin(Math.PI * clamp01((k - 0.4) / 0.22));
      out.shut = Math.max(out.shut, wind);
      out.spec.head.y += -3 * wind + 7 * jerk;
      out.spec.head.rotate += 9 * jerk;
    },
  },
  {
    say: "boing!",
    ms: 1600,
    needsBody: true,
    apply: (_, k, out) => {
      const hop = Math.sin(Math.PI * clamp01(k / 0.5));
      const e = envelope(k);
      out.lift = 42 * hop;
      out.spec.front = [out.spec.front[0] - 66 * hop, out.spec.front[1] - 66 * hop];
      out.spec.happy = Math.max(out.spec.happy, 0.5 * e);
    },
  },
  {
    say: "hm?",
    ms: 1700,
    apply: (_, k, out) => {
      out.spec.head.rotate += 13 * envelope(k);
    },
  },
];

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Teddy, alive: he breathes, wags, blinks and tilts his head now and then
 * ("hm?"), and does a trick with a speech bubble when you tap him. The loop
 * only runs while he's on screen; reduced motion keeps him still.
 */
export function LivePup({
  pose,
  label,
  facing = "right",
  className,
}: {
  pose: PupPose;
  label?: string;
  facing?: "left" | "right";
  className?: string;
}) {
  const base = POSES[pose];
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [look, setLook] = useState<Look>({ spec: base, blink: 0, shut: 0, lift: 0 });
  const [bubble, setBubble] = useState<{ text: string; show: boolean }>({ text: "", show: false });
  const [playing, setPlaying] = useState(false);
  const trick = useRef<{ t: Trick; start: number } | null>(null);
  const lastTrick = useRef<Trick | null>(null);
  const bubbleTimer = useRef(0);

  const say = (text: string, ms: number) => {
    window.clearTimeout(bubbleTimer.current);
    setBubble({ text, show: true });
    bubbleTimer.current = window.setTimeout(() => setBubble((b) => ({ ...b, show: false })), ms);
  };

  const play = (t: Trick) => {
    trick.current = { t, start: performance.now() };
    lastTrick.current = t;
    setPlaying(true);
    say(t.say, t.ms - 250);
  };

  const onPointerDown = (e: ReactPointerEvent) => {
    if (!live || trick.current || e.button > 0) return;
    const body = base.body.opacity > 0.5;
    const options = TRICKS.filter((t) => (body || !t.needsBody) && t !== lastTrick.current);
    play(options[Math.floor(Math.random() * options.length)]);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    setLive(true);

    const seed = Math.random() * 10_000;
    let raf = 0;
    let visible = false;
    let tilt = 0;
    let tiltTarget = 0;
    let nextTilt = performance.now() + rand(1200, 3000);
    let nextBlink = performance.now() + rand(1500, 4500);
    let blinkAt = -1;
    let doubleBlink = false;
    let nextHm = performance.now() + rand(6000, 10_000);
    let prev = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(64, now - prev);
      prev = now;
      // Hidden while the roaming Teddy stands in for this stop.
      if (el.closest(".pup-stop") && document.documentElement.hasAttribute("data-pup")) return;

      const t = now + seed;
      const out: Look = { spec: clone(base), blink: 0, shut: 0, lift: 0 };
      const breath = Math.sin((TAU * t) / 3300);
      out.spec.body.y += 0.6 * breath;
      out.spec.head.y += 0.9 * breath;
      out.spec.tail += 16 * Math.sin((TAU * t) / 450);

      // Curious head tilts every couple of seconds.
      if (now > nextTilt) {
        tiltTarget = [-13, -10, 0, 0, 10, 13][Math.floor(Math.random() * 6)];
        nextTilt = now + rand(1500, 3500);
      }
      // …and now and then a puzzled "hm?".
      if (now > nextHm && !trick.current) {
        tiltTarget = Math.random() < 0.5 ? -13 : 13;
        nextTilt = now + 1800;
        say("hm?", 1500);
        nextHm = now + rand(8000, 12_000);
      }
      tilt += (tiltTarget - tilt) * (1 - Math.exp(-dt / 250));
      out.spec.head.rotate += tilt;

      // Blinks (sometimes two in a row).
      if (now > nextBlink) {
        blinkAt = now;
        doubleBlink = Math.random() < 0.3;
        nextBlink = now + rand(2500, 5500);
      }
      if (blinkAt > 0) {
        const b = now - blinkAt;
        const one = (x: number) => (x >= 0 && x < 140 ? 1 - Math.abs(x - 70) / 70 : 0);
        out.blink = Math.max(one(b), doubleBlink ? one(b - 260) : 0);
        if (b > 420) blinkAt = -1;
      }

      const active = trick.current;
      if (active) {
        const k = (now - active.start) / active.t.ms;
        if (k >= 1) {
          trick.current = null;
          setPlaying(false);
        } else active.t.apply(base, k, out);
      }
      setLook(out);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(bubbleTimer.current);
    };
  }, [base]);

  return (
    <div
      ref={ref}
      className={`pup-buddy ${className ?? ""}`}
      data-facing={facing}
      data-live={live ? "" : undefined}
      data-playing={playing ? "" : undefined}
      onPointerDown={onPointerDown}
    >
      <Pup spec={live ? look.spec : base} blink={look.blink} shut={look.shut} lift={look.lift} facing={facing} label={label} />
      <span aria-hidden="true" className="pup-bubble" data-show={bubble.show ? "true" : "false"}>
        {bubble.text}
      </span>
    </div>
  );
}

/**
 * Hand-drawn shapes for the sketchbook cards.
 *
 * Each card gets a wobbly watercolour wash, a wobbly photo mask, an ink
 * outline and a partial "retrace" stroke, plus a couple of doodles. Shapes are
 * generated from a seed (the puppy's slug) so every card is unique but
 * identical on every render — server and client agree.
 */

/** Small deterministic PRNG (mulberry32). */
export function rng(seedText: string) {
  let h = 1779033703 ^ seedText.length;
  for (let i = 0; i < seedText.length; i++) {
    h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = [number, number];
const f = (n: number) => n.toFixed(2);

/** Points around a wobbly circle centred at 50,50. */
function wobble(rand: () => number, radius: number, amount: number, from = 0, sweep = Math.PI * 2, n = 48): Pt[] {
  const waves = [1, 2, 3].map((k) => ({ k, amp: (rand() - 0.5) * amount * (1 / k), phase: rand() * Math.PI * 2 }));
  const sx = 1 + (rand() - 0.5) * 0.08;
  const sy = 1 + (rand() - 0.5) * 0.08;
  const pts: Pt[] = [];
  for (let i = 0; i <= n; i++) {
    const t = from + (sweep * i) / n;
    const r = radius + waves.reduce((acc, w) => acc + w.amp * Math.sin(w.k * t + w.phase), 0);
    pts.push([50 + Math.cos(t) * r * sx, 50 + Math.sin(t) * r * sy]);
  }
  return pts;
}

/** Smooth Catmull-Rom through the points, written as cubic Béziers. */
function smooth(pts: Pt[], closed: boolean) {
  const p = (i: number) => (closed ? pts[(i + pts.length) % pts.length] : pts[Math.max(0, Math.min(pts.length - 1, i))]);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  const last = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < last; i++) {
    const [p0, p1, p2, p3] = [p(i - 1), p(i), p(i + 1), p(i + 2)];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
}

const DOODLES = {
  spiral: { d: "M0 0c1.6-.6 2.4 1.4.8 2.6-2 1.4-4.6-.4-4-3 .7-3 4.8-3.8 6.8-1.2 2.4 3-0.2 7.4-3.8 7.2", stroke: true },
  dash: { d: "M-5 -5l4 2M-6 0h5M-5 5l4 -2", stroke: true },
  sparkle: { d: "M0 -6c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6z", stroke: false },
  heart: {
    d: "M0 5C-4.6 1.8-6.4-.8-6.4-3.2c0-1.9 1.5-3.3 3.3-3.3 1.3 0 2.4.7 3.1 1.9.7-1.2 1.8-1.9 3.1-1.9 1.8 0 3.3 1.4 3.3 3.3C6.4-.8 4.6 1.8 0 5z",
    stroke: true,
  },
  paw: { d: "PAW", stroke: false },
} as const;
export type DoodleKind = keyof typeof DOODLES;
const INKS = ["#c2622b", "#a24a1a", "#d4893f", "#2a170e"];

export type Doodle = { kind: DoodleKind; d: string; stroke: boolean; color: string; x: number; y: number; rotate: number; scale: number };

export type Sketch = {
  wash: string;
  washShift: string;
  mask: string;
  line: string;
  retrace: string;
  doodles: Doodle[];
  tilt: number;
};

export function sketch(seed: string, tilt?: number): Sketch {
  const rand = rng(seed);
  const start = rand() * Math.PI * 2;
  const kinds = Object.keys(DOODLES) as DoodleKind[];
  const doodleCount = 2 + Math.round(rand());
  const doodles: Doodle[] = [];
  for (let i = 0; i < doodleCount; i++) {
    const kind = kinds[Math.floor(rand() * kinds.length)];
    // sit just outside the outline, spread around the card
    const angle = start + (i * Math.PI * 2) / doodleCount + rand() * 0.8;
    const r = 52 + rand() * 6;
    doodles.push({
      kind,
      ...DOODLES[kind],
      color: INKS[Math.floor(rand() * INKS.length)],
      x: 50 + Math.cos(angle) * r,
      y: 50 + Math.sin(angle) * r,
      rotate: Math.round((rand() - 0.5) * 40),
      scale: 0.6 + rand() * 0.25,
    });
  }
  const sweep = Math.PI * (0.55 + rand() * 0.35);
  return {
    wash: smooth(wobble(rand, 46, 6), true),
    washShift: `${f(-5 + rand() * 5)}% ${f(4 + rand() * 3)}%`,
    mask: smooth(wobble(rand, 45.5, 5), true),
    line: smooth(wobble(rand, 47.5, 6), true),
    retrace: smooth(wobble(rand, 50, 7, start, sweep, 30), false),
    doodles,
    tilt: tilt ?? Number(((rand() - 0.35) * 4).toFixed(2)),
  };
}

/** The photo mask as a data-URL SVG (so it can be used in CSS `mask-image`). */
export function maskUrl(path: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="${path}" fill="#000"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

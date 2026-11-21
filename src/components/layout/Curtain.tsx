"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { PAW_PATH } from "@/components/illustrations/Icons";
import { useUi } from "@/store/ui";

const PRINTS = [
  { left: "18%", top: 6, rotate: 14, delay: 0.16 },
  { left: "27%", top: -4, rotate: 6, delay: 0.28 },
  { left: "36%", top: 7, rotate: 18, delay: 0.4 },
  { left: "45%", top: -3, rotate: 4, delay: 0.52 },
  { left: "54%", top: 6, rotate: 16, delay: 0.64 },
];

const INK = "#2a170e";
const line = { stroke: INK, strokeWidth: 3.4, strokeLinejoin: "round", strokeLinecap: "round" } as const;

function RunnerLeg({ cls, x, y, d, fill, toe }: { cls: string; x: number; y: number; d: string; fill: string; toe: number }) {
  return (
    <g className={`tp-runner__leg tp-runner__leg--${cls}`} style={{ transformOrigin: `${x}px ${y}px` }}>
      <g transform={`translate(${x} ${y})`}>
        <path d={`${d}Z`} fill={fill} />
        <path d={d} {...line} fill="none" />
        <path d={`M-3.5 ${toe} v5 M4.5 ${toe} v5`} {...line} strokeWidth={2.4} fill="none" />
      </g>
    </g>
  );
}

/** Teddy mid-gallop: the same rig as the mascot, with CSS-animated legs, tail and ears. */
function Runner() {
  return (
    <svg viewBox="0 0 300 240" className="tp-runner" aria-hidden="true" focusable="false" style={{ overflow: "visible" }}>
      <ellipse cx="150" cy="230" rx="86" ry="7" fill={INK} opacity="0.12" className="tp-runner__shadow" />
      <g className="tp-runner__body">
        <RunnerLeg cls="bf" x={94} y={192} fill="#e4a352" toe={29} d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14" />
        <RunnerLeg cls="ff" x={168} y={192} fill="#e4a352" toe={29} d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14" />
        <g className="tp-runner__tail" style={{ transformOrigin: "84px 150px" }}>
          <path d="M86 152 C80 146 76 140 74 136" {...line} strokeWidth={9} fill="none" />
          <path d="M86 152 C80 146 76 140 74 136" stroke="#f2be6b" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path
            d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
            fill="#f2be6b"
            {...line}
          />
        </g>
        <RunnerLeg cls="bn" x={110} y={194} fill="#f2be6b" toe={27} d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14" />
        <path
          d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
          fill="#f2be6b"
          {...line}
        />
        <path
          d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
          fill="#f2be6b"
          {...line}
        />
        <RunnerLeg cls="fn" x={186} y={194} fill="#f2be6b" toe={27} d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14" />
        <g className="tp-runner__head">
          <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" {...line} strokeWidth={3} />
          <path
            d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
            fill="#fbe3b4"
            {...line}
            strokeWidth={2.4}
          />
          <path
            d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
            fill="#e4a352"
            {...line}
            className="tp-runner__ear"
            style={{ transformOrigin: "174px 82px" }}
          />
          <path
            d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
            fill="#e4a352"
            {...line}
            className="tp-runner__ear tp-runner__ear--r"
            style={{ transformOrigin: "250px 82px" }}
          />
          <path
            d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
            fill="#f2be6b"
            {...line}
          />
          <path
            d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
            fill="#f2be6b"
            {...line}
            strokeWidth={3}
          />
          <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill="#fbe3b4" />
          <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
          <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
          <path d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101" {...line} fill="none" />
          <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill={INK} />
          <path d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" {...line} strokeWidth={3} fill="none" />
          <path d="M207.6 127.4 Q212 136.6 216.4 127.4 Z" fill="#e98c8c" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  );
}

function Scallop({ edge }: { edge: "top" | "bottom" }) {
  return (
    <svg className={`tp-curtain__edge tp-curtain__edge--${edge}`} width="100%" height="40" preserveAspectRatio="none">
      {edge === "top" && (
        <defs>
          <pattern id="tp-curtain-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fbe3b4" />
            <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke={INK} strokeWidth="3" />
            <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke={INK} strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
          </pattern>
        </defs>
      )}
      <rect width="100%" height="40" fill="url(#tp-curtain-scallop)" />
    </svg>
  );
}

/**
 * A quilted blanket that sweeps up over the page while Teddy runs across it.
 * Plays once on first load ("intro") and on every in-site navigation.
 */
export function Curtain() {
  const router = useRouter();
  const pathname = usePathname();
  const { curtain, setCurtain } = useUi();
  const pending = useRef<string | null>(null);

  // First paint: the CSS "intro" animation lifts the blanket, then we rest.
  useEffect(() => {
    const t = window.setTimeout(() => setCurtain("idle"), 1100);
    return () => window.clearTimeout(t);
  }, [setCurtain]);

  // Intercept same-origin link clicks to cover the page before navigating.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page (hash / filters) — no curtain
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      pending.current = url.pathname + url.search + url.hash;
      setCurtain("covering");
      window.setTimeout(() => {
        setCurtain("covered");
        if (pending.current) router.push(pending.current);
      }, 320);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, setCurtain]);

  // Route arrived: scroll to top and lift.
  useEffect(() => {
    if (useUi.getState().curtain !== "covered") return;
    pending.current = null;
    if (!location.hash) window.scrollTo(0, 0);
    setCurtain("lifting");
    const t = window.setTimeout(() => setCurtain("idle"), 480);
    return () => window.clearTimeout(t);
  }, [pathname, setCurtain]);

  return (
    <div className="tp-curtain" data-state={curtain} aria-hidden="true">
      <div className="tp-curtain__blanket">
        <Scallop edge="top" />
        <div className="tp-curtain__stage">
          <div className="tp-curtain__prints">
            {PRINTS.map((p, i) => (
              <svg
                key={i}
                viewBox="0 0 64 64"
                className="tp-curtain__print"
                style={{ left: p.left, top: p.top, rotate: `${p.rotate}deg`, animationDelay: `${p.delay}s` }}
              >
                <path d={PAW_PATH} />
              </svg>
            ))}
          </div>
          <div className="tp-curtain__runner">
            <Runner />
          </div>
          <p className="tp-curtain__note font-scrawl">every puppy is family</p>
        </div>
        <Scallop edge="bottom" />
      </div>
    </div>
  );
}

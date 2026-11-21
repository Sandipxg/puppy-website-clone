"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Paw } from "@/components/illustrations/Icons";
import { PupStop } from "@/components/illustrations/Pup";
import { Photo } from "@/components/ui/Photo";
import { available, cover, doorMeta } from "@/lib/puppies";
import { Scene } from "./Scene";

const DOOR_COLOURS = ["#a24a1a", "#5a3a28", "#d4893f", "#b8644a", "#7a4a2e"];
/** The street moves 1.25px sideways for every 1px scrolled. */
const SPEED = 1.25;

/**
 * "Meet the pups": a street of front doors. On wide screens the section pins
 * and vertical scrolling walks you sideways down the street while Teddy trots
 * on the spot; each door swings open as it reaches him. On phones it is a grid
 * whose doors open with scroll-driven CSS.
 */
export function MeetThePups() {
  const rangeRef = useRef<HTMLDivElement>(null);
  const hallRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const [open, setOpen] = useState<boolean[]>([]);
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const range = rangeRef.current;
    const hall = hallRef.current;
    const track = trackRef.current;
    if (!pinned || !range || !hall || !track) {
      if (track) track.style.transform = "none";
      return;
    }
    let dist = 0;
    const measure = () => {
      dist = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(dist);
    };
    const doors = Array.from(track.querySelectorAll<HTMLElement>(".tp-door"));
    let frame = 0;
    let rest = 0;
    const onScroll = () => {
      setWalking(true);
      window.clearTimeout(rest);
      rest = window.setTimeout(() => setWalking(false), 160);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = range.getBoundingClientRect().top;
        const progress = dist ? Math.min(1, Math.max(0, (-top * SPEED) / dist)) : 0;
        const x = -progress * dist;
        track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
        hall.style.setProperty("--floor-x", `${x.toFixed(1)}px`);
        // A door opens once it has walked up to (just past) Teddy.
        const vw = window.innerWidth;
        setOpen((prev) => {
          const next = doors.map((d) => d.getBoundingClientRect().left < vw * 0.62);
          return next.every((v, i) => v === prev[i]) ? prev : next;
        });
      });
    };
    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(rest);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  return (
    <Scene
      id="meet"
      className="tp-meet"
      sky={{ top: "#fff1d8", bottom: "#fbe3b4" }}
      attrs={pinned ? { "data-pinned": "true", ...(walking ? { "data-walking": "" } : {}) } : undefined}
    >
      <div
        ref={rangeRef}
        data-pin-range="true"
        style={pinned ? ({ "--pinned": 1, height: `calc(${Math.round(distance / SPEED)}px + 100vh)` } as CSSProperties) : undefined}
      >
        <div className="tp-meet__stage">
          <header className="tp-meet__head gutter">
            <div>
              <h2 id="meet-title" className="font-plush text-huge">
                Meet the pups
              </h2>
              <p className="text-lede mt-3 max-w-[44ch] text-[var(--ink-soft)]">
                Real puppies, real photos, looking for their families right now.
              </p>
            </div>
            <Link className="btn btn-primary shrink-0" href="/puppies">
              See all available puppies
            </Link>
          </header>
          <div ref={hallRef} className="tp-meet__hall">
            <ol ref={trackRef} className="tp-meet__track" data-treadmill="true" aria-label="Puppies looking for a family">
              {available.map((p, i) => (
                <li key={p.slug} className="tp-door" data-open={pinned ? Boolean(open[i]) : false}>
                  <Link
                    className="tp-door__link"
                    style={{ "--door": DOOR_COLOURS[i % DOOR_COLOURS.length] } as CSSProperties}
                    href={`/puppies/${p.slug}`}
                  >
                    <span className="tp-door__plate">
                      <span className="font-plush tp-door__name">{p.name}</span>
                      <span className="tp-door__meta">{doorMeta(p)}</span>
                    </span>
                    <span className="tp-door__frame">
                      <span className="tp-door__room">
                        <Photo img={cover(p)} sizes="(max-width: 768px) 45vw, 260px" />
                      </span>
                      <span aria-hidden="true" className="tp-door__way">
                        <span className="tp-door__leaf">
                          <Paw className="tp-door__peephole" />
                          <span className="tp-door__knob" />
                        </span>
                      </span>
                      <span className="tp-door__tag font-scrawl">Available</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="tp-door tp-door--all" data-open="false">
                <Link className="tp-door__link" href="/puppies">
                  <span className="tp-door__frame tp-door__frame--all">
                    <span className="font-plush tp-door__all">Meet them all</span>
                  </span>
                </Link>
              </li>
            </ol>
            <div aria-hidden="true" className="tp-meet__floor" />
            <PupStop pose="walk" act="treadmill" className="tp-meet__teddy" />
          </div>
        </div>
      </div>
    </Scene>
  );
}

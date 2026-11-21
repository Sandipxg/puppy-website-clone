"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { PupStop } from "@/components/illustrations/Pup";
import { Photo } from "@/components/ui/Photo";
import { available, cover } from "@/lib/puppies";
import { external, site } from "@/lib/site";
import type { Puppy } from "@/types/content";
import { Scene } from "./Scene";

/** Where each arch sits on the quilt: position, width, how far it peeks out, tilt. */
const SEATS = [
  { x: "9%", w: "8.6rem", peek: 0.62, tilt: -5 },
  { x: "22.5%", w: "10.4rem", peek: 0.8, tilt: 3 },
  { x: "35%", w: "9.2rem", peek: 0.7, tilt: -2 },
  { x: "65%", w: "9.4rem", peek: 0.74, tilt: 3 },
  { x: "77.5%", w: "10.6rem", peek: 0.82, tilt: -3 },
  { x: "91%", w: "8.4rem", peek: 0.6, tilt: 4 },
];

const seatStyle = (i: number) =>
  ({
    "--x": SEATS[i].x,
    "--w": SEATS[i].w,
    "--peek": SEATS[i].peek,
    "--tilt": `${SEATS[i].tilt}deg`,
    "--i": i,
  }) as CSSProperties;

type SeatState = "idle" | "duck" | "pop";

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Six puppies peeking over the quilt. Every few seconds one ducks down and a
 * different puppy pops up in its place.
 */
function Lineup() {
  // Server renders a stable order; the client shuffles after hydrating.
  const [order, setOrder] = useState<Puppy[]>(available);
  const [states, setStates] = useState<SeatState[]>(SEATS.map(() => "idle"));
  const [tag, setTag] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomness must wait for hydration
    setOrder(shuffle(available));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let seat = -1;
    const timers: number[] = [];
    const swap = () => {
      seat = (seat + 1 + Math.floor(Math.random() * (SEATS.length - 1))) % SEATS.length;
      const s = seat;
      setStates((prev) => prev.map((v, i) => (i === s ? "duck" : v)));
      timers.push(
        window.setTimeout(() => {
          setOrder((prev) => {
            // Bring the first off-stage puppy into this seat.
            const next = [...prev];
            const [incoming] = next.splice(SEATS.length, 1);
            const [leaving] = next.splice(s, 1, incoming);
            next.push(leaving);
            return next;
          });
          setStates((prev) => prev.map((v, i) => (i === s ? "pop" : v)));
        }, 360),
        window.setTimeout(() => setStates((prev) => prev.map((v, i) => (i === s ? "idle" : v))), 1000),
      );
    };
    const loop = window.setInterval(swap, 3400);
    return () => {
      window.clearInterval(loop);
      timers.forEach(window.clearTimeout);
    };
  }, []);

  const shown = order.slice(0, SEATS.length);
  const waiting = order[SEATS.length];

  return (
    <>
      <ul className="tp-lineup" aria-label="Some of the puppies in our showroom">
        {shown.map((p, i) => (
          <li key={i} className="tp-lineup__seat" style={seatStyle(i)}>
            <Link
              className="tp-lineup__pup"
              data-pup-friend="true"
              data-state={states[i] === "idle" ? undefined : states[i]}
              aria-label={`Meet ${p.name}, ${p.breed}`}
              href={`/puppies/${p.slug}`}
              onPointerEnter={() => setTag(i)}
              onPointerLeave={() => setTag(null)}
              onFocus={() => setTag(i)}
              onBlur={() => setTag(null)}
            >
              <span className="tp-lineup__photo">
                <Photo img={cover(p)} sizes="180px" priority={i < 3} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <ul aria-hidden="true" className="tp-lineup tp-lineup--tags">
        {shown.map((p, i) => (
          <li key={i} className="tp-lineup__seat" style={seatStyle(i)}>
            <span className="tp-lineup__ghost" data-tag={tag === i ? "show" : undefined}>
              <span className="tp-lineup__name font-scrawl">{p.name}</span>
            </span>
          </li>
        ))}
      </ul>
      {/* Preload the next puppy so the pop-up never shows an empty arch. */}
      {waiting && (
        <span aria-hidden="true" className="tp-lineup__wings">
          <Photo img={cover(waiting)} alt="" sizes="180px" />
        </span>
      )}
    </>
  );
}

function Quilt() {
  return (
    <div aria-hidden="true" className="tp-quilt">
      <svg className="tp-quilt__edge" width="100%" height="40" preserveAspectRatio="none">
        <defs>
          <pattern id="tp-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 40V27A38 25 0 0 1 76 27V40Z" style={{ fill: "var(--quilt)" }} />
            <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
            <path
              d="M11 33A27 19 0 0 1 65 33"
              fill="none"
              stroke="#2a170e"
              strokeWidth="1.6"
              strokeDasharray="3.5 5.5"
              strokeLinecap="round"
              opacity=".42"
            />
          </pattern>
        </defs>
        <rect width="100%" height="40" fill="url(#tp-scallop)" />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <Scene id="hero" className="tp-hero" sky={{ top: "#fffdf8", bottom: "#fff1d8", quilt: "#fff1d8" }}>
      <span aria-hidden="true" className="tp-hero__sun" />
      <div className="tp-hero__copy gutter">
        <p className="tp-hero__note font-scrawl">
          every puppy is family
          <svg
            viewBox="0 0 220 24"
            preserveAspectRatio="none"
            className="absolute -bottom-2 left-0 h-3 w-full text-toffee"
            aria-hidden="true"
          >
            <path
              d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
        <h1 id="hero-title" className="tp-hero__title font-plush">
          <span className="tp-hero__line">Premium teacup</span>
          <span className="tp-hero__line tp-hero__line--2">puppies in Dubai</span>
        </h1>
        <p className="tp-hero__lede">
          Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders
          worldwide.
        </p>
        <div className="tp-hero__actions">
          <Link className="btn btn-primary" href="/puppies">
            View available puppies
          </Link>
          <a href={site.whatsapp} {...external} className="btn btn-ghost">
            Enquire on WhatsApp
          </a>
        </div>
      </div>
      <div className="tp-hero__stage">
        <Lineup />
        <PupStop
          pose="peek"
          act="peekaboo"
          lane
          behind
          className="tp-hero__teddy"
          label="Teddy, the TeddyPups puppy, peeking over the quilt"
        />
        <Quilt />
      </div>
    </Scene>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useId, useRef } from "react";
import { PupStop } from "@/components/illustrations/Pup";
import { Photo } from "@/components/ui/Photo";
import { showroom } from "@/data/showroom";
import { cover, getPuppy } from "@/lib/puppies";
import { Scene } from "./Scene";

const ROUTE = "M40 250 C 170 40, 470 20, 620 168";

/** A little plane that flies the dotted Korea → Dubai route as the section scrolls past. */
function Flight() {
  const clip = useId();
  const pathRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const passenger = getPuppy("korean-teacup-maltipoo-female");

  useEffect(() => {
    const path = pathRef.current;
    const plane = planeRef.current;
    if (!path || !plane) return;
    const total = path.getTotalLength();
    const place = (t: number) => {
      const at = path.getPointAtLength(t * total);
      const ahead = path.getPointAtLength(Math.min(total, t * total + 1));
      const angle = (Math.atan2(ahead.y - at.y, ahead.x - at.x) * 180) / Math.PI;
      plane.setAttribute("transform", `translate(${at.x.toFixed(1)} ${at.y.toFixed(1)}) rotate(${angle.toFixed(1)})`);
      plane.style.opacity = t <= 0 ? "0" : "1";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      place(0.55);
      return;
    }
    const svg = path.ownerSVGElement!;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = svg.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the scene enters from below, 1 when it is 25% from the top.
        const t = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75 + r.height)));
        place(t);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="tp-flight">
      <svg
        viewBox="0 0 660 300"
        role="img"
        aria-label={`A plane bringing a ${passenger?.breed ?? "Korean teacup"} puppy from Korea to Dubai`}
      >
        <defs>
          <clipPath id={clip}>
            <circle r="25" />
          </clipPath>
        </defs>
        <path ref={pathRef} d={ROUTE} className="tp-flight__route" />
        <circle cx="40" cy="250" r="7" className="tp-flight__dot" />
        <circle cx="620" cy="168" r="7" className="tp-flight__dot" />
        <text x="40" y="284" textAnchor="middle" className="tp-flight__label">
          Korea
        </text>
        <text x="620" y="202" textAnchor="middle" className="tp-flight__label">
          Dubai
        </text>
        <g ref={planeRef} transform="translate(40 250) rotate(-58.1)" style={{ opacity: 0 }}>
          <g transform="translate(-126 -78)">
            <path d="M28 60 L8 26 L34 26 L60 54 Z" className="tp-flight__wing" />
            <path d="M108 112 L142 156 L172 156 L158 112 Z" className="tp-flight__wing tp-flight__wing--far" />
            <path
              d="M20 80 C20 52 52 44 80 44 L168 44 C200 44 224 60 232 80 C224 100 200 112 168 112 L80 112 C52 112 20 104 20 80 Z"
              className="tp-flight__body"
            />
            <path d="M104 44 L138 2 L168 2 L154 44 Z" className="tp-flight__wing" />
            <path d="M206 64 C215 67 221 73 224 80" className="tp-flight__line" />
          </g>
          {passenger && (
            <g transform="translate(10 2)">
              <image
                href={cover(passenger).src}
                x="-25"
                y="-25"
                width="50"
                height="50"
                clipPath={`url(#${clip})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <circle r="25" className="tp-flight__porthole" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

export function TwoWays() {
  return (
    <Scene id="paths" className="tp-paths" sky={{ top: "#fbe3b4", bottom: "#f7d18d" }}>
      <div className="gutter mx-auto max-w-[110rem]">
        <h2 id="paths-title" className="tp-paths__title font-plush text-huge">
          Two ways to meet your puppy
        </h2>
        <div className="tp-fork">
          <div aria-hidden="true" className="tp-fork__post" />
          <article className="tp-way tp-way--left" aria-labelledby="way-local">
            <h3 id="way-local" className="tp-sign tp-sign--left font-plush">
              Puppies in Dubai
            </h3>
            <div className="tp-way__scene" data-pup-look="true">
              <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                <path
                  d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <figure className="tp-window">
                <span className="tp-window__glass">
                  <Photo img={showroom[0]} sizes="200px" />
                </span>
                <figcaption className="font-scrawl">In our showroom</figcaption>
              </figure>
            </div>
            <p className="tp-way__text">
              See them, love them, take them home. Come meet our locally available puppies before you decide.
            </p>
            <Link className="btn btn-primary" href="/puppies?origin=local">
              Meet local puppies
            </Link>
          </article>
          <article className="tp-way tp-way--right" aria-labelledby="way-imported">
            <h3 id="way-imported" className="tp-sign tp-sign--right font-plush">
              Imported for you
            </h3>
            <div className="tp-way__scene" data-pup-look="true">
              <Flight />
            </div>
            <p className="tp-way__text">
              Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us
              handle the import.
            </p>
            <Link className="btn btn-primary" href="/puppies?origin=imported">
              See imported puppies
            </Link>
          </article>
          <PupStop pose="sit" className="tp-fork__teddy" />
        </div>
      </div>
    </Scene>
  );
}

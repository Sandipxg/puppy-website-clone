"use client";

import Link from "next/link";
import { Flight } from "@/components/illustrations/Flight";
import { PupStop } from "@/components/illustrations/Pup";
import { Photo } from "@/components/ui/Photo";
import { showroom } from "@/data/showroom";
import { cover, getPuppy } from "@/lib/puppies";
import { Scene } from "./Scene";

export function TwoWays() {
  const korean = getPuppy("korean-teacup-maltipoo-female");
  const passenger = korean ? { src: cover(korean).src, breed: korean.breed } : undefined;
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
                  <Photo img={showroom[0]} sizes="(min-width: 1024px) 16rem, 60vw" />
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
              <Flight passenger={passenger} />
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

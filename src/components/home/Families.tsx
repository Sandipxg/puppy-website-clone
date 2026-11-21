"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { PupStop } from "@/components/illustrations/Pup";
import { PhotoViewer } from "@/components/ui/PhotoViewer";
import { Reveal } from "@/components/ui/Reveal";
import { captioned, homeViewerOrder } from "@/lib/families";
import { useViewer } from "@/store/viewer";
import { Scene } from "./Scene";

/** Hand-placed look for each print: tilt, washi-tape colour and position, reveal delay. */
export const PRINT_LOOKS = [
  { tilt: -2.2, tape: "#f6d79a", at: "center", d: 330 },
  { tilt: 1.6, tape: "#f9cdbf", at: "left", d: 0 },
  { tilt: -0.9, tape: "#cfe5f6", at: "right", d: 550 },
  { tilt: 2.4, tape: "#f6d79a", at: "tl", d: 110 },
  { tilt: -1.5, tape: "#e9dcc4", at: "center", d: 660 },
  { tilt: 0.8, tape: "#f6d79a", at: "right", d: 220 },
  { tilt: -2.6, tape: "#f9cdbf", at: "left", d: 770 },
  { tilt: 1.2, tape: "#cfe5f6", at: "center", d: 440 },
] as const;

/**
 * Dusk over Dubai: a testimonial, then a wall of polaroids hung on the
 * showroom's front, with the door, a street lamp and Teddy below.
 */
export function Families() {
  const open = useViewer((s) => s.open);
  return (
    <Scene id="families" titleId="dusk-title" className="tp-dusk" tone="dark" sky={{ top: "#a65a30", bottom: "#4d2b19" }}>
      <div className="tp-dusk__sky gutter">
        <div className="tp-dusk__head">
          <h2 id="dusk-title" className="font-plush text-huge">
            Happy families &amp; puppies
          </h2>
          <p className="text-lede mt-5 max-w-[50ch] text-[var(--ink-soft)]">
            We are truly honored to see our puppies become cherished members of loving families. These heartwarming
            moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </div>
        <figure className="tp-dusk__note">
          <blockquote className="font-plush-text">
            “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our
            Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave
            us complete peace of mind.”
          </blockquote>
          <figcaption className="font-scrawl">Sarah M., Dubai, UAE</figcaption>
        </figure>
      </div>

      <div className="tp-photowall">
        <div className="tp-photowall__wall">
          <Reveal>
            <ul className="tp-photowall__prints" aria-label="Photos from TeddyPups families">
              {captioned.slice(0, PRINT_LOOKS.length).map((photo, i) => {
                const look = PRINT_LOOKS[i];
                return (
                  <li key={photo.src} data-reveal="true" style={{ "--d": `${look.d}ms` } as CSSProperties}>
                    <button
                      type="button"
                      className="tp-photowall__print"
                      aria-label={`Open photo ${i + 1} of ${homeViewerOrder.length}: ${photo.caption}`}
                      onClick={() => open(homeViewerOrder, i)}
                    >
                      <span
                        className="tp-polaroid"
                        style={{ "--tilt": `${look.tilt}deg`, "--tape": look.tape, "--i": i } as CSSProperties}
                      >
                        <span aria-hidden="true" className={`tp-tape tp-tape--${look.at}`} />
                        <span className="tp-polaroid__photo">
                          <Image
                            alt={photo.alt}
                            src={photo.src}
                            width={photo.width}
                            height={photo.height}
                            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                            style={{ backgroundColor: photo.color }}
                          />
                        </span>
                        <span className="tp-polaroid__caption font-scrawl">{photo.caption}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          <div className="tp-facade__ground">
            <span aria-hidden="true" className="tp-facade__door" />
            <span aria-hidden="true" className="tp-lamp">
              <span className="tp-lamp__light" />
            </span>
            <Link className="btn btn-primary tp-facade__cta" href="/happy-families">
              See every happy family
            </Link>
            <PupStop pose="sit" className="tp-dusk__teddy" />
          </div>
        </div>
        <div aria-hidden="true" className="tp-street__pavement" />
      </div>
      <PhotoViewer />
    </Scene>
  );
}

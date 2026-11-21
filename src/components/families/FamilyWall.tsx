"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { Paw } from "@/components/illustrations/Icons";
import { PhotoViewer } from "@/components/ui/PhotoViewer";
import { Reveal } from "@/components/ui/Reveal";
import { families } from "@/lib/families";
import { useViewer } from "@/store/viewer";

const TILTS = [-2.2, 1.6, -0.9, 2.4, -1.5, 0.8, -2.6, 1.2];
const TAPE_AT = ["center", "left", "right", "tl", "center", "right", "left", "center"];
const TAPE_COLOURS = ["#f6d79a", "#f9cdbf", "#cfe5f6", "#f6d79a", "#e9dcc4"];

/** A masonry wall of polaroids that bounce in, each patted by a paw. Click any to open the viewer. */
export function FamilyWall() {
  const open = useViewer((s) => s.open);
  return (
    <div className="mt-16 md:mt-20">
      <Reveal>
        <ul className="tp-wall" aria-label="Photos from TeddyPups families">
          {families.map((photo, i) => (
            <li key={photo.src} className="tp-wall__item" data-reveal="true" style={{ "--d": `${(i % 4) * 60}ms` } as CSSProperties}>
              <button
                type="button"
                className="tp-wall__print"
                aria-label={`Open photo ${i + 1} of ${families.length}${photo.caption ? `: ${photo.caption}` : ""}`}
                onClick={() => open(families, i)}
              >
                <span
                  className="tp-polaroid"
                  style={
                    { "--tilt": `${TILTS[i % 8]}deg`, "--tape": TAPE_COLOURS[i % 5], "--i": i } as CSSProperties
                  }
                >
                  <span aria-hidden="true" className={`tp-tape tp-tape--${TAPE_AT[i % 8]}`} />
                  <span className="tp-polaroid__photo">
                    <Image
                      alt={photo.alt}
                      src={photo.src}
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 768px) 46vw, (max-width: 1280px) 30vw, 22vw"
                      style={{ width: "100%", height: "auto", backgroundColor: photo.color }}
                    />
                  </span>
                  <span className="tp-polaroid__caption font-scrawl">{photo.caption ?? ""}</span>
                </span>
                <Paw className="tp-wall__paw" />
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
      <PhotoViewer />
    </div>
  );
}

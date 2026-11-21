"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { GalleryItem, Img } from "@/types/content";

const still = (g: GalleryItem): Img => (g.type === "video" ? g.poster : g);

/** One gallery item at full size: a photo, or a playable video. */
function Slide({ item, fit = "cover", sizes, priority }: { item: GalleryItem; fit?: "cover" | "contain"; sizes: string; priority?: boolean }) {
  if (item.type === "video") {
    return (
      <video
        key={item.src}
        src={item.src}
        poster={item.poster.src}
        controls
        playsInline
        preload="metadata"
        className={`absolute inset-0 size-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
        style={{ backgroundColor: item.poster.color }}
      />
    );
  }
  return fit === "cover" ? (
    <Photo img={item} sizes={sizes} priority={priority} />
  ) : (
    <Image src={item.src} alt={item.alt} fill sizes={sizes} className="object-contain" />
  );
}

/**
 * Story-book gallery: a big page with prev/next and a counter, thumbnails
 * below, and a full-screen viewer. Pages turn with a quick wipe.
 */
export function Gallery({ name, items }: { name: string; items: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState(0);
  const [full, setFull] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const item = items[index];
  const go = (delta: number) => {
    setIndex((i) => (i + delta + items.length) % items.length);
    setTurn((t) => t + 1);
  };

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (full && !d.open) d.showModal();
    if (!full && d.open) d.close();
  }, [full]);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [full]);

  const kind = (g: GalleryItem) => (g.type === "video" ? "video" : "photo");

  return (
    <div>
      <div className="tp-storypage relative aspect-[4/5] md:aspect-[5/6]">
        {item.type === "video" ? (
          <div key={turn} className="tp-page-turn absolute inset-0">
            <Slide item={item} sizes="(min-width: 1024px) 55vw, 92vw" />
          </div>
        ) : (
          <button
            key={turn}
            type="button"
            className="tp-page-turn absolute inset-0 block size-full"
            aria-label={`Open ${name}, photo ${index + 1} of ${items.length} full screen`}
            onClick={() => setFull(true)}
          >
            <Slide item={item} sizes="(min-width: 1024px) 55vw, 92vw" priority={index === 0} />
          </button>
        )}
        {items.length > 1 && (
          <div className="absolute inset-x-4 bottom-4 flex justify-between">
            <button
              type="button"
              className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold"
              aria-label="Previous photo"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <span className="self-center rounded-full bg-cocoa/80 px-3 py-1 text-sm font-semibold text-milk">
              {index + 1} / {items.length}
            </span>
            <button
              type="button"
              className="grid size-12 place-items-center rounded-full border-2 border-cocoa bg-milk/95 text-xl font-bold"
              aria-label="Next photo"
              onClick={() => go(1)}
            >
              ›
            </button>
          </div>
        )}
      </div>

      {items.length > 1 && (
        <ul className="mt-3 flex gap-3 overflow-x-auto px-1 pb-2 pt-2 [scrollbar-width:thin]" aria-label={`All photos of ${name}`}>
          {items.map((g, i) => (
            <li key={g.src} className="shrink-0">
              <button
                type="button"
                aria-label={`${name}, ${kind(g)} ${i + 1} of ${items.length}`}
                aria-current={i === index}
                onClick={() => {
                  setIndex(i);
                  setTurn((t) => t + 1);
                }}
                className={`relative block h-24 w-20 overflow-hidden rounded-[0.9rem] border-[3px] transition-transform duration-300 md:h-28 md:w-24 ${
                  i === index ? "-rotate-3 -translate-y-1 border-toffee-deep" : "border-cocoa/30 hover:-rotate-2 hover:border-cocoa"
                }`}
              >
                <Photo img={still(g)} alt="" sizes="96px" />
                {g.type === "video" && (
                  <span className="absolute inset-0 grid place-items-center bg-cocoa/30 text-lg text-milk">▶</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialog}
        aria-label={`${name} photos`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70"
        data-lenis-prevent="true"
        onClose={() => setFull(false)}
      >
        {full && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3">
              <p className="font-scrawl text-lg">
                {name} — {index + 1} / {items.length}
              </p>
              <button type="button" className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa" onClick={() => setFull(false)}>
                Close
              </button>
            </div>
            <div className="relative flex-1 overflow-hidden">
              <Slide item={item} fit="contain" sizes="100vw" />
            </div>
            <div className="flex justify-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
              <button type="button" className="h-12 rounded-full border-2 border-milk px-6 font-semibold" onClick={() => go(-1)}>
                Previous
              </button>
              <button type="button" className="h-12 rounded-full bg-honey px-6 font-semibold text-cocoa" onClick={() => go(1)}>
                Next
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}

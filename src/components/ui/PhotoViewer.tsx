"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useViewer } from "@/store/viewer";

/** Full-screen photo viewer (a native dialog). Arrow keys step, Escape closes. */
export function PhotoViewer() {
  const ref = useRef<HTMLDialogElement>(null);
  const { photos, index, close, step } = useViewer();
  const photo = index === null ? null : photos[index];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (photo && !d.open) d.showModal();
    if (!photo && d.open) d.close();
  }, [photo]);

  useEffect(() => {
    if (!photo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [photo, step]);

  const neighbours = index === null ? [] : [photos[(index + 1) % photos.length], photos[(index - 1 + photos.length) % photos.length]];

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-cocoa/95 p-0 text-milk backdrop:bg-cocoa/70"
      data-lenis-prevent="true"
      onClose={close}
    >
      {photo && index !== null && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <p className="font-scrawl text-lg">
              {index + 1} / {photos.length}
              {photo.caption ? ` — ${photo.caption}` : ""}
            </p>
            <button type="button" className="h-11 rounded-full bg-milk px-5 font-semibold text-cocoa" onClick={close}>
              Close
            </button>
          </div>
          <div className="relative flex-1 overflow-hidden">
            <div className="absolute inset-0 touch-pan-y">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <span aria-hidden="true" className="sr-only">
              {neighbours.map((n) => (
                <Image key={n.src} src={n.src} alt="" fill sizes="100vw" />
              ))}
            </span>
          </div>
          <div className="flex justify-center gap-3 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3">
            <button type="button" className="h-12 rounded-full border-2 border-milk px-6 font-semibold" onClick={() => step(-1)}>
              Previous
            </button>
            <button type="button" className="h-12 rounded-full bg-honey px-6 font-semibold text-cocoa" onClick={() => step(1)}>
              Next
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

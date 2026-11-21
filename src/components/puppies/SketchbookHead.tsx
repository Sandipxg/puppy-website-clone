import { PupBuddy } from "@/components/illustrations/Pup";

/** Page header for the sketchbook pages: scrawled kicker, giant title with a drawn underline, Teddy's self-portrait. */
export function SketchbookHead({ kicker, title, lede, id }: { kicker: string; title: string; lede: string; id: string }) {
  return (
    <div className="tp-sketchbook__head">
      <div className="tp-sketchbook__words">
        <p className="font-scrawl text-lg text-toffee-ink" data-reveal="true">
          {kicker}
        </p>
        <h1 id={id} className="font-plush text-giant tp-sketchbook__title" data-reveal="true">
          {title}
          <svg aria-hidden="true" viewBox="0 0 400 24" preserveAspectRatio="none" className="tp-sketchbook__underline">
            <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" pathLength={1} />
          </svg>
        </h1>
        <p className="tp-sketchbook__lede text-lede mt-6 max-w-[46ch] text-cocoa-soft" data-reveal="true">
          {lede}
        </p>
      </div>
      <div className="tp-sketchbook__self" data-reveal="true">
        <PupBuddy pose="sit" facing="left" label="Teddy, the TeddyPups puppy" />
        <span className="font-scrawl tp-sketchbook__caption">self-portrait</span>
      </div>
    </div>
  );
}

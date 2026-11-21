import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PuppyBrowser, PuppyGrid } from "@/components/puppies/PuppyBrowser";
import { SketchCard } from "@/components/puppies/SketchCard";
import { SketchbookHead } from "@/components/puppies/SketchbookHead";
import { Reveal } from "@/components/ui/Reveal";
import { goneHome } from "@/lib/puppies";

export const metadata: Metadata = {
  title: "Available puppies",
  description:
    "Teacup and teddy bear puppies available now in Dubai and imported from trusted breeders — every listing shows real photos of the puppy.",
  alternates: { canonical: "/puppies" },
};

export default function PuppiesPage() {
  return (
    <div data-page="pups" className="tp-page">
      <Reveal as="section" className="tp-sketchbook" labelledBy="pups-title">
        <div className="gutter mx-auto max-w-[110rem] pb-24 pt-10 md:pt-16">
          <SketchbookHead
            id="pups-title"
            kicker="from Teddy's sketchbook"
            title="Available puppies"
            lede="Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp."
          />
          <div className="mt-12">
            {/* Filters read the URL; until then everyone is listed. */}
            <Suspense fallback={<PuppyGrid />}>
              <PuppyBrowser />
            </Suspense>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" className="tp-gone-strip" labelledBy="gone-title">
        <div className="gutter mx-auto flex max-w-[110rem] flex-col gap-10 md:flex-row md:items-center">
          <div className="md:w-1/3" data-reveal="true">
            <h2 id="gone-title" className="font-plush text-big">
              Already gone home
            </h2>
            <p className="mt-3 text-cocoa-soft">These puppies have found their families.</p>
            <Link className="btn btn-primary mt-6" href="/gone-home">
              See the puppies who&apos;ve gone home
            </Link>
          </div>
          <ul className="tp-gone-strip__row" aria-label="Some puppies who have gone home">
            {goneHome.slice(0, 5).map((p, i) => (
              <li key={p.slug}>
                <SketchCard puppy={p} index={i} small />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

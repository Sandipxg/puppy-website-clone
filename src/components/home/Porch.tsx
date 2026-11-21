"use client";

import Link from "next/link";
import { PupStop } from "@/components/illustrations/Pup";
import { Photo } from "@/components/ui/Photo";
import { cover, getPuppy } from "@/lib/puppies";
import { external, site } from "@/lib/site";
import { Scene } from "./Scene";

/** The closing call to action: a front porch whose door swings open onto Max. */
export function Porch() {
  const max = getPuppy("maltipoo-max-male");
  return (
    <Scene id="cta" className="tp-home" tone="dark" sky={{ top: "#2f1a10", bottom: "#24130b" }}>
      <div className="tp-home__copy gutter">
        <h2 id="cta-title" className="font-plush text-huge">
          Ready to meet your new best friend?
        </h2>
        <p className="tp-home__lede">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you
          find the right match and ensure a smooth, safe delivery across the UAE.
        </p>
      </div>
      <div className="tp-house">
        <span aria-hidden="true" className="tp-house__plant tp-house__plant--left" />
        <span aria-hidden="true" className="tp-house__lamp" />
        <div className="tp-house__doorway">
          <span className="tp-house__inside">
            {max && <Photo img={cover(max)} alt={`${max.name}, waiting inside`} sizes="200px" />}
          </span>
          <span aria-hidden="true" className="tp-house__door">
            <span className="tp-house__peep" />
            <span className="tp-house__knob" />
          </span>
        </div>
        <span aria-hidden="true" className="tp-house__plant tp-house__plant--right" />
        <span aria-hidden="true" className="tp-house__mat font-scrawl">
          welcome home
        </span>
        <PupStop pose="bow" className="tp-house__teddy" />
      </div>
      <div className="tp-home__actions gutter">
        <a href={site.whatsapp} {...external} className="btn btn-whatsapp">
          Enquire on WhatsApp
        </a>
        <Link className="btn btn-ghost tp-home__ghost" href="/contact">
          Visit &amp; contact
        </Link>
      </div>
    </Scene>
  );
}

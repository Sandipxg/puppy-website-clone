import Link from "next/link";
import { Star } from "@/components/illustrations/Icons";
import { PupStop } from "@/components/illustrations/Pup";
import { Stars } from "@/components/illustrations/Stars";
import { faqs } from "@/data/faq";
import { Scene } from "./Scene";

const NIGHT_STARS = [
  { left: "8%", top: "12%", size: 16.2 },
  { left: "22%", top: "30%", size: 9 },
  { left: "41%", top: "8%", size: 12.6 },
  { left: "57%", top: "22%", size: 8.1 },
  { left: "72%", top: "6%", size: 14.4 },
  { left: "88%", top: "18%", size: 10.8 },
  { left: "95%", top: "42%", size: 9 },
  { left: "4%", top: "58%", size: 10.8 },
  { left: "34%", top: "70%", size: 7.2 },
  { left: "63%", top: "84%", size: 9.9 },
  { left: "83%", top: "66%", size: 12.6 },
];

/** "Questions, answered" under a starry sky, with a puzzled Teddy. */
export function Night() {
  return (
    <Scene id="questions" className="tp-night" tone="dark" sky={{ top: "#4d2b19", bottom: "#2f1a10" }}>
      <Stars stars={NIGHT_STARS} className="pointer-events-none tp-night__stars" />
      <div className="tp-night__grid gutter">
        <div className="tp-night__intro">
          <h2 id="questions-title" className="font-plush text-huge">
            Questions, answered
          </h2>
          <Link className="btn btn-ghost tp-night__cta" href="/faq">
            Read all questions
          </Link>
          <div className="tp-night__pup">
            <span aria-hidden="true" className="tp-night__wonder font-plush">
              ?
            </span>
            <PupStop pose="sit" act="tilt" className="tp-night__teddy" />
          </div>
        </div>
        <dl className="tp-night__list">
          {faqs.slice(0, 3).map((f) => (
            <div key={f.question} className="tp-qa">
              <dt className="font-plush tp-qa__q">
                <Star className="tp-qa__star" />
                {f.question}
              </dt>
              <dd className="tp-qa__a">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Scene>
  );
}

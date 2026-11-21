"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PAW_PATH } from "@/components/illustrations/Icons";
import { PupStop } from "@/components/illustrations/Pup";
import { Photo } from "@/components/ui/Photo";
import { showroom } from "@/data/showroom";
import { external, site } from "@/lib/site";
import { Scene } from "./Scene";

const STEPS = [
  {
    title: "Choose your breed",
    text: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle.",
  },
  {
    title: "Get photos & details",
    text: "Our team will share real photos, health details, and all necessary information directly on WhatsApp.",
  },
  {
    title: "Secure & safe delivery",
    text: "Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.",
  },
];

const BREEDS = [
  { slug: "maltipoo", label: "Maltipoo" },
  { slug: "pomeranian", label: "Pomeranian" },
  { slug: "poodle", label: "Poodle" },
  { slug: "cavapoo", label: "Cavapoo" },
  { slug: "shih-tzu", label: "Shih Tzu" },
];

const SHOWROOM_VIDEO = "/media/showroom/showroom-video.mp4";

function Clip() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return (
    <div className="tp-clip">
      <video
        ref={ref}
        src={SHOWROOM_VIDEO}
        poster={showroom[0].src}
        muted
        loop
        playsInline
        preload="none"
        aria-label="Video of a tiny apricot teddy bear puppy in the TeddyPups showroom"
      />
      <button
        type="button"
        className="tp-clip__play"
        aria-pressed={playing}
        aria-label={playing ? "Pause video" : "Play video"}
        onClick={toggle}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={playing ? "M7 5h4v14H7zM13 5h4v14h-4z" : "M8 5v14l11-7z"} />
        </svg>
      </button>
    </div>
  );
}

/**
 * "Your puppy journey": three steps on the left; a phone on the right whose
 * WhatsApp chat fills in, message by message, as each step scrolls into focus.
 */
export function Journey() {
  const stepsRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState(-1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const items = Array.from(stepsRef.current?.children ?? []) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((a) => Math.max(a, items.indexOf(e.target as HTMLElement)));
        }
      },
      { rootMargin: "-40% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Each new step: "typing…" for a beat, then the reply lands.
  useEffect(() => {
    if (active <= shown) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sequencing the chat animation
    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setShown(active);
    }, 650);
    return () => window.clearTimeout(t);
  }, [active, shown]);

  return (
    <Scene id="journey" className="tp-chat" sky={{ top: "#f7d18d", bottom: "#f0b866" }}>
      <div className="tp-chat__grid gutter" data-pin-range="true">
        <div className="tp-chat__story">
          <h2 id="journey-title" className="font-plush text-huge">
            Your puppy journey
          </h2>
          <p className="text-lede mt-5 max-w-[42ch] text-[var(--ink-soft)]">
            A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.
          </p>
          <ol ref={stepsRef} className="tp-chat__steps">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="tp-chat__step"
                data-active={i === active ? "" : undefined}
                data-done={i < active ? "" : undefined}
              >
                <span className="tp-chat__num font-plush" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="font-plush tp-chat__title">{s.title}</h3>
                <p className="tp-chat__text">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link className="btn btn-ghost tp-chat__cta" href="/how-it-works">
            How it works
          </Link>
        </div>

        <div className="tp-chat__side">
          <div className="tp-phone" aria-label={`A WhatsApp conversation with ${site.name}`} role="group">
            <div className="tp-phone__bar">
              <Image alt="" width={40} height={40} className="tp-phone__avatar" src="/brand/logo.png" />
              <span>
                <span className="tp-phone__name">{site.name}</span>
                <span className="tp-phone__status">{typing ? "typing…" : "online"}</span>
              </span>
            </div>
            <div className="tp-phone__screen">
              <p className="tp-msg tp-msg--me">Hi TeddyPups! I&apos;d love to know more about your puppies.</p>

              <div className="tp-msg-group" data-step="0" data-show={shown >= 0}>
                <div className="tp-msg tp-msg--them">
                  <p>{STEPS[0].text}</p>
                  <ul className="tp-chips" aria-label="Breeds we have now">
                    {BREEDS.map((b) => (
                      <li key={b.slug}>
                        <Link href={`/puppies?breed=${b.slug}`}>{b.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="tp-msg-group" data-step="1" data-show={shown >= 1}>
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    {showroom.map((img) => (
                      <span key={img.src} className="tp-snaps__one">
                        <Photo img={img} sizes="9rem" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <Clip />
                </div>
                <p className="tp-msg tp-msg--them">{STEPS[1].text}</p>
              </div>

              <div className="tp-msg-group" data-step="2" data-show={shown >= 2}>
                <div className="tp-msg tp-msg--them">
                  <p>{STEPS[2].text}</p>
                  <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                    <path d="M14 52 C 60 6, 120 70, 170 28" className="tp-route__line" />
                    <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                    <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home" />
                    <path d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z" className="tp-route__heart" />
                    <path d={PAW_PATH} transform="translate(70 22) scale(.3) rotate(70 32 32)" className="tp-route__paw" />
                    <path d={PAW_PATH} transform="translate(104 38) scale(.3) rotate(100 32 32)" className="tp-route__paw" />
                  </svg>
                </div>
              </div>

              <p className="tp-typing" data-show={typing} aria-hidden="true">
                <span />
                <span />
                <span />
              </p>
            </div>
            <a href={site.whatsapp} {...external} className="tp-phone__compose">
              <span>Say hello on WhatsApp</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 20l18-8L3 4v6l12 2-12 2z" />
              </svg>
            </a>
          </div>
          <PupStop pose="sit" className="tp-chat__teddy" />
        </div>
      </div>
    </Scene>
  );
}

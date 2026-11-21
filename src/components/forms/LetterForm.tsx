"use client";

import { useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Paw } from "@/components/illustrations/Icons";
import { validateEnquiry, type EnquiryErrors } from "@/lib/enquiry";
import { available } from "@/lib/puppies";
import { external } from "@/lib/site";

type Phase = "writing" | "sealing" | "posting" | "sent";

const LABELS: Record<keyof EnquiryErrors, string> = {
  name: "name",
  phone: "phone",
  email: "email",
  area: "area",
  message: "message",
};

function Envelope() {
  return (
    <svg viewBox="0 0 176 120" className="tp-post__envelope" aria-hidden="true">
      <rect x="4" y="12" width="168" height="104" rx="10" fill="#fff8ea" stroke="#2a170e" strokeWidth="3.4" />
      <path d="M8 108 70 62M168 108 106 62" fill="none" stroke="#2a170e" strokeWidth="2.6" strokeLinecap="round" opacity=".5" />
      <path className="tp-post__flap" d="M6 16 88 72 170 16" fill="#fbe3b4" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
      <circle cx="88" cy="70" r="11" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" />
      <path d="M88 76c-3.4-2.4-5-4.2-5-6a2.5 2.5 0 0 1 5-.5 2.5 2.5 0 0 1 5 .5c0 1.8-1.6 3.6-5 6z" fill="#fbe3b4" />
    </svg>
  );
}

function PostBox({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 208 220" className={className} aria-hidden="true">
      <rect x="92" y="150" width="24" height="68" rx="4" fill="#5a3a28" stroke="#2a170e" strokeWidth="3.4" />
      <path d="M24 70a80 56 0 0 1 160 0v84H24z" fill="#c2622b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
      <rect x="62" y="86" width="84" height="12" rx="6" fill="#2a170e" />
      <path d="M44 120h120" stroke="#2a170e" strokeWidth="2.6" strokeLinecap="round" opacity=".35" />
      <g className="tp-post__flag">
        <path d="M184 112V58" stroke="#2a170e" strokeWidth="4" strokeLinecap="round" />
        <path d="M184 58h22v18h-22z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <text x="104" y="140" textAnchor="middle" fontFamily="var(--font-hand)" fontSize="15" fill="#fffdf8">
        TeddyPups
      </text>
    </svg>
  );
}

/**
 * The contact enquiry as a fill-in-the-blanks letter. On send, the letter
 * folds into an envelope that drops into a post box, then a thank-you note.
 */
export function LetterForm() {
  const selectId = useId();
  const noteId = useId();
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [phase, setPhase] = useState<Phase>("writing");
  const [failed, setFailed] = useState(false);
  const [whatsapp, setWhatsapp] = useState<string | null>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const found = validateEnquiry(data);
    setErrors(found);
    setFailed(false);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>("[aria-invalid=true]")?.focus();
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("sealing");
    const request = fetch("/api/enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json() as Promise<{ ok: boolean; errors?: EnquiryErrors; whatsapp?: string }>);
    try {
      const [json] = await Promise.all([request, new Promise((r) => setTimeout(r, reduce ? 0 : 900))]);
      if (!json.ok) {
        setErrors(json.errors ?? {});
        setFailed(!json.errors);
        setPhase("writing");
        return;
      }
      setWhatsapp(json.whatsapp ?? null);
      setPhase("posting");
      await new Promise((r) => setTimeout(r, reduce ? 0 : 1300));
      setPhase("sent");
      requestAnimationFrame(() => sentRef.current?.focus());
    } catch {
      setFailed(true);
      setPhase("writing");
    }
  }

  if (phase === "sent") {
    return (
      <div ref={sentRef} tabIndex={-1} role="status" className="tp-post__sent">
        <PostBox className="tp-post__box tp-post__box--sent" />
        <p className="font-plush text-big mt-4">Your letter is on its way!</p>
        <p className="mx-auto mt-3 max-w-[40ch]">
          Thank you for writing to us. Our team will get back to you promptly — for the quickest reply, say hello on WhatsApp.
        </p>
        {whatsapp && (
          <a href={whatsapp} {...external} className="btn btn-whatsapp mt-6">
            Continue on WhatsApp
          </a>
        )}
      </div>
    );
  }

  const invalid = (k: keyof EnquiryErrors) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-err` } : {});
  const list = Object.entries(errors) as [keyof EnquiryErrors, string][];

  return (
    <div className="tp-post" data-phase={phase}>
      <form noValidate className="tp-letterform" onSubmit={onSubmit}>
        <span aria-hidden="true" className="tp-letter__stamp">
          <Paw className="size-9" />
        </span>
        <p className="font-scrawl tp-letterform__greeting">Dear TeddyPups,</p>
        <p className="tp-letterform__line">
          my name is{" "}
          <span className="tp-blank" style={{ "--size": "16ch" } as CSSProperties}>
            <input aria-label="Your name (required)" autoComplete="name" required minLength={2} maxLength={80} name="name" {...invalid("name")} />
          </span>
          , and you can reach me on{" "}
          <span className="tp-blank" style={{ "--size": "15ch" } as CSSProperties}>
            <input
              aria-label="Phone or WhatsApp number with country code (required)"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              placeholder="+971 50 123 4567"
              name="phone"
              {...invalid("phone")}
            />
          </span>{" "}
          or by email at{" "}
          <span className="tp-blank" style={{ "--size": "20ch" } as CSSProperties}>
            <input aria-label="Email (optional)" type="email" autoComplete="email" placeholder="optional" name="email" {...invalid("email")} />
          </span>
          .
        </p>
        <p className="tp-letterform__line">
          I live in{" "}
          <span className="tp-blank" style={{ "--size": "13ch" } as CSSProperties}>
            <input aria-label="Your area (optional)" autoComplete="address-level2" maxLength={80} placeholder="e.g. Dubai Marina" name="area" {...invalid("area")} />
          </span>
          , and I&apos;m curious about{" "}
          <span className="tp-blank tp-blank--select">
            <label htmlFor={selectId} className="sr-only">
              Puppy you&apos;re interested in (optional)
            </label>
            <select id={selectId} name="puppy" defaultValue="">
              <option value="">any puppy (not sure yet)</option>
              {available.map((p) => (
                <option key={p.slug} value={`${p.name} (${p.slug})`}>
                  {p.name}
                  {p.name !== p.breed ? ` (${p.breed}, ${p.sex.toLowerCase()})` : ` (${p.sex.toLowerCase()})`}
                </option>
              ))}
            </select>
          </span>
          .
        </p>
        <label htmlFor={noteId} className="sr-only">
          Your message (optional)
        </label>
        <textarea
          id={noteId}
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Anything else you'd like to tell us…"
          className="tp-letterform__note"
          {...invalid("message")}
        />
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" name="website" defaultValue="" />
          </label>
        </div>
        {(list.length > 0 || failed) && (
          <div role="alert" className="tp-letterform__alert">
            <p className="font-semibold">
              {failed ? "Something went wrong posting your letter. Please try again." : "Please check the highlighted fields."}
            </p>
            {list.length > 0 && (
              <ul>
                {list.map(([k, msg]) => (
                  <li key={k} id={`${k}-err`}>
                    <span className="sr-only">{LABELS[k]}: </span>
                    {msg}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="tp-letterform__sign">
          <p className="font-scrawl">with love, a future puppy parent</p>
          <button type="submit" disabled={phase !== "writing"} className="btn btn-primary disabled:opacity-70">
            Post my letter
          </button>
        </div>
      </form>
      {phase !== "writing" && (
        <div className="tp-post__scene" aria-hidden="true">
          <Envelope />
          <PostBox className="tp-post__box" />
        </div>
      )}
    </div>
  );
}

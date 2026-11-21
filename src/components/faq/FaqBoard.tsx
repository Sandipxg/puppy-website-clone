"use client";

import { useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { PupBuddy } from "@/components/illustrations/Pup";
import { faqs } from "@/data/faq";
import { external, site } from "@/lib/site";

const TILTS = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4];
const PINS = ["var(--color-toffee)", "var(--color-sky-deep)", "#d9a13c", "#c45a6a"];

/** Wrap every match of `query` in <mark>. */
function highlight(text: string, query: string): ReactNode {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part));
}

/**
 * The FAQ as notes pinned to a corkboard. Each note unfolds (accordion) and
 * the search box filters and highlights as you type. Teddy's thought bubble
 * turns from "?" to "!" while a note is open.
 */
export function FaqBoard() {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Set<number>>(new Set());
  const q = query.trim();
  const shown = useMemo(
    () =>
      faqs
        .map((f, i) => ({ ...f, i }))
        .filter((f) => !q || `${f.question} ${f.answer}`.toLowerCase().includes(q.toLowerCase())),
    [q],
  );

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const count = q
    ? shown.length === 1
      ? "1 note matches"
      : `${shown.length} notes match`
    : `${faqs.length} notes on the board`;

  return (
    <div className="tp-notes" data-open={open.size > 0 ? "" : undefined}>
      <aside className="tp-notes__side" aria-label="Find a question">
        <label htmlFor={searchId} className="font-scrawl tp-notes__label">
          sniff out a question
        </label>
        <div className="tp-notes__search">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="tp-notes__lens">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            id={searchId}
            type="search"
            placeholder="delivery, Korea, vaccinated…"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="tp-notes__count" aria-live="polite">
          {count}
        </p>
        <div className="tp-notes__teddy">
          <span aria-hidden="true" className="tp-notes__bubble font-plush">
            <span className="tp-notes__q">?</span>
            <span className="tp-notes__a">!</span>
          </span>
          <PupBuddy pose="sit" />
        </div>
        <a href={site.whatsapp} {...external} className="btn btn-whatsapp tp-notes__ask">
          Ask your own question
        </a>
      </aside>
      <div className="tp-notes__board">
        <ul className="tp-notes__list">
          {shown.map((f, n) => {
            const unfolded = open.has(f.i);
            return (
              <li
                key={f.i}
                className="tp-note"
                data-reveal="true"
                data-unfolded={unfolded ? "" : undefined}
                style={{ "--tilt": `${TILTS[f.i % TILTS.length]}deg`, "--pin": PINS[f.i % PINS.length], "--i": n } as CSSProperties}
              >
                <span aria-hidden="true" className="tp-note__pin" />
                <h2 className="tp-note__q">
                  <button
                    type="button"
                    id={`q-${f.i}`}
                    aria-expanded={unfolded}
                    aria-controls={`a-${f.i}`}
                    onClick={() => toggle(f.i)}
                  >
                    <span className="font-plush-text">{highlight(f.question, q)}</span>
                    <span aria-hidden="true" className="tp-note__chevron" />
                  </button>
                </h2>
                <div id={`a-${f.i}`} role="region" aria-labelledby={`q-${f.i}`} className="tp-note__answer" inert={!unfolded}>
                  <div className="tp-note__flap">
                    <p>{highlight(f.answer, q)}</p>
                  </div>
                </div>
              </li>
            );
          })}
          {shown.length === 0 && (
            <li className="tp-note tp-note--empty" style={{ "--tilt": "-1deg" } as CSSProperties}>
              <p className="font-plush-text text-lg font-bold">No notes about “{q}” yet.</p>
              <p className="mt-2 text-cocoa-soft">Try another word, or ask us directly on WhatsApp — we reply 24/7.</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

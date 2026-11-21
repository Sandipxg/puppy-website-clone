"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { BREED_FILTERS, applyFilters, available, countLine, readFilters, type Filters } from "@/lib/puppies";
import { SketchCard } from "./SketchCard";

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={pressed} className="tp-sticker-chip" onClick={onClick}>
      {children}
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-scrawl mr-1 w-full shrink-0 text-cocoa-soft sm:w-28">{label}</span>
      {children}
    </div>
  );
}

/** The grid of sketch cards, with its count line. */
export function PuppyGrid({ filters = {} }: { filters?: Filters }) {
  const list = applyFilters(available, filters);
  const filtered = Object.keys(filters).length > 0;
  const key = JSON.stringify(filters);
  return (
    <>
      <p className="font-scrawl mt-10 text-lg text-[var(--ink-soft)]" aria-live="polite">
        {countLine(list.length, filtered)}
      </p>
      <Reveal key={key}>
        <ul className="tp-sketches mt-8">
          {list.map((p, i) => (
            <li key={p.slug} className="tp-sketches__item" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <SketchCard puppy={p} index={i} />
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  );
}

/** Sticker-chip filters (where / breed / boy or girl) kept in the URL. */
export function PuppyBrowser() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = useMemo(() => readFilters(new URLSearchParams(params.toString())), [params]);
  const origins = useMemo(() => Array.from(new Set(available.map((p) => p.origin))), []);

  const update = (patch: Partial<Record<"origin" | "collection" | "breed" | "gender", string | null>>) => {
    const next = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    const q = next.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const everywhere = !filters.origin && !filters.collection;

  return (
    <div>
      <div role="group" aria-label="Filter puppies" className="tp-sketchpad flex flex-col gap-4">
        <Row label="where">
          <Chip pressed={everywhere} onClick={() => update({ origin: null, collection: null })}>
            Everywhere
          </Chip>
          {origins.includes("local") && (
            <Chip
              pressed={filters.origin === "local"}
              onClick={() => update({ origin: filters.origin === "local" ? null : "local", collection: null })}
            >
              In Dubai
            </Chip>
          )}
          {origins.includes("imported") && (
            <Chip
              pressed={filters.origin === "imported"}
              onClick={() => update({ origin: filters.origin === "imported" ? null : "imported", collection: null })}
            >
              Imported
            </Chip>
          )}
          <Chip
            pressed={filters.collection === "korean-teacup"}
            onClick={() =>
              update({ collection: filters.collection === "korean-teacup" ? null : "korean-teacup", origin: null })
            }
          >
            Korean Teacup
          </Chip>
        </Row>
        <Row label="breed">
          {BREED_FILTERS.map((b) => (
            <Chip
              key={b.value}
              pressed={filters.breed === b.value}
              onClick={() => update({ breed: filters.breed === b.value ? null : b.value })}
            >
              {b.label}
            </Chip>
          ))}
        </Row>
        <Row label="boy or girl">
          <Chip pressed={filters.gender === "male"} onClick={() => update({ gender: filters.gender === "male" ? null : "male" })}>
            Boys
          </Chip>
          <Chip
            pressed={filters.gender === "female"}
            onClick={() => update({ gender: filters.gender === "female" ? null : "female" })}
          >
            Girls
          </Chip>
        </Row>
      </div>
      <PuppyGrid filters={filters} />
    </div>
  );
}

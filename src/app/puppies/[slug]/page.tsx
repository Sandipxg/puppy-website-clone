import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Paw } from "@/components/illustrations/Icons";
import { PupBuddy } from "@/components/illustrations/Pup";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Gallery } from "@/components/puppy/Gallery";
import { Ribbon } from "@/components/puppy/Ribbon";
import { Reveal } from "@/components/ui/Reveal";
import { puppies } from "@/data/puppies";
import { available, cover, getPuppy, goneHome, seoFor } from "@/lib/puppies";
import { JsonLd } from "@/components/seo/JsonLd";
import { external, site, siteUrl } from "@/lib/site";
import type { Puppy } from "@/types/content";

const COMES_WITH = [
  "Vaccinated",
  "Dewormed",
  "Verified health certificate from licensed vets",
  "Thoroughly checked before joining your family",
];

const WAY_HOME = [
  { title: "Reserve your puppy", text: "Tell us which puppy has captured your heart." },
  { title: "Personalized consultation", text: "We finalize details with you and share updates on your puppy's journey." },
  { title: "Import and arrival", text: "We manage health checks, travel arrangements, and documentation." },
  { title: "Welcome home", text: "We help your new puppy settle in and ensure a smooth transition into your home." },
];

export function generateStaticParams() {
  return puppies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPuppy((await params).slug);
  if (!p) return { title: "Puppy not found", robots: { index: false } };
  const { title, description } = seoFor(p);
  const img = cover(p);
  const image = { url: img.src, width: img.width, height: img.height, alt: img.alt };
  return {
    title,
    description,
    alternates: { canonical: `/puppies/${p.slug}` },
    openGraph: { title, description, images: [image] },
    twitter: { title, description, images: [image] },
  };
}

function Chapter({ n, children }: { n: number; children: string }) {
  return (
    <p className="tp-chapter">
      <span aria-hidden="true" className="tp-chapter__n font-plush">
        {n}
      </span>
      <span className="font-scrawl">{children}</span>
    </p>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 32 32" className="mt-0.5 size-6 shrink-0 text-toffee-deep" aria-hidden="true">
      <path d="M5 17l7 7L27 8" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Previous / next within the same shelf (available or gone home), wrapping around. */
function neighbours(p: Puppy) {
  const list = p.status === "available" ? available : goneHome;
  const i = list.findIndex((x) => x.slug === p.slug);
  return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
}

function NeighbourLink({ p, label }: { p: Puppy; label: string }) {
  const img = cover(p);
  return (
    <Link
      className="group flex items-center gap-5 rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 transition-transform duration-500 hover:-rotate-1 sm:last:flex-row-reverse sm:last:text-right"
      href={`/puppies/${p.slug}`}
    >
      <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[999px_999px_0.6rem_0.6rem] border-[3px] border-cocoa bg-honey-soft">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="80px"
          style={{ objectFit: "cover", objectPosition: img.focal, backgroundColor: img.color }}
        />
      </span>
      <span>
        <span className="font-scrawl block text-sm text-cocoa-soft">{label}</span>
        <span className="font-plush text-[1.6rem]">{p.name}</span>
      </span>
    </Link>
  );
}

export default async function PuppyPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPuppy((await params).slug);
  if (!p) notFound();

  const home = p.status !== "available";
  const tint = cover(p).color;
  const { prev, next } = neighbours(p);
  const details: [string, string][] = [
    ["Breed", p.breed],
    ["Boy or girl", p.sex],
    ["Age", p.age],
    ...(p.colour ? ([["Colour", p.colour]] as [string, string][]) : []),
    ["Where", p.origin === "local" ? "In Dubai" : "Imported for you"],
  ];

  return (
    <div data-page="pup" className="tp-page">
      <Reveal
        as="article"
        className="tp-storybook"
        style={{ background: `linear-gradient(180deg, color-mix(in oklab, ${tint} 24%, var(--color-milk)) 0, var(--color-milk) 85%)` }}
      >
        <Ribbon />
        <div className="gutter mx-auto max-w-[110rem] pb-20 pt-8 md:pt-12">
          <nav aria-label="Breadcrumb" className="text-[0.95rem] font-semibold text-cocoa-soft">
            <Link className="link-ink" href={home ? "/gone-home" : "/puppies"}>
              {home ? "Gone home" : "Available puppies"}
            </Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{p.name}</span>
          </nav>
          <Chapter n={1}>{home ? "the day they went home" : "hello, it's me"}</Chapter>

          <div className="mt-4 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="min-w-0 lg:col-span-7">
              <Gallery name={p.name} items={p.gallery} />
            </div>
            <div className="min-w-0 lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+5.5rem)]">
                <div className="tp-tag tp-board mt-16 !rounded-[2.2rem_2.2rem_2.2rem_0.6rem] !p-7 md:!p-9 lg:mt-20" data-reveal="true">
                  <span aria-hidden="true" className="tp-tag__ring" />
                  <PupBuddy pose="peek" className="absolute -top-[4.8rem] right-6 w-[9.5rem]" />
                  {home ? (
                    <span className="inline-grid place-items-center rounded-full border-[3px] border-current px-3 py-1 font-scrawl text-sm uppercase tracking-wide -rotate-6 text-toffee-deep">
                      Gone home ♥
                    </span>
                  ) : (
                    <span className="chip">
                      <Paw className="size-4 text-toffee" />
                      Available
                    </span>
                  )}
                  <h1 className="font-plush mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">{p.name}</h1>
                  <p className="mt-2 text-lg font-semibold text-cocoa-soft">{p.breed}</p>
                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4">
                    {details.map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-scrawl text-sm text-cocoa-soft">{k}</dt>
                        <dd className="mt-0.5 text-[1.05rem] font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-8 flex flex-col gap-3">
                    <a href={site.whatsapp} {...external} className="btn btn-whatsapp">
                      {home ? "Ask about a puppy like this" : `Ask about ${p.name} on WhatsApp`}
                    </a>
                    <a href={`#enquire-${p.slug}`} className="btn btn-ghost">
                      Send an enquiry
                    </a>
                  </div>
                </div>
                <div className="tp-paper mt-8 -rotate-1">
                  <Chapter n={2}>{`what comes with ${p.name}`}</Chapter>
                  <h2 className="font-plush mt-1 text-[1.9rem]">Every Teddy Pup comes</h2>
                  <ul className="mt-4 space-y-2.5">
                    {COMES_WITH.map((c) => (
                      <li key={c} className="flex items-start gap-3 font-semibold">
                        <Check />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {!home && (
            <section aria-labelledby={`home-steps-${p.slug}`} className="mt-20">
              <Chapter n={3}>the way home</Chapter>
              <h2 id={`home-steps-${p.slug}`} className="font-plush text-big mt-3">
                {p.origin === "local" ? "Coming home in Dubai" : "Coming home from abroad"}
              </h2>
              <ol className="tp-trail tp-trail--row tp-trail--paws mt-10">
                {WAY_HOME.map((s, i) => (
                  <li key={s.title}>
                    <span aria-hidden="true" className="tp-trail__num font-plush">
                      {i + 1}
                    </span>
                    <h3 className="font-plush-text text-xl font-bold leading-tight">{s.title}</h3>
                    <p className="mt-2 max-w-[38ch] text-cocoa-soft">{s.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <section id={`enquire-${p.slug}`} aria-labelledby={`enquire-title-${p.slug}`} className="tp-letter mt-20 grid gap-10 lg:grid-cols-12">
            <span aria-hidden="true" className="tp-letter__stamp">
              <Paw className="size-9" />
            </span>
            <div className="lg:col-span-4">
              <Chapter n={home ? 3 : 4}>dear TeddyPups…</Chapter>
              <h2 id={`enquire-title-${p.slug}`} className="font-plush text-big mt-2">
                {home ? "Looking for a puppy like this?" : `Ask about ${p.name}`}
              </h2>
              <p className="mt-4 text-cocoa-soft">
                Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest
                reply.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <EnquiryForm puppy={`${p.name} (${p.slug})`} defaultMessage={`Hi! I'd love to know more about ${p.name} (${p.breed}).`} />
            </div>
          </section>

          <nav aria-label="More puppies" className="mt-16 grid gap-4 sm:grid-cols-2">
            <NeighbourLink p={prev} label="Previous pup" />
            <NeighbourLink p={next} label="Next pup" />
          </nav>
        </div>
      </Reveal>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Puppies", item: `${siteUrl}/puppies` },
            { "@type": "ListItem", position: 2, name: p.name, item: `${siteUrl}/puppies/${p.slug}` },
          ],
        }}
      />
    </div>
  );
}

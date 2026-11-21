import type { Metadata } from "next";
import { Families } from "@/components/home/Families";
import { Hero } from "@/components/home/Hero";
import { Journey } from "@/components/home/Journey";
import { MeetThePups } from "@/components/home/MeetThePups";
import { Night } from "@/components/home/Night";
import { Passport } from "@/components/home/Passport";
import { Porch } from "@/components/home/Porch";
import { TwoWays } from "@/components/home/TwoWays";
import { PupJourney } from "@/components/pup/PupJourney";
import { JsonLd } from "@/components/seo/JsonLd";
import { site, siteUrl } from "@/lib/site";

const TITLE = "TeddyPups U.A.E. — Premium teacup puppies in Dubai";
const DESCRIPTION =
  "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, images: ["/brand/logo.png"] },
  twitter: { title: TITLE, description: DESCRIPTION, images: ["/brand/logo.png"] },
};

const STORE = {
  "@context": "https://schema.org",
  "@type": "PetStore",
  name: site.name,
  description:
    "TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.",
  url: siteUrl,
  logo: `${siteUrl}/brand/logo.png`,
  image: `${siteUrl}/brand/logo.png`,
  telephone: site.phoneDisplay,
  email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Dubai", addressCountry: "AE" },
  sameAs: site.social.map((s) => s.href),
};

/** One long day in Dubai: morning hero → golden hour → dusk → a starry porch. */
export default function HomePage() {
  return (
    <div className="tp-page">
      <Hero />
      <MeetThePups />
      <TwoWays />
      <Journey />
      <Passport />
      <Families />
      <Night />
      <Porch />
      <PupJourney />
      <JsonLd data={STORE} />
    </div>
  );
}

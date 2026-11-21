import type { Metadata, Viewport } from "next";
// Self-hosted variable fonts (all axes) — no runtime request to Google Fonts.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/figtree/index.css";
import "@fontsource-variable/shantell-sans/full.css";
import "./globals.css";
import { Curtain } from "@/components/layout/Curtain";
import { ActionBar, Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "TeddyPups U.A.E.",
  title: {
    default: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
    template: "%s | TeddyPups U.A.E.",
  },
  description:
    "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
  openGraph: {
    type: "website",
    siteName: "TeddyPups U.A.E.",
    locale: "en_AE",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#fffdf8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Curtain />
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-cocoa px-5 py-3 font-semibold text-milk"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="relative pt-[var(--header-h)] outline-none">
          {children}
        </main>
        <Footer />
        <ActionBar />
        <SmoothScroll />
      </body>
    </html>
  );
}

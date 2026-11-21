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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
    template: "%s | TeddyPups U.A.E.",
  },
  description:
    "Teddy bear and teacup puppies in Dubai. Meet local puppies in our Downtown Dubai showroom or bring home a rare breed imported from trusted breeders.",
  icons: { icon: "/brand/logo.png", apple: "/brand/logo.png" },
  openGraph: {
    type: "website",
    siteName: "TeddyPups U.A.E.",
    locale: "en_AE",
    images: ["/brand/logo.png"],
  },
  twitter: { card: "summary_large_image", images: ["/brand/logo.png"] },
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

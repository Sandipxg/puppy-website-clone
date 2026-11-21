import type { Metadata } from "next";
// Self-hosted variable fonts (all axes) — no runtime request to Google Fonts.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/figtree/index.css";
import "@fontsource-variable/shantell-sans/full.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "TeddyPups U.A.E. — Premium teacup puppies in Dubai",
  description:
    "Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

/** Business details shown across the site. */
export const site = {
  name: "TeddyPups U.A.E.",
  shortName: "TeddyPups",
  tagline: "every puppy is family",
  copyrightYear: 2026,
  phoneDisplay: "+971 50 000 0000",
  phoneHref: "tel:+971500000000",
  email: "info@instabizweb.com",
  address: "Downtown Dubai, United Arab Emirates",
  whatsapp:
    "https://wa.me/919898124987?text=Hi%20Insta%20Biz%20Web%2C%20I'd%20like%20to%20discuss%20a%20project.",
  social: [
    { label: "Instagram", href: "https://www.instabizweb.com/" },
    { label: "TikTok", href: "https://www.instabizweb.com/" },
    { label: "Facebook", href: "https://www.instabizweb.com/" },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/puppies", label: "Puppies" },
  { href: "/happy-families", label: "Happy families" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Visit & contact" },
] as const;

/** Attributes for any link that opens WhatsApp in a new tab. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;

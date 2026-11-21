"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Paw } from "@/components/illustrations/Icons";
import { external, nav, site } from "@/lib/site";
import { useUi } from "@/store/ui";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Scalloped bottom edge drawn under the header once it has a background. */
function Hem() {
  return (
    <svg aria-hidden="true" className="tp-header__hem" width="100%" height="14" preserveAspectRatio="none">
      <defs>
        <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill" />
          <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line" />
        </pattern>
      </defs>
      <rect width="100%" height="14" fill="url(#tp-hem)" />
    </svg>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { menuOpen, setMenuOpen } = useUi();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) {
      dialog.removeAttribute("data-closing");
      dialog.showModal();
    } else if (!menuOpen && dialog.open) {
      // Play the circle-close animation, then actually close.
      dialog.setAttribute("data-closing", "");
      const done = () => {
        dialog.removeAttribute("data-closing");
        dialog.close();
      };
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) done();
      else dialog.addEventListener("animationend", done, { once: true });
    }
  }, [menuOpen]);

  // Close when the route changes.
  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  return (
    <dialog
      ref={ref}
      aria-label="Site menu"
      className="tp-menu m-0 h-dvh max-h-none w-screen max-w-none bg-honey p-0 text-cocoa backdrop:bg-cocoa/40"
      onCancel={(e) => {
        e.preventDefault();
        setMenuOpen(false);
      }}
    >
      <div className="flex h-full flex-col gutter pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5">
        <div className="flex items-center justify-between">
          <span className="font-scrawl text-lg">where to, friend?</span>
          <button
            type="button"
            className="h-11 rounded-full bg-cocoa px-5 font-semibold text-milk"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-10 flex-1">
          <ul className="space-y-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-active={active}
                    className="tp-menu-link font-plush block py-2 text-[clamp(2.4rem,11vw,3.4rem)]"
                  >
                    <span>{item.label}</span>
                    <Paw className="tp-nav-link__paw" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="space-y-3">
          <a href={site.whatsapp} className="btn btn-whatsapp w-full" {...external}>
            WhatsApp us
          </a>
          <p className="text-center text-sm font-medium">{site.phoneDisplay}</p>
        </div>
      </div>
    </dialog>
  );
}

export function Header() {
  const pathname = usePathname();
  const setMenuOpen = useUi((s) => s.setMenuOpen);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const home = pathname === "/";

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      // Tuck away while scrolling down, come back on any upward scroll.
      setHidden(y > 240 && y > last + 2 ? true : y < last - 2 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="site-header"
      data-scrolled={scrolled}
      data-hidden={hidden}
      data-home={home ? "true" : undefined}
      className="tp-header fixed inset-x-0 top-0 z-50"
    >
      <div className="tp-header__bar gutter">
        <Link className="tp-header__brand" aria-label={`${site.name} — home`} href="/">
          <Image alt="" width={56} height={56} className="tp-header__logo" src="/brand/logo.png" priority />
          <span className="font-plush tp-header__name">{site.shortName}</span>
        </Link>
        <nav aria-label="Main" className="tp-header__nav">
          <ul>
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-active={active}
                    className="tp-nav-link"
                  >
                    <span>{item.label}</span>
                    <Paw className="tp-nav-link__paw" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="tp-header__end">
          <a href={site.whatsapp} {...external} className="btn btn-whatsapp tp-header__wa">
            WhatsApp us
          </a>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-cocoa bg-milk px-4 text-[0.95rem] font-semibold lg:hidden"
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
          >
            <Paw className="size-4" />
            Menu
          </button>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
      <Hem />
    </header>
  );
}

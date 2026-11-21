"use client";

import { useEffect, useState, type RefObject } from "react";

/** Tracks whether an element is on screen, and whether it has ever been. */
export function useInView(ref: RefObject<Element | null>, rootMargin = "0px") {
  const [here, setHere] = useState(false);
  const [visited, setVisited] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setHere(entry.isIntersecting);
        if (entry.isIntersecting) setVisited(true);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return { here, visited };
}

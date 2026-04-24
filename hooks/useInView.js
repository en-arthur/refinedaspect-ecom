"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isInView].
 * Once the element enters the viewport it stays "in view" (one-shot).
 * @param {number} threshold - 0–1, how much of the element must be visible
 * @param {string} rootMargin - e.g. "0px 0px -80px 0px" to trigger slightly before bottom
 */
export function useInView(threshold = 0.15, rootMargin = "0px 0px -60px 0px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // one-shot
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

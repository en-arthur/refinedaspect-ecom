"use client";

import { useInView } from "@/hooks/useInView";

/**
 * Wraps children in a div that animates in when scrolled into view.
 *
 * variant: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-up"
 * delay:   ms delay before animation starts (for stagger)
 * duration: ms
 */
export default function AnimateIn({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
  as: Tag = "div",
  threshold = 0.12,
}) {
  const [ref, inView] = useInView(threshold);

  const base = {
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: `${delay}ms`,
  };

  const variants = {
    "fade-up": {
      initial: { opacity: 0, transform: "translateY(32px)" },
      animate: { opacity: 1, transform: "translateY(0)" },
    },
    "fade-in": {
      initial: { opacity: 0, transform: "none" },
      animate: { opacity: 1, transform: "none" },
    },
    "fade-left": {
      initial: { opacity: 0, transform: "translateX(-28px)" },
      animate: { opacity: 1, transform: "translateX(0)" },
    },
    "fade-right": {
      initial: { opacity: 0, transform: "translateX(28px)" },
      animate: { opacity: 1, transform: "translateX(0)" },
    },
    "scale-up": {
      initial: { opacity: 0, transform: "scale(0.94)" },
      animate: { opacity: 1, transform: "scale(1)" },
    },
  };

  const v = variants[variant] ?? variants["fade-up"];
  const style = {
    ...base,
    ...(inView ? v.animate : v.initial),
  };

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

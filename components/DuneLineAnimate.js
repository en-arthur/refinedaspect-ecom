"use client";

import { useInView } from "@/hooks/useInView";

export default function DuneLineAnimate() {
  const [ref, inView] = useInView(0.3);

  return (
    <span
      ref={ref}
      className="dune-line-animate mt-6"
      style={{ width: inView ? "40px" : "0px" }}
    />
  );
}

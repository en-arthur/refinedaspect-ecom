import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About — STILLFORM",
  description: "The story behind STILLFORM. Calm. Composed. Considered.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Opening Hero */}
      <section className="px-6 md:px-12 py-32 border-b border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,8vw,7rem)] leading-none tracking-widest text-[#F5F3EF] max-w-4xl">
            We started somewhere. This is that place.
          </h1>
          <div className="mt-6 w-10 h-[1px] bg-[#C8A96E]" />
        </div>
      </section>

      {/* Brand Story */}
      <section className="px-6 md:px-12 py-20 border-b border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-6">
              The Story
            </span>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-8 text-[#6B6B6B] font-light mb-6">
              STILLFORM was born from a simple frustration: menswear that either said too much or nothing at all. We wanted something in between — pieces that carry intention without shouting it.
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-8 text-[#6B6B6B] font-light mb-6">
              SF-01: Origin is the first collection. Three tees. Each one a coordinate. A starting point. The name Origin isn't nostalgic — it's directional. It marks where we begin, so we know where we're going.
            </p>
            <p className="font-[family-name:var(--font-dm-sans)] text-sm leading-8 text-[#6B6B6B] font-light">
              We're building for the man who moves with purpose. Who understands that restraint is a form of confidence. Who dresses not to be seen, but to be ready.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="aspect-[4/5] bg-[#1E1E1E] flex items-center justify-center">
              <span className="font-[family-name:var(--font-bebas)] text-6xl tracking-widest text-[#6B6B6B] opacity-10">
                STILLFORM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Pillars */}
      <section className="px-6 md:px-12 py-20 border-b border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-12">
            What We Stand For
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[rgba(245,243,239,0.08)]">
            {[
              {
                word: "STILL",
                title: "Stillness",
                description:
                  "In a world that moves fast and loud, stillness is a choice. We design for the man who doesn't need to announce himself. Presence over performance.",
              },
              {
                word: "FORM",
                title: "Form",
                description:
                  "Every cut, every graphic, every detail is considered. Form follows function, but function here means feeling right — in the body, in the room, in the moment.",
              },
              {
                word: "MODERN",
                title: "Modern",
                description:
                  "Not trend-chasing. Not nostalgic. Modern means built for now — for the global young man who is rooted somewhere and moving everywhere.",
              },
            ].map((pillar, i) => (
              <div
                key={i}
                className="border-b md:border-b-0 md:border-r border-[rgba(245,243,239,0.08)] last:border-0 py-10 md:px-10 first:pl-0"
              >
                <span className="font-[family-name:var(--font-bebas)] text-5xl tracking-widest text-[#F5F3EF] block mb-2">
                  {pillar.word}
                </span>
                <div className="w-6 h-[1px] bg-[#C8A96E] mb-4" />
                <p className="font-[family-name:var(--font-dm-mono)] text-xs leading-7 text-[#6B6B6B] tracking-wider">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Callout */}
      <section className="px-6 md:px-12 py-24 bg-[#1E1E1E]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-3">
              Available Now
            </span>
            <h2 className="font-[family-name:var(--font-bebas)] text-5xl md:text-6xl tracking-widest text-[#F5F3EF]">
              SF-01: ORIGIN
            </h2>
            <p className="font-[family-name:var(--font-dm-mono)] text-xs text-[#6B6B6B] tracking-wider mt-3 max-w-xs">
              Three pieces. The beginning of something considered.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 border border-[#F5F3EF] px-10 py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase hover:bg-[#F5F3EF] hover:text-[#0A0A0A] transition-colors group whitespace-nowrap"
          >
            Shop the Collection
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

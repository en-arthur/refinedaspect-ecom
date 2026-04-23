import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(245,243,239,0.5) 80px, rgba(245,243,239,0.5) 81px)`,
            }}
          />
        </div>

        {/* Dune accent line top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#C8A96E] opacity-30" />

        <div className="relative z-10 flex flex-col items-center gap-6 fade-up">
          {/* Collection tag */}
          <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase">
            SF-01: ORIGIN — NOW AVAILABLE
          </span>

          {/* Wordmark */}
          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(4rem,18vw,16rem)] leading-none tracking-[0.05em] text-[#F5F3EF]">
            STILLFORM.
          </h1>

          {/* Tagline */}
          <p className="font-[family-name:var(--font-dm-mono)] text-sm tracking-[0.3em] text-[#6B6B6B] uppercase">
            Calm. Composed. Considered.
          </p>

          {/* CTA */}
          <Link
            href="/shop"
            className="mt-4 inline-flex items-center gap-3 bg-[#F5F3EF] text-[#0A0A0A] px-10 py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase hover:bg-[#C8A96E] transition-colors group"
          >
            Shop SF-01: Origin
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#C8A96E] to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-[rgba(245,243,239,0.08)] py-4 overflow-hidden bg-[#0A0A0A]">
        <div className="flex whitespace-nowrap">
          <div className="animate-marquee flex items-center gap-0 shrink-0">
            {Array(8).fill(null).map((_, i) => (
              <span key={i} className="font-[family-name:var(--font-bebas)] text-lg tracking-[0.3em] text-[#6B6B6B] px-8">
                STILL · COMPOSED · CONSIDERED · SF-01: ORIGIN ·
              </span>
            ))}
          </div>
          <div className="animate-marquee flex items-center gap-0 shrink-0" aria-hidden>
            {Array(8).fill(null).map((_, i) => (
              <span key={i} className="font-[family-name:var(--font-bebas)] text-lg tracking-[0.3em] text-[#6B6B6B] px-8">
                STILL · COMPOSED · CONSIDERED · SF-01: ORIGIN ·
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-3">
                Featured
              </span>
              <h2 className="font-[family-name:var(--font-bebas)] text-5xl md:text-6xl tracking-widest text-[#F5F3EF]">
                SF-01: ORIGIN
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] hover:text-[#C8A96E] transition-colors uppercase"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              href="/shop"
              className="flex items-center gap-2 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] hover:text-[#C8A96E] transition-colors uppercase"
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-24 px-6 md:px-12 border-t border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div>
            <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,8vw,7rem)] leading-none tracking-widest text-[#F5F3EF]">
              FROM HERE,<br />EVERYWHERE.
            </h2>
            <div className="mt-6 w-10 h-[1px] bg-[#C8A96E]" />
          </div>
          <div>
            <p className="font-[family-name:var(--font-dm-mono)] text-xs leading-7 text-[#6B6B6B] tracking-wider">
              STILLFORM is built on the belief that clothing should carry weight — not in fabric, but in intention. Every piece in SF-01: Origin is a coordinate. A marker. A starting point for wherever you're going next.
            </p>
            <p className="font-[family-name:var(--font-dm-mono)] text-xs leading-7 text-[#6B6B6B] tracking-wider mt-4">
              We design for the man who moves with purpose. Who dresses with restraint. Who understands that less, done right, says everything.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#F5F3EF] hover:text-[#C8A96E] transition-colors uppercase"
            >
              Our Story <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* INSTAGRAM PLACEHOLDER */}
      <section className="py-24 px-6 md:px-12 border-t border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-3">
                @stillform
              </span>
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-widest text-[#F5F3EF]">
                FOLLOW THE DROP
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] hover:text-[#C8A96E] transition-colors uppercase"
            >
              Instagram <ArrowRight size={12} />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array(4).fill(null).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-[#1E1E1E] flex items-center justify-center group cursor-pointer overflow-hidden"
              >
                <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                  <span className="text-[9px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B]">
                    @STILLFORM
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION CALLOUT */}
      <section className="py-32 px-6 text-center border-t border-[rgba(245,243,239,0.06)] bg-[#1E1E1E]">
        <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-4">
          Available Now
        </span>
        <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,10vw,8rem)] leading-none tracking-widest text-[#F5F3EF] mb-8">
          SF-01: ORIGIN
        </h2>
        <p className="font-[family-name:var(--font-dm-mono)] text-xs text-[#6B6B6B] tracking-wider mb-10 max-w-sm mx-auto">
          Three pieces. One collection. The beginning of something considered.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 border border-[#F5F3EF] px-12 py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase hover:bg-[#F5F3EF] hover:text-[#0A0A0A] transition-colors group"
        >
          Shop Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  );
}

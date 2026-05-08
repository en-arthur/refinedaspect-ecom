import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import { normalizeProduct } from "@/lib/normalize";
import ProductCard from "@/components/ProductCard";
import AnimateIn from "@/components/AnimateIn";
import DuneLineAnimate from "@/components/DuneLineAnimate";

export default async function HomePage() {
  const allProducts = await fetchProducts().catch(() => []);
  const featured = allProducts.filter(p => p.featured).map(normalizeProduct);

  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[96vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0A0A0A]">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(245,243,239,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245,243,239,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="hero-accent-line absolute top-0 left-0 right-0 h-[1px] bg-[#C8A96E]" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <span className="hero-tag text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase">
            RA-01: ORIGIN — NOW AVAILABLE
          </span>

          <h1 className="hero-wordmark font-[family-name:var(--font-bebas)] text-[clamp(4rem,18vw,16rem)] leading-none tracking-[0.05em] text-[#F5F3EF]">
            REFINED ASPECT.
          </h1>

          <p className="hero-tagline font-[family-name:var(--font-dm-mono)] text-sm tracking-[0.3em] text-[#6B6B6B] uppercase">
            Refined. Considered. Intentional.
          </p>

          <div className="hero-cta mt-4">
            <Link
              href="/shop"
              className="btn-sweep inline-flex items-center gap-3 bg-[#F5F3EF] text-[#0A0A0A] px-10 py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase group"
            >
              <span className="relative z-10">Shop RA-01: Origin</span>
              <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[8px] font-[family-name:var(--font-dm-mono)] tracking-[0.3em] text-[#6B6B6B] uppercase">Scroll</span>
          <div className="scroll-indicator-line w-[1px] h-10 bg-[#C8A96E]" />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <section className="border-y border-[rgba(245,243,239,0.08)] overflow-hidden bg-[#0A0A0A] marquee-row">
        <div className="flex whitespace-nowrap py-3 border-b border-[rgba(245,243,239,0.04)]">
          {[0, 1].map((n) => (
            <div key={n} className="animate-marquee flex items-center shrink-0">
              {Array(10).fill(null).map((_, i) => (
                <span key={i} className="font-[family-name:var(--font-bebas)] text-base tracking-[0.3em] text-[#6B6B6B] px-8">
                  REFINED · CONSIDERED · INTENTIONAL · RA-01: ORIGIN ·
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="flex whitespace-nowrap py-3">
          {[0, 1].map((n) => (
            <div key={n} className="animate-marquee-reverse flex items-center shrink-0">
              {Array(10).fill(null).map((_, i) => (
                <span key={i} className="font-[family-name:var(--font-bebas)] text-base tracking-[0.3em] text-[rgba(200,169,110,0.25)] px-8">
                  FROM HERE · EVERYWHERE · PREMIUM MENSWEAR · GHANA ·
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED COLLECTION ──────────────────────────────── */}
      <section className="py-28 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <AnimateIn variant="fade-left">
              <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-3">
                Featured
              </span>
              <h2 className="font-[family-name:var(--font-bebas)] text-5xl md:text-6xl tracking-widest text-[#F5F3EF]">
                RA-01: ORIGIN
              </h2>
            </AnimateIn>
            <AnimateIn variant="fade-right">
              <Link
                href="/shop"
                className="link-underline hidden md:flex items-center gap-2 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] hover:text-[#C8A96E] transition-colors uppercase"
              >
                View All <ArrowRight size={12} />
              </Link>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((product, i) => (
              <AnimateIn key={product.id} variant="fade-up" delay={i * 100} duration={700}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <AnimateIn variant="fade-up" delay={300}>
              <Link
                href="/shop"
                className="link-underline flex items-center gap-2 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] hover:text-[#C8A96E] transition-colors uppercase"
              >
                View All <ArrowRight size={12} />
              </Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ──────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 border-t border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <AnimateIn variant="fade-left" duration={800}>
            <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,8vw,7rem)] leading-none tracking-widest text-[#F5F3EF]">
              FROM HERE,<br />EVERYWHERE.
            </h2>
            <DuneLineAnimate />
          </AnimateIn>

          <AnimateIn variant="fade-right" delay={150} duration={800}>
            <p className="font-[family-name:var(--font-dm-mono)] text-xs leading-7 text-[#6B6B6B] tracking-wider">
              Refined Aspect is not a brand. It is a standard. Worn by men who move with intention and arrive with presence.
            </p>
            <Link
              href="/about"
              className="link-underline mt-8 inline-flex items-center gap-2 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#F5F3EF] hover:text-[#C8A96E] transition-colors uppercase"
            >
              Our Story <ArrowRight size={12} />
            </Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── INSTAGRAM PLACEHOLDER ────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 border-t border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <AnimateIn variant="fade-left">
              <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-3">
                @refined_aspect_ecom
              </span>
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-widest text-[#F5F3EF]">
                FOLLOW THE DROP
              </h2>
            </AnimateIn>
            <AnimateIn variant="fade-right">
              <a
                href="https://instagram.com/refined_aspect_ecom"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hidden md:flex items-center gap-2 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] hover:text-[#C8A96E] transition-colors uppercase"
              >
                Instagram <ArrowRight size={12} />
              </a>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array(4).fill(null).map((_, i) => (
              <AnimateIn key={i} variant="scale-up" delay={i * 80} duration={600}>
                <div className="aspect-square bg-[#1E1E1E] flex items-center justify-center group cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#C8A96E]/0 group-hover:bg-[#C8A96E]/5 transition-colors duration-500" />
                  <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-50 transition-opacity duration-500 group-hover:scale-110 transition-transform">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                    <span className="text-[9px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B]">
                      @REFINED_ASPECT_ECOM
                    </span>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTION CALLOUT ───────────────────────────────── */}
      <section className="py-36 px-6 text-center border-t border-[rgba(245,243,239,0.06)] bg-[#1E1E1E] overflow-hidden relative">
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span className="font-[family-name:var(--font-bebas)] text-[clamp(6rem,22vw,20rem)] leading-none tracking-widest text-[#F5F3EF] opacity-[0.02] whitespace-nowrap">
            RA-01
          </span>
        </div>

        <AnimateIn variant="fade-in" duration={800}>
          <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-4">
            Available Now
          </span>
          <h2 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,10vw,8rem)] leading-none tracking-widest text-[#F5F3EF] mb-8">
            RA-01: ORIGIN
          </h2>
          <p className="font-[family-name:var(--font-dm-mono)] text-xs text-[#6B6B6B] tracking-wider mb-10 max-w-sm mx-auto">
            Three pieces. One collection. The beginning of something considered.
          </p>
          <Link
            href="/shop"
            className="btn-sweep-dark inline-flex items-center gap-3 border border-[#F5F3EF] px-12 py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase hover:text-[#F5F3EF] transition-colors group"
          >
            <span className="relative z-10">Shop Now</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </AnimateIn>
      </section>

    </div>
  );
}

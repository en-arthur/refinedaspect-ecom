"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AnimateIn from "@/components/AnimateIn";

const FILTERS = ["All", "Tee", "Coming Soon"];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? products
      : activeFilter === "Coming Soon"
      ? []
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen px-6 md:px-12 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Collection Header */}
        <div className="mb-12 pb-8 border-b border-[rgba(245,243,239,0.08)]">
          <AnimateIn variant="fade-up" duration={700}>
            <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-3">
              Collection
            </span>
            <div className="flex items-end justify-between">
              <h1 className="font-[family-name:var(--font-bebas)] text-5xl md:text-7xl tracking-widest text-[#F5F3EF]">
                SF-01: ORIGIN
              </h1>
              <span className="font-[family-name:var(--font-dm-mono)] text-xs text-[#6B6B6B] tracking-wider mb-2 tabular-nums">
                {filtered.length} {filtered.length === 1 ? "ITEM" : "ITEMS"}
              </span>
            </div>
          </AnimateIn>
        </div>

        {/* Filter Bar */}
        <AnimateIn variant="fade-up" delay={100} duration={600}>
          <div className="flex items-center gap-0 mb-12 border-b border-[rgba(245,243,239,0.08)]">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-6 py-3 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase transition-colors duration-300 border-b-2 -mb-[2px] ${
                  activeFilter === filter
                    ? "border-[#C8A96E] text-[#F5F3EF]"
                    : "border-transparent text-[#6B6B6B] hover:text-[#F5F3EF]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Grid */}
        {filtered.length === 0 ? (
          <AnimateIn variant="fade-up" duration={600}>
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
              <h2 className="font-[family-name:var(--font-bebas)] text-4xl tracking-widest text-[#F5F3EF]">
                COMING SOON
              </h2>
              <p className="font-[family-name:var(--font-dm-mono)] text-xs text-[#6B6B6B] tracking-wider max-w-xs">
                The next drop is being considered. Stay close.
              </p>
              <button className="btn-sweep mt-4 border border-[rgba(245,243,239,0.2)] px-8 py-3 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors">
                <span className="relative z-10">Notify Me</span>
              </button>
            </div>
          </AnimateIn>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {filtered.map((product, i) => (
              <AnimateIn key={product.id} variant="fade-up" delay={i * 90} duration={650}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

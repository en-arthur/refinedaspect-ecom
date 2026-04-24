"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Plus, Check } from "lucide-react";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [quickAdding, setQuickAdding] = useState(false);
  const { addItem } = useCart();

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (quickAdding) return;
    setQuickAdding(true);
    addItem(product, "M");
    setTimeout(() => setQuickAdding(false), 1400);
  }

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image container */}
      <div
        className="product-img-wrap relative aspect-[3/4] mb-4 overflow-hidden"
        style={{ backgroundColor: "var(--surface)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Placeholder — scales on hover via CSS */}
        <div className="product-img-inner absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-[family-name:var(--font-bebas)] text-4xl tracking-widest text-[#6B6B6B] opacity-[0.12] transition-opacity duration-500 group-hover:opacity-[0.18]">
            {product.name}
          </span>
          <span
            className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest mt-2 transition-all duration-500"
            style={{ opacity: hovered ? 0.3 : 0.12 }}
          >
            {hovered ? "BACK VIEW" : "FRONT VIEW"}
          </span>
        </div>

        {/* Color dot */}
        <div className="absolute top-3 left-3 z-10">
          <div
            className="w-3 h-3 border border-[rgba(245,243,239,0.2)] transition-transform duration-300 group-hover:scale-125"
            style={{ backgroundColor: product.colorHex[0] }}
            title={product.colors[0]}
          />
        </div>

        {/* Limited badge */}
        {product.id === "the-statement" && (
          <div className="absolute top-3 right-3 z-10 bg-[#C8A96E] px-2 py-0.5">
            <span className="text-[8px] font-[family-name:var(--font-dm-mono)] text-[#0A0A0A] tracking-widest uppercase">
              Limited
            </span>
          </div>
        )}

        {/* Dune border reveal on hover */}
        <div
          className="absolute inset-0 border border-[#C8A96E] transition-opacity duration-400 pointer-events-none"
          style={{ opacity: hovered ? 0.3 : 0 }}
        />

        {/* Quick add — slides up */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 transition-all duration-400"
          style={{
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            opacity: hovered ? 1 : 0,
          }}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-3 flex items-center justify-center gap-2 text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase transition-colors duration-300"
            style={{
              backgroundColor: quickAdding ? "#C8A96E" : "color-mix(in srgb, var(--background) 92%, transparent)",
              color: quickAdding ? "#0A0A0A" : "var(--foreground)",
            }}
          >
            {quickAdding ? (
              <>
                <Check size={11} strokeWidth={2} />
                Added to Bag
              </>
            ) : (
              <>
                <Plus size={11} strokeWidth={2} />
                Quick Add — M
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-widest text-[#F5F3EF] transition-colors duration-300 group-hover:text-[#C8A96E]">
            {product.name}
          </h3>
          <p className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest mt-0.5 uppercase">
            {product.collection}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-wider">
            GHS {product.priceGHS}
          </p>
          <p className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider">
            ${product.priceUSD}
          </p>
        </div>
      </div>
    </Link>
  );
}

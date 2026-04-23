"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [quickAdding, setQuickAdding] = useState(false);
  const { addItem } = useCart();

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    setQuickAdding(true);
    addItem(product, "M");
    setTimeout(() => setQuickAdding(false), 1200);
  }

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image */}
      <div
        className="relative aspect-[3/4] bg-[#1E1E1E] overflow-hidden mb-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Placeholder image area */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-[family-name:var(--font-bebas)] text-4xl tracking-widest text-[#6B6B6B] opacity-20">
            {product.name}
          </span>
          <span className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] opacity-20 tracking-widest mt-2">
            {hovered ? "BACK VIEW" : "FRONT VIEW"}
          </span>
        </div>

        {/* Color indicator */}
        <div className="absolute top-3 left-3">
          <div
            className="w-3 h-3 border border-[rgba(245,243,239,0.2)]"
            style={{ backgroundColor: product.colorHex[0] }}
            title={product.colors[0]}
          />
        </div>

        {/* Quick add overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-[#0A0A0A]/90 py-3 flex items-center justify-center gap-2 transition-all duration-300 ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-2 text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#F5F3EF] hover:text-[#C8A96E] transition-colors uppercase"
          >
            <Plus size={12} />
            {quickAdding ? "ADDED" : "QUICK ADD — M"}
          </button>
        </div>

        {/* Limited badge */}
        {product.id === "the-statement" && (
          <div className="absolute top-3 right-3 bg-[#C8A96E] px-2 py-0.5">
            <span className="text-[8px] font-[family-name:var(--font-dm-mono)] text-[#0A0A0A] tracking-widest uppercase">
              Limited
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-widest text-[#F5F3EF] group-hover:text-[#C8A96E] transition-colors">
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

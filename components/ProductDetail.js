"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ChevronDown, ChevronUp, X, Check } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import AnimateIn from "@/components/AnimateIn";

export default function ProductDetail({ product, related }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [careOpen, setCareOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [notifySize, setNotifySize] = useState(null);
  const { addItem } = useCart();

  function handleAddToCart() {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const isSoldOut = (size) => product.soldOut.includes(size);

  return (
    <div className="min-h-screen">

      {/* Breadcrumb */}
      <AnimateIn variant="fade-in" duration={500}>
        <div className="px-6 md:px-12 py-4 border-b border-[rgba(245,243,239,0.06)]">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest uppercase">
            <Link href="/" className="hover:text-[#C8A96E] transition-colors duration-300">Home</Link>
            <span className="opacity-30">/</span>
            <Link href="/shop" className="hover:text-[#C8A96E] transition-colors duration-300">Shop</Link>
            <span className="opacity-30">/</span>
            <span className="text-[#F5F3EF]">{product.name}</span>
          </div>
        </div>
      </AnimateIn>

      <div className="px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          {/* ── LEFT — Images ─────────────────────────────────── */}
          <AnimateIn variant="fade-left" duration={800}>
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="product-img-wrap aspect-[3/4] bg-[#1E1E1E] relative overflow-hidden">
                <div
                  className="product-img-inner absolute inset-0 flex flex-col items-center justify-center transition-all duration-500"
                  style={{ opacity: 1 }}
                >
                  <span className="font-[family-name:var(--font-bebas)] text-5xl tracking-widest text-[#6B6B6B] opacity-[0.12]">
                    {product.name}
                  </span>
                  <span className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest opacity-20 mt-2">
                    {activeImage === 0 ? "FRONT VIEW" : "BACK VIEW"}
                  </span>
                </div>

                {/* Collection tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[9px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#C8A96E] uppercase">
                    {product.collection}
                  </span>
                </div>

                {/* Image index indicator */}
                <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
                  {["F", "B"].map((_, i) => (
                    <div
                      key={i}
                      className="transition-all duration-300"
                      style={{
                        width: activeImage === i ? "16px" : "4px",
                        height: "2px",
                        backgroundColor: activeImage === i ? "#C8A96E" : "rgba(245,243,239,0.2)",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {["FRONT", "BACK"].map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="flex-1 aspect-[3/4] bg-[#1E1E1E] flex items-center justify-center border transition-all duration-300 hover:border-[rgba(245,243,239,0.3)]"
                    style={{
                      borderColor: activeImage === i ? "#C8A96E" : "transparent",
                    }}
                  >
                    <span className="text-[8px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest opacity-40">
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* ── RIGHT — Details ───────────────────────────────── */}
          <AnimateIn variant="fade-right" delay={120} duration={800}>
            <div className="flex flex-col">

              {/* Collection tag */}
              <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase mb-3">
                {product.collection}
              </span>

              {/* Name */}
              <h1 className="font-[family-name:var(--font-bebas)] text-5xl md:text-6xl tracking-widest text-[#F5F3EF] leading-none mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="font-[family-name:var(--font-dm-mono)] text-lg text-[#C8A96E] tracking-wider">
                  GHS {product.priceGHS}
                </span>
                <span className="font-[family-name:var(--font-dm-mono)] text-sm text-[#6B6B6B] tracking-wider">
                  / ${product.priceUSD}
                </span>
              </div>

              {/* Color */}
              <div className="mb-6">
                <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] uppercase mb-3">
                  Color — {product.colors[0]}
                </p>
                <div className="flex gap-2">
                  {product.colorHex.map((hex, i) => (
                    <button
                      key={i}
                      className="w-6 h-6 border-2 border-[#C8A96E] transition-transform duration-200 hover:scale-110"
                      style={{ backgroundColor: hex }}
                      title={product.colors[i]}
                      aria-label={product.colors[i]}
                    />
                  ))}
                </div>
              </div>

              {/* Size selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] uppercase">
                    Size {selectedSize && `— ${selectedSize}`}
                  </p>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="link-underline text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] hover:text-[#C8A96E] transition-colors duration-300 uppercase"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const soldOut = isSoldOut(size);
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => {
                          if (!soldOut) setSelectedSize(size);
                          else setNotifySize(size);
                        }}
                        className="py-3 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest transition-all duration-250 border"
                        style={{
                          borderColor: soldOut
                            ? "rgba(245,243,239,0.08)"
                            : isSelected
                            ? "#C8A96E"
                            : "rgba(245,243,239,0.2)",
                          color: soldOut
                            ? "#3a3a3a"
                            : isSelected
                            ? "#C8A96E"
                            : "#F5F3EF",
                          textDecoration: soldOut ? "line-through" : "none",
                          backgroundColor: isSelected ? "rgba(200,169,110,0.06)" : "transparent",
                          cursor: soldOut ? "pointer" : "pointer",
                        }}
                        onMouseEnter={(e) => {
                          if (!soldOut && !isSelected) {
                            e.currentTarget.style.borderColor = "#C8A96E";
                            e.currentTarget.style.color = "#C8A96E";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!soldOut && !isSelected) {
                            e.currentTarget.style.borderColor = "rgba(245,243,239,0.2)";
                            e.currentTarget.style.color = "#F5F3EF";
                          }
                        }}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Notify Me for sold-out */}
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: notifySize ? "80px" : "0px", opacity: notifySize ? 1 : 0 }}
                >
                  <div className="mt-3 p-3 bg-[#1E1E1E] flex items-center justify-between">
                    <span className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider">
                      Size {notifySize} is sold out
                    </span>
                    <button
                      onClick={() => setNotifySize(null)}
                      className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#C8A96E] uppercase hover:text-[#F5F3EF] transition-colors duration-300"
                    >
                      Notify Me →
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase transition-all duration-400 mb-4 relative overflow-hidden"
                style={{
                  backgroundColor: !selectedSize
                    ? "#1E1E1E"
                    : added
                    ? "#C8A96E"
                    : "#F5F3EF",
                  color: !selectedSize ? "#3a3a3a" : "#0A0A0A",
                  cursor: !selectedSize ? "not-allowed" : "pointer",
                  transform: added ? "scale(0.99)" : "scale(1)",
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  {added && <Check size={13} strokeWidth={2} />}
                  {!selectedSize ? "Select a Size" : added ? "Added to Bag" : "Add to Bag"}
                </span>
              </button>

              {/* Shipping note */}
              <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider text-center mb-8">
                Free shipping on orders over GHS 600
              </p>

              {/* Description */}
              <div className="border-t border-[rgba(245,243,239,0.08)] pt-6 mb-4">
                <p className="text-sm font-[family-name:var(--font-dm-sans)] text-[#6B6B6B] leading-7 font-light">
                  {product.description}
                </p>
                <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest mt-3 uppercase">
                  100% Cotton · 200 GSM
                </p>
              </div>

              {/* Care Instructions — animated accordion */}
              <div className="border-t border-[rgba(245,243,239,0.08)]">
                <button
                  onClick={() => setCareOpen(!careOpen)}
                  className="w-full flex items-center justify-between py-4 text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors duration-300 group"
                >
                  Care Instructions
                  <span className="transition-transform duration-300" style={{ transform: careOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <ChevronDown size={14} />
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400"
                  style={{ maxHeight: careOpen ? `${product.care.length * 36}px` : "0px", opacity: careOpen ? 1 : 0 }}
                >
                  <ul className="pb-4 flex flex-col gap-2">
                    {product.care.map((instruction, i) => (
                      <li
                        key={i}
                        className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider flex items-start gap-2"
                        style={{
                          transitionDelay: careOpen ? `${i * 40}ms` : "0ms",
                          opacity: careOpen ? 1 : 0,
                          transform: careOpen ? "translateY(0)" : "translateY(6px)",
                          transition: "opacity 0.3s ease, transform 0.3s ease",
                        }}
                      >
                        <span className="text-[#C8A96E] mt-0.5 shrink-0">—</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </AnimateIn>
        </div>

        {/* ── You May Also Like ─────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[rgba(245,243,239,0.08)]">
            <div className="max-w-7xl mx-auto">
              <AnimateIn variant="fade-up" duration={600}>
                <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest text-[#F5F3EF] mb-8">
                  YOU MAY ALSO LIKE
                </h2>
              </AnimateIn>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {related.map((p, i) => (
                  <AnimateIn key={p.id} variant="fade-up" delay={i * 100} duration={650}>
                    <ProductCard product={p} />
                  </AnimateIn>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Size Guide Modal ──────────────────────────────────── */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-350"
        style={{
          opacity: sizeGuideOpen ? 1 : 0,
          pointerEvents: sizeGuideOpen ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setSizeGuideOpen(false)}
        />

        {/* Panel */}
        <div
          className="relative bg-[#0A0A0A] border border-[rgba(245,243,239,0.1)] w-full max-w-lg p-8 z-10 transition-all duration-400"
          style={{
            transform: sizeGuideOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
            opacity: sizeGuideOpen ? 1 : 0,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest">
              SIZE GUIDE
            </h3>
            <button
              onClick={() => setSizeGuideOpen(false)}
              className="text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors duration-300 hover:rotate-90 transition-transform"
              aria-label="Close size guide"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-widest uppercase mb-4">
            West African Sizing Notes
          </p>
          <p className="font-[family-name:var(--font-dm-mono)] text-xs leading-7 text-[#6B6B6B] tracking-wider mb-6">
            REFINED ASPECT pieces are cut with a relaxed, oversized silhouette. If you prefer a closer fit, size down. All measurements are in centimetres.
          </p>

          <table className="w-full text-xs font-[family-name:var(--font-dm-mono)] tracking-wider">
            <thead>
              <tr className="border-b border-[rgba(245,243,239,0.08)]">
                {["Size", "Chest", "Length", "Shoulder"].map((h) => (
                  <th key={h} className="text-left py-2 text-[#6B6B6B] uppercase font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { size: "M",  chest: "102–107", length: "70", shoulder: "46" },
                { size: "L",  chest: "108–113", length: "72", shoulder: "48" },
                { size: "XL", chest: "114–119", length: "74", shoulder: "50" },
              ].map((row) => (
                <tr
                  key={row.size}
                  className="border-b border-[rgba(245,243,239,0.04)] hover:bg-[rgba(245,243,239,0.02)] transition-colors duration-200"
                >
                  <td className="py-3 text-[#F5F3EF]">{row.size}</td>
                  <td className="py-3 text-[#6B6B6B]">{row.chest}</td>
                  <td className="py-3 text-[#6B6B6B]">{row.length}</td>
                  <td className="py-3 text-[#6B6B6B]">{row.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider mt-4">
            Model is 6'1" / 185cm and wears size M.
          </p>
          <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-wider mt-2">
            Sized for male fit — when in doubt size up.
          </p>
        </div>
      </div>

    </div>
  );
}

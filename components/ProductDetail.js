"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

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
    setTimeout(() => setAdded(false), 1500);
  }

  const isSoldOut = (size) => product.soldOut.includes(size);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-4 border-b border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest uppercase">
          <Link href="/" className="hover:text-[#C8A96E] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#C8A96E] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#F5F3EF]">{product.name}</span>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* LEFT — Images */}
          <div className="flex flex-col gap-4">
            {/* Main image */}
            <div className="aspect-[3/4] bg-[#1E1E1E] flex items-center justify-center relative overflow-hidden">
              <div className="flex flex-col items-center gap-2 opacity-20">
                <span className="font-[family-name:var(--font-bebas)] text-5xl tracking-widest text-[#6B6B6B]">
                  {product.name}
                </span>
                <span className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest">
                  {activeImage === 0 ? "FRONT VIEW" : "BACK VIEW"}
                </span>
              </div>
              {/* Collection tag overlay */}
              <div className="absolute top-4 left-4">
                <span className="text-[9px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#C8A96E] uppercase">
                  {product.collection}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {["FRONT", "BACK"].map((label, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-1 aspect-[3/4] bg-[#1E1E1E] flex items-center justify-center border transition-colors ${
                    activeImage === i
                      ? "border-[#C8A96E]"
                      : "border-transparent hover:border-[rgba(245,243,239,0.2)]"
                  }`}
                >
                  <span className="text-[8px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest opacity-40">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="flex flex-col">
            {/* Collection */}
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
                    className="w-6 h-6 border-2 border-[#C8A96E]"
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
                  className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] hover:text-[#C8A96E] transition-colors uppercase underline underline-offset-2"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const soldOut = isSoldOut(size);
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        if (!soldOut) setSelectedSize(size);
                        else setNotifySize(size);
                      }}
                      className={`py-3 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest transition-colors border ${
                        soldOut
                          ? "border-[rgba(245,243,239,0.1)] text-[#6B6B6B] line-through cursor-pointer"
                          : selectedSize === size
                          ? "border-[#C8A96E] text-[#C8A96E]"
                          : "border-[rgba(245,243,239,0.2)] text-[#F5F3EF] hover:border-[#C8A96E] hover:text-[#C8A96E]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {notifySize && (
                <div className="mt-3 p-3 bg-[#1E1E1E] flex items-center justify-between">
                  <span className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider">
                    Size {notifySize} is sold out
                  </span>
                  <button
                    onClick={() => setNotifySize(null)}
                    className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#C8A96E] uppercase hover:text-[#F5F3EF] transition-colors"
                  >
                    Notify Me →
                  </button>
                </div>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase transition-colors mb-4 ${
                !selectedSize
                  ? "bg-[#1E1E1E] text-[#6B6B6B] cursor-not-allowed"
                  : added
                  ? "bg-[#C8A96E] text-[#0A0A0A]"
                  : "bg-[#F5F3EF] text-[#0A0A0A] hover:bg-[#C8A96E]"
              }`}
            >
              {!selectedSize ? "Select a Size" : added ? "Added to Bag ✓" : "Add to Bag"}
            </button>

            {!selectedSize && (
              <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider text-center mb-4">
                Please select a size to continue
              </p>
            )}

            {/* Shipping note */}
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider text-center mb-8">
              Free shipping on orders over GHS 500
            </p>

            {/* Description */}
            <div className="border-t border-[rgba(245,243,239,0.08)] pt-6 mb-4">
              <p className="text-sm font-[family-name:var(--font-dm-sans)] text-[#6B6B6B] leading-7 font-light">
                {product.description}
              </p>
            </div>

            {/* Care Instructions */}
            <div className="border-t border-[rgba(245,243,239,0.08)]">
              <button
                onClick={() => setCareOpen(!careOpen)}
                className="w-full flex items-center justify-between py-4 text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors"
              >
                Care Instructions
                {careOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {careOpen && (
                <ul className="pb-4 flex flex-col gap-2">
                  {product.care.map((instruction, i) => (
                    <li
                      key={i}
                      className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider flex items-start gap-2"
                    >
                      <span className="text-[#C8A96E] mt-0.5">—</span>
                      {instruction}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[rgba(245,243,239,0.08)]">
            <div className="max-w-7xl mx-auto">
              <h2 className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest text-[#F5F3EF] mb-8">
                YOU MAY ALSO LIKE
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative bg-[#0A0A0A] border border-[rgba(245,243,239,0.1)] w-full max-w-lg p-8 z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest">
                SIZE GUIDE
              </h3>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors"
                aria-label="Close size guide"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-widest uppercase mb-4">
              West African Sizing Notes
            </p>
            <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider leading-6 mb-6">
              STILLFORM pieces are cut with a relaxed, oversized silhouette. If you prefer a closer fit, size down. All measurements are in centimetres.
            </p>

            <table className="w-full text-xs font-[family-name:var(--font-dm-mono)] tracking-wider">
              <thead>
                <tr className="border-b border-[rgba(245,243,239,0.08)]">
                  <th className="text-left py-2 text-[#6B6B6B] uppercase">Size</th>
                  <th className="text-left py-2 text-[#6B6B6B] uppercase">Chest</th>
                  <th className="text-left py-2 text-[#6B6B6B] uppercase">Length</th>
                  <th className="text-left py-2 text-[#6B6B6B] uppercase">Shoulder</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { size: "S", chest: "96–101", length: "68", shoulder: "44" },
                  { size: "M", chest: "102–107", length: "70", shoulder: "46" },
                  { size: "L", chest: "108–113", length: "72", shoulder: "48" },
                  { size: "XL", chest: "114–119", length: "74", shoulder: "50" },
                ].map((row) => (
                  <tr key={row.size} className="border-b border-[rgba(245,243,239,0.04)]">
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
          </div>
        </div>
      )}
    </div>
  );
}

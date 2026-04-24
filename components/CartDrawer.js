"use client";

import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    subtotalGHS,
    subtotalUSD,
  } = useCart();

  const freeShipping = subtotalGHS >= 500;
  const progressPct = Math.min((subtotalGHS / 500) * 100, 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-400"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className="cart-drawer fixed top-0 right-0 z-50 h-full w-full max-w-[420px] border-l flex flex-col"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          backgroundColor: "var(--background)",
          borderColor: "var(--border-subtle)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <div className="flex items-center gap-3">
            <span className="font-[family-name:var(--font-bebas)] text-xl tracking-widest">
              YOUR BAG
            </span>
            {items.length > 0 && (
              <span className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#6B6B6B] hover:text-[#F5F3EF] transition-all duration-300 hover:rotate-90"
            aria-label="Close cart"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {items.length > 0 && (
          <div
            className="px-6 py-3 border-b"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider uppercase">
                {freeShipping
                  ? "✓ Free shipping unlocked"
                  : `GHS ${500 - subtotalGHS} away from free shipping`}
              </span>
              {freeShipping && (
                <span className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-wider">
                  FREE
                </span>
              )}
            </div>
            {/* Progress bar */}
            <div className="h-[2px] w-full overflow-hidden" style={{ backgroundColor: "var(--surface)" }}>
              <div
                className="h-full bg-[#C8A96E] transition-all duration-700 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <div className="w-16 h-16 border border-[rgba(245,243,239,0.08)] flex items-center justify-center">
                <ShoppingBag size={26} strokeWidth={1} className="text-[#6B6B6B]" />
              </div>
              <div>
                <p className="font-[family-name:var(--font-bebas)] text-2xl tracking-widest mb-2">
                  YOUR BAG IS EMPTY
                </p>
                <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider">
                  Add something worth wearing.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="btn-sweep border border-[#F5F3EF] px-8 py-3 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase hover:text-[#0A0A0A] transition-colors inline-flex items-center gap-2 group"
              >
                <span className="relative z-10">Shop the Collection</span>
                <ArrowRight size={12} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[rgba(245,243,239,0.06)]">
              {items.map((item, i) => (
                <CartItem
                  key={`${item.id}-${item.size}`}
                  item={item}
                  index={i}
                  onRemove={removeItem}
                  onUpdate={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-6 border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest uppercase">
                Subtotal
              </span>
              <span className="text-sm font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-wider">
                GHS {subtotalGHS}
                <span className="text-[#6B6B6B] text-xs ml-1">/ ${subtotalUSD}</span>
              </span>
            </div>
            <p className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider mb-5">
              {freeShipping ? "✓ Free shipping applied" : "Free shipping on orders over GHS 500"}
            </p>
            <button className="btn-sweep w-full bg-[#F5F3EF] text-[#0A0A0A] py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase transition-colors group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Cart line item ─────────────────────────────────────────── */
function CartItem({ item, index, onRemove, onUpdate }) {
  return (
    <div
      className="flex gap-4 py-5 transition-opacity duration-300"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Thumbnail */}
      <div
        className="w-[72px] h-[88px] flex-shrink-0 flex items-center justify-center overflow-hidden group"
        style={{ backgroundColor: "var(--surface)" }}
      >
        <span className="text-[7px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest text-center px-1 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
          {item.name}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <p className="font-[family-name:var(--font-bebas)] text-lg tracking-widest leading-tight">
            {item.name}
          </p>
          <p className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider mt-0.5 uppercase">
            Size: {item.size}
          </p>
          <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-wider mt-1">
            GHS {item.priceGHS * item.quantity}
            <span className="text-[#6B6B6B] ml-1">/ ${item.priceUSD * item.quantity}</span>
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity */}
          <div className="flex items-center transition-colors duration-300" style={{ border: "1px solid var(--border-mid)" }}>
            <button
              onClick={() => onUpdate(item.id, item.size, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors duration-200"
              aria-label="Decrease quantity"
            >
              <Minus size={11} />
            </button>
            <span className="text-xs font-[family-name:var(--font-dm-mono)] w-6 text-center tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdate(item.id, item.size, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors duration-200"
              aria-label="Increase quantity"
            >
              <Plus size={11} />
            </button>
          </div>

          {/* Remove */}
          <button
            onClick={() => onRemove(item.id, item.size)}
            className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] hover:text-[#F5F3EF] tracking-widest uppercase transition-colors duration-300 link-underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

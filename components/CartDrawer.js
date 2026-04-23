"use client";

import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotalGHS, subtotalUSD } =
    useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0A0A0A] border-l border-[rgba(245,243,239,0.08)] flex flex-col cart-drawer ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(245,243,239,0.08)]">
          <span className="font-[family-name:var(--font-bebas)] text-xl tracking-widest">
            YOUR BAG
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
              <ShoppingBag size={40} strokeWidth={1} className="text-[#6B6B6B]" />
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
                className="border border-[#F5F3EF] px-8 py-3 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase hover:bg-[#F5F3EF] hover:text-[#0A0A0A] transition-colors"
              >
                Shop the Collection
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 pb-6 border-b border-[rgba(245,243,239,0.06)]"
                >
                  {/* Image placeholder */}
                  <div className="w-20 h-24 bg-[#1E1E1E] flex-shrink-0 flex items-center justify-center">
                    <span className="text-[8px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest text-center px-1">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="font-[family-name:var(--font-bebas)] text-lg tracking-widest">
                        {item.name}
                      </p>
                      <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider mt-0.5">
                        SIZE: {item.size}
                      </p>
                      <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-wider mt-1">
                        GHS {item.priceGHS} / ${item.priceUSD}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-3 border border-[rgba(245,243,239,0.15)]">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-[family-name:var(--font-dm-mono)] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] hover:text-[#F5F3EF] tracking-wider transition-colors"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[rgba(245,243,239,0.08)]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider uppercase">
                Subtotal
              </span>
              <span className="text-sm font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-wider">
                GHS {subtotalGHS} / ${subtotalUSD}
              </span>
            </div>
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider mb-5">
              {subtotalGHS >= 500
                ? "✓ Free shipping applied"
                : `Free shipping on orders over GHS 500`}
            </p>
            <button className="w-full bg-[#F5F3EF] text-[#0A0A0A] py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase hover:bg-[#C8A96E] transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

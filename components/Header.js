"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[rgba(245,243,239,0.06)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-bebas)] text-2xl tracking-[0.2em] text-[#F5F3EF] hover:text-[#C8A96E] transition-colors"
          >
            STILLFORM
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/shop"
              className="text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors"
            >
              About
            </Link>
            <Link
              href="/shop"
              className="text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#C8A96E] hover:text-[#F5F3EF] transition-colors"
            >
              SF-01: Origin
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-[#F5F3EF] hover:text-[#C8A96E] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C8A96E] text-[#0A0A0A] text-[9px] font-[family-name:var(--font-dm-mono)] flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[#F5F3EF] hover:text-[#C8A96E] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col pt-14">
          <nav className="flex flex-col items-center justify-center flex-1 gap-10">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-bebas)] text-5xl tracking-widest text-[#F5F3EF] hover:text-[#C8A96E] transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-bebas)] text-5xl tracking-widest text-[#F5F3EF] hover:text-[#C8A96E] transition-colors"
            >
              SHOP
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-bebas)] text-5xl tracking-widest text-[#F5F3EF] hover:text-[#C8A96E] transition-colors"
            >
              ABOUT
            </Link>
          </nav>
          <div className="pb-12 flex justify-center gap-6">
            <span className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest">
              CALM. COMPOSED. CONSIDERED.
            </span>
          </div>
        </div>
      )}
    </>
  );
}

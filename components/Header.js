"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useScrollY } from "@/hooks/useScrollY";
import { usePathname } from "next/navigation";
// import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const { totalItems, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unviewedOrders, setUnviewedOrders] = useState(0);
  const scrollY = useScrollY();
  const pathname = usePathname();
  const scrolled = scrollY > 60;

  useEffect(() => {
    const phone = localStorage.getItem("ra_phone");
    if (!phone) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/unviewed/${encodeURIComponent(phone)}`)
      .then(r => r.json())
      .then(d => setUnviewedOrders(d.count || 0))
      .catch(() => {});
  }, [pathname]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "RA-01: Origin", accent: true },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-colors duration-500"
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--background) 98%, transparent)"
            : "color-mix(in srgb, var(--background) 85%, transparent)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid var(--border-mid)"
            : "1px solid var(--border-subtle)",
          boxShadow: scrolled ? "0 1px 0 rgba(200,169,110,0.08)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.2em] text-[#F5F3EF] hover:text-[#C8A96E] transition-colors duration-300"
          >
            REFINED ASPECT
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label, accent }) => (
              <Link
                key={label}
                href={href}
                className={`link-underline text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase transition-colors duration-300 ${
                  accent
                    ? "text-[#C8A96E] hover:text-[#F5F3EF]"
                    : pathname === href
                    ? "text-[#F5F3EF]"
                    : "text-[#6B6B6B] hover:text-[#F5F3EF]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* <ThemeToggle /> */}

            {/* Order tracking icon */}
            <Link href="/track-order" aria-label="Track order"
              className="relative text-[#F5F3EF] hover:text-[#C8A96E] transition-colors duration-300 group">
              <Package
                size={20} strokeWidth={1.5}
                className={unviewedOrders > 0 ? "animate-[trackPulse_2s_ease-in-out_infinite]" : ""}
              />
              {unviewedOrders > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-[#C8A96E] animate-[trackDot_2s_ease-in-out_infinite]" />
              )}
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-[#F5F3EF] hover:text-[#C8A96E] transition-colors duration-300 group"
              aria-label="Open cart"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C8A96E] text-[#0A0A0A] text-[9px] font-[family-name:var(--font-dm-mono)] flex items-center justify-center animate-[cartBadgePop_0.3s_cubic-bezier(0.22,1,0.36,1)]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-[#F5F3EF] hover:text-[#C8A96E] transition-colors duration-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div className="relative w-5 h-5">
                <span
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{ opacity: mobileOpen ? 0 : 1, transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  <Menu size={20} strokeWidth={1.5} />
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{ opacity: mobileOpen ? 1 : 0, transform: mobileOpen ? "rotate(0deg)" : "rotate(-90deg)" }}
                >
                  <X size={20} strokeWidth={1.5} />
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col transition-all duration-500"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          backgroundColor: "var(--background)",
        }}
      >
        {/* Top spacer matching header height */}
        <div className="h-[60px] border-b border-[rgba(245,243,239,0.06)]" />

        {/* Dune accent line */}
        <div
          className="h-[1px] bg-[#C8A96E] transition-all duration-700"
          style={{ width: mobileOpen ? "100%" : "0%", transitionDelay: "0.1s" }}
        />

        <nav className="flex flex-col items-center justify-center flex-1 gap-2">
          {[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            { href: "/about", label: "About" },
            { href: "/shop", label: "RA-01: Origin" },
          ].map(({ href, label }, i) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="mobile-nav-link font-[family-name:var(--font-bebas)] text-[clamp(2.5rem,10vw,4rem)] tracking-widest text-[#F5F3EF] hover:text-[#C8A96E] transition-colors duration-300 py-2"
              style={{
                opacity: mobileOpen ? undefined : 0,
                animationPlayState: mobileOpen ? "running" : "paused",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="pb-10 flex flex-col items-center gap-3">
          <div className="w-8 h-[1px] bg-[#C8A96E] opacity-40" />
          <span className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-[0.4em] uppercase">
            Refined. Considered. Intentional.
          </span>
        </div>
      </div>
    </>
  );
}

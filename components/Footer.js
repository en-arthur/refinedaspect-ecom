"use client";

import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(245,243,239,0.08)] py-14 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <AnimateIn variant="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            {/* Wordmark */}
            <Link
              href="/"
              className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest text-[#F5F3EF] hover:text-[#C8A96E] transition-colors duration-300"
            >
              REFINED ASPECT
            </Link>

            {/* Nav */}
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/about", label: "About" },
                { href: "/track-order", label: "Track Order" },
                { href: "#", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="link-underline text-[#6B6B6B] hover:text-[#C8A96E] transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Socials */}
            <div className="flex gap-5 items-center">
              <a
                href="https://instagram.com/refined_aspect_ecom"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @refined_aspect_ecom"
                className="text-[#6B6B6B] hover:text-[#C8A96E] transition-all duration-300 hover:scale-110"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@refinedaspect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok @refinedaspect"
                className="text-[#6B6B6B] hover:text-[#C8A96E] transition-all duration-300 hover:scale-110"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>
        </AnimateIn>

        {/* Bottom bar */}
        <AnimateIn variant="fade-in" delay={150} duration={700}>
          <div className="mt-10 pt-6 border-t border-[rgba(245,243,239,0.05)] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest uppercase">
              © 2026 Refined Aspect. All rights reserved.
            </p>
            <p className="text-[9px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest uppercase">
              Refined. Considered. Intentional.
            </p>
          </div>
        </AnimateIn>
      </div>
    </footer>
  );
}

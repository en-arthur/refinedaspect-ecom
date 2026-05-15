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
                href="https://facebook.com/refinedaspect"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#6B6B6B] hover:text-[#C8A96E] transition-all duration-300 hover:scale-110"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
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
              Wireless. Intelligent. Easy to Install.
            </p>
          </div>
        </AnimateIn>
      </div>
    </footer>
  );
}

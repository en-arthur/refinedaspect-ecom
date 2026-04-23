import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  weight: "300",
  variable: "--font-dm-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "STILLFORM — Calm. Composed. Considered.",
  description: "SF-01: Origin. Premium minimal menswear.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#0A0A0A] text-[#F5F3EF]">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1 page-transition">
            {children}
          </main>
          <footer className="border-t border-[rgba(245,243,239,0.08)] py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <span className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest text-[#F5F3EF]">
                  STILLFORM
                </span>
                <nav className="flex flex-wrap gap-6 text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest uppercase">
                  <a href="/" className="hover:text-[#C8A96E] transition-colors">Home</a>
                  <a href="/shop" className="hover:text-[#C8A96E] transition-colors">Shop</a>
                  <a href="/about" className="hover:text-[#C8A96E] transition-colors">About</a>
                  <a href="#" className="hover:text-[#C8A96E] transition-colors">Sizing</a>
                  <a href="#" className="hover:text-[#C8A96E] transition-colors">Contact</a>
                </nav>
                <div className="flex gap-4 items-center">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                    className="text-[#6B6B6B] hover:text-[#C8A96E] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                    className="text-[#6B6B6B] hover:text-[#C8A96E] transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-[rgba(245,243,239,0.06)] flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider">
                  © 2025 STILLFORM. ALL RIGHTS RESERVED.
                </p>
                <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider">
                  CALM. COMPOSED. CONSIDERED.
                </p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}

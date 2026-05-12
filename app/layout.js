import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
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
  title: "REFINED ASPECT — Refined. Considered. Intentional.",
  description: "RA-01: Origin. Premium minimal menswear.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1 page-transition">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

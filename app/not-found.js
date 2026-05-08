import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase mb-4">
        404
      </span>
      <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(4rem,15vw,10rem)] leading-none tracking-widest text-[#F5F3EF] mb-4">
        NOT FOUND
      </h1>
      <p className="font-[family-name:var(--font-dm-mono)] text-xs text-[#6B6B6B] tracking-wider max-w-xs mb-10">
        This page doesn't exist. Maybe it never did.
      </p>
      <Link
        href="/"
        className="btn-sweep inline-flex items-center gap-3 bg-[#F5F3EF] text-[#0A0A0A] px-10 py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase group"
      >
        <span className="relative z-10">Back to Home</span>
        <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );
}

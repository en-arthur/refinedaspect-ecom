import Link from "next/link";

export default async function OrderConfirmationPage({ params }) {
  const { id } = await params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase">
        Order Confirmed
      </span>
      <h1 className="font-[family-name:var(--font-bebas)] text-5xl md:text-6xl tracking-widest">
        THANK YOU
      </h1>
      <p className="text-sm font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider max-w-sm">
        Your order has been placed. We'll be in touch with shipping details.
      </p>
      <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-widest">
        Order ID: {id}
      </p>
      <Link href="/shop"
        className="mt-4 border border-[rgba(245,243,239,0.2)] px-8 py-3 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getOrder(id) {
  try {
    const res = await fetch(`${API}/api/orders/confirmation/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export default async function OrderConfirmationPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  return (
    <div className="min-h-screen px-6 md:px-12 py-20">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-4">
            Payment Successful
          </span>
          <h1 className="font-[family-name:var(--font-bebas)] text-[clamp(3rem,10vw,6rem)] leading-none tracking-widest text-[#F5F3EF] mb-4">
            THANK YOU
          </h1>
          <p className="font-[family-name:var(--font-dm-mono)] text-xs text-[#6B6B6B] tracking-wider max-w-sm mx-auto">
            Your order has been confirmed and is being processed. We'll be in touch with shipping details.
          </p>
          <div className="w-10 h-[1px] bg-[#C8A96E] mx-auto mt-6" />
        </div>

        {order && (
          <>
            {/* Order details */}
            <div className="mb-8" style={{ border: "1px solid rgba(245,243,239,0.08)" }}>
              <div className="px-6 py-4 flex justify-between items-center" style={{ borderBottom: "1px solid rgba(245,243,239,0.08)" }}>
                <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B]">Order Summary</span>
                <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#C8A96E]">#{id.slice(0, 8).toUpperCase()}</span>
              </div>

              {order.items?.map((item, i) => (
                <div key={i} className="px-6 py-4 flex justify-between items-center text-sm font-[family-name:var(--font-dm-mono)]"
                  style={{ borderBottom: "1px solid rgba(245,243,239,0.06)" }}>
                  <div>
                    <p className="tracking-wider text-[#F5F3EF]">{item.name}</p>
                    <p className="text-[10px] text-[#6B6B6B] mt-0.5 tracking-wider">Size: {item.size} · Qty: {item.quantity}</p>
                  </div>
                  <p className="text-[#C8A96E] tracking-wider">GHS {(item.price_ghs * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <div className="px-6 py-4 flex justify-between text-sm font-[family-name:var(--font-dm-mono)] tracking-wider">
                <span>Total</span>
                <span className="text-[#C8A96E]">GHS {Number(order.total_ghs).toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping info */}
            <div className="mb-8 px-6 py-5" style={{ border: "1px solid rgba(245,243,239,0.08)" }}>
              <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] mb-3">Shipping To</p>
              <p className="text-sm font-[family-name:var(--font-dm-mono)] tracking-wider text-[#F5F3EF]">{order.customer_name}</p>
              <p className="text-xs font-[family-name:var(--font-dm-mono)] tracking-wider text-[#6B6B6B] mt-1">{order.shipping_address?.line1}</p>
              <p className="text-xs font-[family-name:var(--font-dm-mono)] tracking-wider text-[#6B6B6B]">
                {order.shipping_address?.city}, {order.shipping_address?.region}
              </p>
            </div>

            {/* Delivery estimate */}
            <div className="mb-12 px-6 py-5" style={{ border: "1px solid rgba(245,243,239,0.08)", background: "rgba(200,169,110,0.04)" }}>
              <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#C8A96E] mb-2">Delivery Estimate</p>
              <p className="text-xs font-[family-name:var(--font-dm-mono)] tracking-wider text-[#6B6B6B]">
                Sekondi-Takoradi — Same day · Nationwide Ghana — Up to 2 days
              </p>
            </div>
          </>
        )}

        {/* CTA */}
        <div className="text-center flex flex-col items-center gap-4">
          <Link href="/shop"
            className="btn-sweep inline-flex items-center gap-3 bg-[#F5F3EF] text-[#0A0A0A] px-10 py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-[0.2em] uppercase group">
            <span className="relative z-10">Continue Shopping</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link href={`/track-order/${id}`}
            className="text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] hover:text-[#C8A96E] transition-colors">
            Track this order →
          </Link>
        </div>

      </div>
    </div>
  );
}

import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

const STEPS = ["pending", "processing", "shipped", "delivered"];

async function getOrder(id) {
  try {
    const res = await fetch(`${API}/api/orders/confirmation/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

export default async function TrackOrderDetailPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest">ORDER NOT FOUND</p>
      <Link href="/track-order" className="text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#C8A96E] uppercase">← Back to Tracking</Link>
    </div>
  );

  const currentStep = order.status === "cancelled" ? -1 : STEPS.indexOf(order.status);

  return (
    <div className="min-h-screen px-6 md:px-12 py-20">
      <div className="max-w-2xl mx-auto">

        <Link href="/track-order" className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] uppercase mb-8 block">
          ← Back to Tracking
        </Link>

        <div className="text-center mb-12">
          <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-2">
            Order #{id.slice(0, 8).toUpperCase()}
          </span>
          <h1 className="font-[family-name:var(--font-bebas)] text-4xl tracking-widest">
            {order.status === "cancelled" ? "ORDER CANCELLED" : order.status === "delivered" ? "ORDER DELIVERED" : "ORDER IN PROGRESS"}
          </h1>
        </div>

        {/* Status Progress Bar */}
        {order.status !== "cancelled" && (
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {/* Line */}
              <div className="absolute left-0 right-0 top-3 h-[1px]" style={{ background: "rgba(245,243,239,0.08)" }} />
              <div className="absolute left-0 top-3 h-[1px] transition-all duration-700"
                style={{ background: "#C8A96E", width: `${currentStep === 0 ? 0 : (currentStep / (STEPS.length - 1)) * 100}%` }} />

              {STEPS.map((step, i) => (
                <div key={step} className="flex flex-col items-center gap-2 relative z-10">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500"
                    style={{
                      background: i <= currentStep ? "#C8A96E" : "var(--surface)",
                      border: `1px solid ${i <= currentStep ? "#C8A96E" : "rgba(245,243,239,0.15)"}`,
                    }}>
                    {i < currentStep && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#0A0A0A" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                    {i === currentStep && <div className="w-2 h-2 rounded-full bg-[#0A0A0A]" />}
                  </div>
                  <span className="text-[9px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase"
                    style={{ color: i <= currentStep ? "#C8A96E" : "#6B6B6B" }}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <div className="mb-6" style={{ border: "1px solid rgba(245,243,239,0.08)" }}>
          <p className="px-6 py-4 text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B]"
            style={{ borderBottom: "1px solid rgba(245,243,239,0.08)" }}>Items</p>
          {order.items?.map((item, i) => (
            <div key={i} className="px-6 py-4 flex justify-between text-sm font-[family-name:var(--font-dm-mono)]"
              style={{ borderBottom: "1px solid rgba(245,243,239,0.06)" }}>
              <div>
                <p className="tracking-wider">{item.name}</p>
                <p className="text-[10px] text-[#6B6B6B] mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
              </div>
              <p className="text-[#C8A96E]">GHS {(item.price_ghs * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="px-6 py-4 flex justify-between text-sm font-[family-name:var(--font-dm-mono)] tracking-wider">
            <span>Total</span>
            <span className="text-[#C8A96E]">GHS {Number(order.total_ghs).toFixed(2)}</span>
          </div>
        </div>

        {/* Delivery info */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-5" style={{ border: "1px solid rgba(245,243,239,0.08)" }}>
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] mb-2">Shipping To</p>
            <p className="text-sm font-[family-name:var(--font-dm-mono)] tracking-wider">{order.customer_name}</p>
            <p className="text-xs text-[#6B6B6B] mt-1">{order.shipping_address?.city}, {order.shipping_address?.region}</p>
          </div>
          <div className="p-5" style={{ border: "1px solid rgba(245,243,239,0.08)" }}>
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] mb-2">Payment</p>
            <p className="text-sm font-[family-name:var(--font-dm-mono)] tracking-wider"
              style={{ color: order.payment_status === "paid" ? "#6fcf6f" : "#C8A96E" }}>
              {order.payment_status === "paid" ? "✓ Paid" : "Pending"}
            </p>
            <p className="text-[10px] text-[#6B6B6B] mt-1">
              {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/shop"
            className="text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase text-[#6B6B6B] hover:text-[#F5F3EF] transition-colors">
            Continue Shopping →
          </Link>
        </div>

      </div>
    </div>
  );
}

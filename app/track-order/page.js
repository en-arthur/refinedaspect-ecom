"use client";

import { useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL;

const STATUS_COLOR = {
  pending: "#C8A96E",
  processing: "#6B9FD4",
  shipped: "#9B6BD4",
  delivered: "#6fcf6f",
  cancelled: "#e05252",
};

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrders(null);
    try {
      const res = await fetch(`${API}/api/orders/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Failed to find orders");
      setOrders(data);
      if (data.length === 0) setError("No orders found for this number.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-20">
      <div className="max-w-xl mx-auto">
        <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.4em] text-[#C8A96E] uppercase block mb-4">
          Order Tracking
        </span>
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-widest mb-2">TRACK YOUR ORDER</h1>
        <p className="font-[family-name:var(--font-dm-mono)] text-xs text-[#6B6B6B] tracking-wider mb-10">
          Enter the phone number you used at checkout.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-10">
          <input
            type="tel" value={phone} onChange={e => setPhone(e.target.value)}
            placeholder="+233 XX XXX XXXX" required
            className="flex-1 px-4 py-3 text-sm font-[family-name:var(--font-dm-mono)] outline-none bg-transparent"
            style={{ border: "1px solid var(--border-mid)", color: "var(--foreground)" }}
          />
          <button type="submit" disabled={loading}
            className="px-6 py-3 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase"
            style={{ background: "var(--foreground)", color: "var(--background)", opacity: loading ? 0.7 : 1 }}>
            {loading ? "..." : "Track"}
          </button>
        </form>

        {error && <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] mb-6">{error}</p>}

        {orders && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <Link key={order.id} href={`/track-order/${order.id}`}
                className="block p-5 transition-colors hover:border-[rgba(245,243,239,0.2)]"
                style={{ border: "1px solid rgba(245,243,239,0.08)", background: "var(--surface)" }}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-[family-name:var(--font-dm-mono)] text-xs tracking-widest" style={{ color: "var(--foreground)" }}>
                      #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider mt-0.5">
                      {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <span className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest uppercase px-2 py-1"
                    style={{ color: STATUS_COLOR[order.status] || "#6B6B6B", border: `1px solid ${STATUS_COLOR[order.status] || "#6B6B6B"}44` }}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider">
                    {order.items?.length} {order.items?.length === 1 ? "item" : "items"}
                  </p>
                  <p className="text-xs font-[family-name:var(--font-dm-mono)] text-[#C8A96E] tracking-wider">
                    GHS {Number(order.total_ghs).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

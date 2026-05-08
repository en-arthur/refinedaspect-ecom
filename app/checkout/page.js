"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, subtotalGHS, subtotalUSD, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customer_name: "", customer_email: "", customer_phone: "",
    line1: "", line2: "", city: "", region: "", country: "Ghana",
  });

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  async function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError("");
    try {
      const order = await createOrder({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone || undefined,
        shipping_address: {
          line1: form.line1, line2: form.line2 || undefined,
          city: form.city, region: form.region, country: form.country,
        },
        items: items.map(i => ({
          product_id: i.id,
          slug: i.slug,
          name: i.name,
          size: i.size,
          color: i.colors?.[0] || "",
          quantity: i.quantity,
          price_ghs: i.priceGHS,
          price_usd: i.priceUSD,
        })),
        total_ghs: subtotalGHS,
        total_usd: subtotalUSD,
      });
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-[family-name:var(--font-bebas)] text-3xl tracking-widest">YOUR BAG IS EMPTY</p>
        <Link href="/shop" className="text-xs font-[family-name:var(--font-dm-mono)] tracking-widest text-[#C8A96E] uppercase">
          Shop the Collection →
        </Link>
      </div>
    );
  }

  const field = (label, key, type = "text", required = true) => (
    <div>
      <label className="block text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] uppercase mb-1">{label}</label>
      <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} required={required}
        className="w-full px-4 py-3 text-sm font-[family-name:var(--font-dm-mono)] outline-none bg-transparent"
        style={{ border: "1px solid rgba(245,243,239,0.15)", color: "var(--foreground)" }}
      />
    </div>
  );

  return (
    <div className="min-h-screen px-6 md:px-12 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-[family-name:var(--font-bebas)] text-5xl tracking-widest mb-12">CHECKOUT</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.3em] text-[#C8A96E] uppercase">Contact</p>
            {field("Full Name", "customer_name")}
            {field("Email", "customer_email", "email")}
            {field("Phone", "customer_phone", "tel", false)}

            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.3em] text-[#C8A96E] uppercase mt-4">Shipping Address</p>
            {field("Address Line 1", "line1")}
            {field("Address Line 2 (optional)", "line2", "text", false)}
            <div className="grid grid-cols-2 gap-4">
              {field("City", "city")}
              {field("Region", "region")}
            </div>
            {field("Country", "country")}

            {error && <p className="text-xs text-red-400 font-[family-name:var(--font-dm-mono)]">{error}</p>}

            <button type="submit" disabled={submitting}
              className="mt-4 w-full py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase"
              style={{ background: "#F5F3EF", color: "#0A0A0A" }}>
              {submitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          {/* Order Summary */}
          <div>
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.3em] text-[#C8A96E] uppercase mb-6">Order Summary</p>
            <div className="flex flex-col divide-y" style={{ borderColor: "rgba(245,243,239,0.08)" }}>
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between py-4 text-sm font-[family-name:var(--font-dm-mono)]">
                  <div>
                    <p className="tracking-wider">{item.name}</p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Size: {item.size} · Qty: {item.quantity}</p>
                  </div>
                  <p className="text-[#C8A96E]">GHS {item.priceGHS * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4 text-sm font-[family-name:var(--font-dm-mono)] tracking-wider"
              style={{ borderTop: "1px solid rgba(245,243,239,0.08)" }}>
              <span>Total</span>
              <span className="text-[#C8A96E]">GHS {subtotalGHS} <span className="text-[#6B6B6B] text-xs">/ ${subtotalUSD}</span></span>
            </div>
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider mt-2">
              {subtotalGHS >= 600 ? "✓ Free shipping applied" : `Free shipping on orders over GHS 600`}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

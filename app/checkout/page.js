"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GHANA_REGIONS, REGIONS } from "@/lib/ghana-locations";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CheckoutPage() {
  const { items, subtotalGHS, subtotalUSD, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customer_name: "", customer_email: "", customer_phone: "",
    line1: "", line2: "", city: "", region: "", country: "Ghana",
  });

  // Load Paystack Popup JS
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  function set(key, val) {
    setForm(f => ({
      ...f,
      [key]: val,
      ...(key === "region" ? { city: "" } : {}),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError("");

    try {
      // 1. Create order (pending/unpaid)
      const order = await createOrder({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone || undefined,
        shipping_address: {
          line1: form.line1, line2: form.line2 || undefined,
          city: form.city === "Other" ? form.cityCustom : form.city,
          region: form.region === "Other" ? form.regionCustom : form.region,
          country: form.country,
        },
        items: items.map(i => ({
          product_id: i.id, slug: i.slug, name: i.name,
          size: i.size, color: i.colors?.[0] || "",
          quantity: i.quantity, price_ghs: i.priceGHS, price_usd: i.priceUSD,
        })),
        total_ghs: subtotalGHS,
        total_usd: subtotalUSD,
      });

      // 2. Initialize Paystack transaction
      const initRes = await fetch(`${API}/api/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: order.id,
          email: form.customer_email,
          amount_ghs: subtotalGHS,
        }),
      });

      if (!initRes.ok) throw new Error("Payment initialization failed");
      const { access_code, reference } = await initRes.json();

      // 3. Open Paystack Popup
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: form.customer_email,
        amount: subtotalGHS * 100,
        currency: "GHS",
        ref: reference,
        access_code,
        onClose: function() {
          setSubmitting(false);
          setError("Payment cancelled. Your order is saved — you can complete payment later.");
        },
        callback: function(response) {
          // Verify payment after popup closes
          fetch(`${API}/api/paystack/verify/${response.reference}`)
            .then(r => r.json())
            .then(verify => {
              if (verify.status === "success") {
                localStorage.setItem("ra_phone", form.customer_phone.trim().replace(/^\+233/, "0").replace(/^233(?=\d{9})/, "0"));
                clearCart();
                router.push(`/order-confirmation/${order.id}`);
              } else {
                setSubmitting(false);
                setError("Payment could not be verified. Please contact us.");
              }
            })
            .catch(() => {
              setSubmitting(false);
              setError("Verification failed. Please contact us.");
            });
        },
      });

      handler.openIframe();
    } catch (err) {
      setError(err.message);
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
        style={{ border: "1px solid var(--border-mid)", color: "var(--foreground)" }}
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
              {/* Region dropdown */}
              <div>
                <label className="block text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] uppercase mb-1">Region</label>
                <select value={form.region === form.regionCustom && form.regionCustom ? "Other" : form.region}
                  onChange={e => { set("region", e.target.value); if (e.target.value !== "Other") set("regionCustom", ""); }}
                  required
                  className="w-full px-4 py-3 text-sm font-[family-name:var(--font-dm-mono)] outline-none"
                  style={{ border: "1px solid var(--border-mid)", color: "var(--foreground)", background: "transparent" }}>
                  <option value="" disabled>Select region</option>
                  {REGIONS.map(r => <option key={r} value={r} style={{ background: "#0A0A0A" }}>{r}</option>)}
                  <option value="Other" style={{ background: "#0A0A0A" }}>Other</option>
                </select>
                {form.region === "Other" && (
                  <input type="text" placeholder="Type your region" value={form.regionCustom || ""} onChange={e => set("regionCustom", e.target.value)} required
                    className="w-full px-4 py-2 mt-2 text-sm font-[family-name:var(--font-dm-mono)] outline-none bg-transparent"
                    style={{ border: "1px solid var(--border-mid)", color: "var(--foreground)" }} />
                )}
              </div>

              {/* City dropdown */}
              <div>
                <label className="block text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] uppercase mb-1">City / Town</label>
                <select value={form.city} onChange={e => set("city", e.target.value)} required
                  disabled={!form.region}
                  className="w-full px-4 py-3 text-sm font-[family-name:var(--font-dm-mono)] outline-none"
                  style={{ border: "1px solid var(--border-mid)", color: form.city ? "var(--foreground)" : "#6B6B6B", background: "transparent", opacity: form.region ? 1 : 0.5 }}>
                  <option value="" disabled>Select city</option>
                  {(GHANA_REGIONS[form.region] || []).map(c => <option key={c} value={c} style={{ background: "#0A0A0A" }}>{c}</option>)}
                  <option value="Other" style={{ background: "#0A0A0A" }}>Other</option>
                </select>
                {form.city === "Other" && (
                  <input type="text" placeholder="Type your city/town" value={form.cityCustom || ""} onChange={e => set("cityCustom", e.target.value)} required
                    className="w-full px-4 py-2 mt-2 text-sm font-[family-name:var(--font-dm-mono)] outline-none bg-transparent"
                    style={{ border: "1px solid var(--border-mid)", color: "var(--foreground)" }} />
                )}
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-[family-name:var(--font-dm-mono)] tracking-widest text-[#6B6B6B] uppercase mb-1">Country</label>
              <div className="w-full px-4 py-3 text-sm font-[family-name:var(--font-dm-mono)]"
                style={{ border: "1px solid var(--border-mid)", color: "var(--text-muted)" }}>
                Ghana
              </div>
            </div>

            {error && <p className="text-xs font-[family-name:var(--font-dm-mono)]" style={{ color: "#e05252" }}>{error}</p>}

            <button type="submit" disabled={submitting}
              className="mt-4 w-full py-4 text-xs font-[family-name:var(--font-dm-mono)] tracking-widest uppercase"
              style={{ background: "var(--foreground)", color: "var(--background)", opacity: submitting ? 0.7 : 1 }}>
              {submitting ? "Processing..." : `Pay GHS ${subtotalGHS}`}
            </button>
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider text-center">
              Secured by Paystack
            </p>
          </form>

          {/* Order Summary */}
          <div>
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] tracking-[0.3em] text-[#C8A96E] uppercase mb-6">Order Summary</p>
            <div className="flex flex-col divide-y" style={{ borderColor: "var(--border-mid)" }}>
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
              style={{ borderTop: "1px solid var(--border-mid)" }}>
              <span>Total</span>
              <span className="text-[#C8A96E]">GHS {subtotalGHS} <span className="text-[#6B6B6B] text-xs">/ ${subtotalUSD}</span></span>
            </div>
            <p className="text-[10px] font-[family-name:var(--font-dm-mono)] text-[#6B6B6B] tracking-wider mt-2">
              {subtotalGHS >= 600 ? "✓ Free shipping applied" : "Free shipping on orders over GHS 600"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

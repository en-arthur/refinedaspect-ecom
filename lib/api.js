const API = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProducts(featured) {
  const url = featured ? `${API}/api/products?featured=true` : `${API}/api/products`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function fetchProductBySlug(slug) {
  const res = await fetch(`${API}/api/products/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function createOrder(data) {
  const res = await fetch(`${API}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Failed to place order");
  }
  return res.json();
}

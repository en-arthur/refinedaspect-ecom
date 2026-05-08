// Normalize API snake_case response to camelCase for existing components
export function normalizeProduct(p) {
  return {
    ...p,
    priceGHS: p.price_ghs,
    priceUSD: p.price_usd,
    colorHex: p.color_hex,
    soldOut: p.sold_out,
  };
}

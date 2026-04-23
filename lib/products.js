export const products = [
  {
    id: "the-mark",
    name: "THE MARK",
    slug: "the-mark",
    priceGHS: 280,
    priceUSD: 22,
    collection: "SF-01: ORIGIN",
    colors: ["Bone White"],
    colorHex: ["#F5F3EF"],
    description:
      "The foundation piece. Clean wordmark front, editorial illustration back. Dressed with intention.",
    care: [
      "Machine wash cold, gentle cycle",
      "Do not bleach",
      "Tumble dry low",
      "Iron on low heat if needed",
      "Do not dry clean",
    ],
    sizes: ["S", "M", "L", "XL"],
    soldOut: [],
    images: ["/products/mark-front.jpg", "/products/mark-back.jpg"],
    category: "Tee",
    featured: true,
  },
  {
    id: "the-origin",
    name: "THE ORIGIN",
    slug: "the-origin",
    priceGHS: 280,
    priceUSD: 22,
    collection: "SF-01: ORIGIN",
    colors: ["Void Black"],
    colorHex: ["#0A0A0A"],
    description:
      "Rooted in coordinates. Meridian graphic front, barcode back. From here, everywhere.",
    care: [
      "Machine wash cold, gentle cycle",
      "Do not bleach",
      "Tumble dry low",
      "Iron on low heat if needed",
      "Do not dry clean",
    ],
    sizes: ["S", "M", "L", "XL"],
    soldOut: ["S"],
    images: ["/products/origin-front.jpg", "/products/origin-back.jpg"],
    category: "Tee",
    featured: true,
  },
  {
    id: "the-statement",
    name: "THE STATEMENT",
    slug: "the-statement",
    priceGHS: 300,
    priceUSD: 24,
    collection: "SF-01: ORIGIN",
    colors: ["Dune Gold"],
    colorHex: ["#C8A96E"],
    description:
      "The bold drop piece. Split vertical type front, editorial badge back. Limited.",
    care: [
      "Machine wash cold, gentle cycle",
      "Do not bleach",
      "Tumble dry low",
      "Iron on low heat if needed",
      "Do not dry clean",
    ],
    sizes: ["S", "M", "L", "XL"],
    soldOut: ["XL"],
    images: ["/products/statement-front.jpg", "/products/statement-back.jpg"],
    category: "Tee",
    featured: true,
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) || null;
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

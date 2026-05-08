import { fetchProductBySlug, fetchProducts } from "@/lib/api";
import { normalizeProduct } from "@/lib/normalize";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — STILLFORM`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    fetchProductBySlug(slug),
    fetchProducts(),
  ]);
  if (!product) notFound();

  const related = allProducts.filter((p) => p.slug !== slug).map(normalizeProduct);

  return <ProductDetail product={normalizeProduct(product)} related={related} />;
}

import { getProductBySlug, products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — STILLFORM`,
    description: product.description,
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id);

  return <ProductDetail product={product} related={related} />;
}

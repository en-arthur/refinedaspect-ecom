import { getProductBySlug, products } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — STILLFORM`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id);

  return <ProductDetail product={product} related={related} />;
}

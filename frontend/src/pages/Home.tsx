// /src/pages/Home.tsx
import { useState } from "react";
import Hero from "../components/ui/Hero";
import { products } from "../mock/products";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/ui/PageWrapper";
import CategoryFilterSimple from "../components/CategoryFilterSimple";

export default function Home() {
  const [category, setCategory] = useState("all");

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.categorySlug === category);

  return (
    <PageWrapper>
      <Hero />

      <CategoryFilterSimple selected={category} onSelect={setCategory} />

      <h1 className="text-3xl font-bold mb-6 text-pink-700">
        {category === "all" ? "Nuestros Postres" : `Postres: ${category}`}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PageWrapper>
  );
}

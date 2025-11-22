// /src/pages/Home.tsx
import { useEffect, useState } from "react";
import Hero from "../components/ui/Hero";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/ui/PageWrapper";
import CategoryFilterSimple from "../components/CategoryFilterSimple";
import { getCategories } from "../services/categoryService";
import { getProducts, getProductsByCategory } from "../services/productService";
import type { Product } from "../types/product";
import type { Category } from "../types/category";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  // Cargar todas las categorías
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Cargar productos (filtrados o no)
  useEffect(() => {
    setLoading(true);

    const load = async () => {
      if (category === "all") {
        const data = await getProducts();
        setProducts(data);
      } else {
        const data = await getProductsByCategory(Number(category));
        setProducts(data);
      }
      setLoading(false);
    };

    load();
  }, [category]);

  return (
    <PageWrapper>
      <Hero />

      {/* Selector de categorías dinámico desde API */}
      <CategoryFilterSimple
        selected={category}
        onSelect={setCategory}
        categories={categories}
      />

      <h1 className="text-3xl font-bold mb-6 text-yellow-600">
        {category === "all" ? "Nuestros Postres" : `Postres`}
      </h1>

      {loading ? (
        <p className="text-gray-600">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}

// /src/pages/Categories.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../components/ui/PageWrapper";
import { categories } from "../mock/categories";
import { products } from "../mock/products";
import { filterProducts } from "../utils/filterProducts";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";

export default function Categories() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  const [filters, setFilters] = useState({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    sort: "",
  });

  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    if (!category) return;

    const productsOfCategory = products.filter(
      (p) => p.category === category.slug
    );

    const result = filterProducts(productsOfCategory, filters);
    setFiltered(result);
  }, [category, filters]);

  if (!category)
    return <h1 className="text-red-600">Categoría no encontrada.</h1>;

  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-pink-700 mb-4">{category.name}</h1>

      <CategoryFilter filters={filters} setFilters={setFilters} />

      <ProductGrid products={filtered} />
    </PageWrapper>
  );
}

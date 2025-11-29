import { useParams } from "react-router-dom";
import PageWrapper from "../components/ui/PageWrapper";
import ProductList from "../components/ProductList";
import CategoryFilter from "../components/CategoryFilter";
import { useCategories, useProducts } from "../hooks";
import { useState } from "react";

export default function Categories() {
  const { slug } = useParams();
  const { categories } = useCategories();
  const category = categories.find((c) => c.slug === slug);

  const [filters, setFilters] = useState({
    minPrice: null as number | null,
    maxPrice: null as number | null,
    sort: "",
  });

  // Si no hay categoría, no obtenemos productos
  const categoryId = category ? category.id : 0;
  const { products, loading } = useProducts(
    categoryId && categoryId > 0 ? categoryId : undefined
  );

  // Filtrar productos localmente basado en los filtros
  const filtered = products.filter((p) => {
    if (filters.minPrice && p.base_price < filters.minPrice) return false;
    if (filters.maxPrice && p.base_price > filters.maxPrice) return false;
    return true;
  });

  // Ordenar si es necesario
  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === "price-asc") return a.base_price - b.base_price;
    if (filters.sort === "price-desc") return b.base_price - a.base_price;
    return 0;
  });

  if (!category)
    return (
      <h1 className="text-red-600 text-center py-10">
        Categoría no encontrada.
      </h1>
    );

  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-yellow-700 mb-4">
        {category.name}
      </h1>

      <CategoryFilter filters={filters} setFilters={setFilters} />

      <ProductList
        products={sorted}
        isLoading={loading}
        emptyMessage={`No hay productos en ${category.name}`}
      />
    </PageWrapper>
  );
}

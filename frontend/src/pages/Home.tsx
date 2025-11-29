import Hero from "../components/ui/Hero";
import PageWrapper from "../components/ui/PageWrapper";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import { useCategories, useProducts, useCategoryFilter } from "../hooks";

export default function Home() {
  const { categories, loading: categoriesLoading } = useCategories();
  const { selectedCategory, setSelectedCategory } = useCategoryFilter("all");
  const categoryId =
    selectedCategory === "all" ? undefined : Number(selectedCategory);
  const { products, loading: productsLoading } = useProducts(categoryId);

  const handleCategorySelect = (id: number) => {
    setSelectedCategory(id === 0 ? "all" : String(id));
  };

  const isLoading = categoriesLoading || productsLoading;

  return (
    <PageWrapper>
      <Hero />

      <section className="mt-8">
        <CategoryList
          categories={categories}
          isLoading={categoriesLoading}
          selectedId={selectedCategory === "all" ? 0 : Number(selectedCategory)}
          onCategoryClick={handleCategorySelect}
        />
      </section>

      <section className="mt-10">
        <h1 className="text-3xl font-bold mb-6 text-yellow-600">
          {selectedCategory === "all" ? "Nuestros Postres" : "Postres"}
        </h1>

        <ProductList
          products={products}
          isLoading={isLoading}
          emptyMessage="No hay productos disponibles"
        />
      </section>
    </PageWrapper>
  );
}

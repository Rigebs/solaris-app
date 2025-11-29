import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks";

export default function CategoryPage() {
  const { id } = useParams();
  const categoryId = id ? Number(id) : 0;
  const { products, loading, error } = useProducts(categoryId);

  // Obtener nombre de la categoría (si está disponible en algún producto)
  const categoryName = products[0]?.category_name || "Productos";

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center py-10 text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      <h1 className="text-4xl font-bold text-yellow-700 mb-8">
        {categoryName}
      </h1>

      <ProductList
        products={products}
        isLoading={loading}
        emptyMessage="No hay productos en esta categoría"
      />
    </div>
  );
}

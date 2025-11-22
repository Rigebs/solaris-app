import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../services/productService";
import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { id } = useParams(); // viene de /categoria/1
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getProductsByCategory(Number(id));
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <p className="text-center py-10 text-yellow-700 font-semibold">
        Cargando productos...
      </p>
    );

  // Nombre de categoría (opcional)
  const categoryName = products[0]?.category_name || "Productos";

  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      <h1 className="text-4xl font-bold text-yellow-700 mb-8">
        {categoryName}
      </h1>

      {/* Si no hay productos */}
      {products.length === 0 && (
        <p className="text-gray-600 text-lg">
          No hay productos en esta categoría.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
  columns?: number;
}

export default function ProductList({
  products,
  isLoading = false,
  emptyMessage = "No hay productos disponibles",
  columns = 3,
}: ProductListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  const colsClass =
    {
      1: "grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
    }[columns] || "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 ${colsClass} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

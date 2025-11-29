import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "../services/productService";
import type { Product } from "../types/product";

interface useProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useProducts(categoryId?: number): useProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      let data: Product[];

      if (categoryId && categoryId > 0) {
        data = await getProductsByCategory(categoryId);
      } else {
        data = await getProducts();
      }

      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar productos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  return { products, loading, error, refetch: fetchProducts };
}

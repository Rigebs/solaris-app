import { useEffect, useState } from "react";
import { getProductById } from "../services/productService";
import type { Product } from "../types/product";

interface useProductDetailReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProductDetail(productId: number): useProductDetailReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Producto no encontrado");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
}

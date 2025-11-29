import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { adminService } from "../services/adminService";
import { useToast } from "../context/ToastContext";
import type { Product } from "../types/product";

interface useAdminProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  deleteProduct: (id: number) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useAdminProducts(): useAdminProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar productos"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: number): Promise<boolean> => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) {
      return false;
    }

    try {
      await adminService.deleteProduct(id);
      showToast("Producto eliminado", "success");
      await fetchProducts();
      return true;
    } catch (err) {
      showToast("Error al eliminar producto", "error");
      return false;
    }
  };

  // Cargar al montar
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, deleteProduct, refetch: fetchProducts };
}

import { useState, useEffect } from "react";
import { getCategories } from "../services/categoryService";
import { adminService } from "../services/adminService";
import { useToast } from "../context/ToastContext";
import type { Category } from "../types/category";

interface useAdminCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  deleteCategory: (id: number) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useAdminCategories(): useAdminCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar categorías"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number): Promise<boolean> => {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      return false;
    }

    try {
      await adminService.deleteCategory(id);
      showToast("Categoría eliminada", "success");
      await fetchCategories();
      return true;
    } catch (err) {
      showToast("Error al eliminar categoría", "error");
      return false;
    }
  };

  // Cargar al montar
  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    deleteCategory,
    refetch: fetchCategories,
  };
}

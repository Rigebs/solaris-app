import { useState, useEffect } from "react";
import { adminService } from "../services/adminService";

interface AdminStats {
  products: number;
  categories: number;
  orders: number;
}

interface useAdminStatsReturn {
  stats: AdminStats;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAdminStats(): useAdminStatsReturn {
  const [stats, setStats] = useState<AdminStats>({
    products: 0,
    categories: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar estadísticas"
      );
    } finally {
      setLoading(false);
    }
  };

  // Cargar al montar
  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}

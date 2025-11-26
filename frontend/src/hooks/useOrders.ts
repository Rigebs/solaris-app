import { useEffect, useState } from "react";
import { getOrdersByUser } from "../services/orderService";
import type { Order } from "../types/order";

export function useOrders(userId: number) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    getOrdersByUser(userId)
      .then((res) => setOrders(res))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [userId]);

  return { orders, loading, error };
}

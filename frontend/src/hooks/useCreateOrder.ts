import { useState } from "react";
import { createOrder as createOrderRequest } from "../services/orderService";
import type { OrderRequest, Order } from "../types/order";

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const createOrder = async (data: OrderRequest): Promise<Order | null> => {
    setLoading(true);
    setError(null);

    try {
      const res = await createOrderRequest(data);
      return res;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createOrder, loading, error };
}

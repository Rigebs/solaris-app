import { api } from "../lib/axios";
import type { Order, OrderRequest } from "../types/order";

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/orders/");
  return res.data;
};

export const getOrdersByUser = async (userId: number): Promise<Order[]> => {
  const res = await api.get<Order[]>(`/orders/?user_id=${userId}`);
  return res.data;
};

export const getOrderById = async (id: string): Promise<Order> => {
  const res = await api.get<Order>(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (newOrder: OrderRequest): Promise<Order> => {
  const res = await api.post<Order>("/orders/", newOrder);
  return res.data;
};

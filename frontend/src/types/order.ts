import type { Product } from "./product";

export type OrderItem = {
  id: number;
  product_id: number;
  name: string;
  size?: string;
  toppings: string[];
  notes?: string;
  unit_price: number;
  quantity: number;
  product?: Product;
};

export type Order = {
  id: number;
  user_id: number;
  total: number;
  status: "pending" | "in_progress" | "ready" | "completed" | "cancelled";
  created_at: string;
  updated_at?: string;
  admin_notes?: string;
  items: OrderItem[];
};

export type OrderItemRequest = {
  product_id: number;
  name: string;
  size?: string;
  toppings: string[];
  notes?: string;
  unit_price: number;
  quantity: number;
};

export type OrderRequest = {
  items: OrderItemRequest[];
  total: number;
};

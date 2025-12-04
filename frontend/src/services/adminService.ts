import type { Product } from "../types/product";
import type { Category } from "../types/category";
import type { Order } from "../types/order";
import { api } from "../lib/axios";

export const adminService = {
  // Products
  createProduct: async (data: any) => {
    const response = await api.post<Product>("/products/", data);
    return response.data;
  },
  updateProduct: async (id: number, data: any) => {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },
  deleteProduct: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Categories
  createCategory: async (data: any) => {
    const response = await api.post<Category>("/categories/", data);
    return response.data;
  },
  updateCategory: async (id: number, data: any) => {
    const response = await api.put<Category>(`/categories/${id}`, data);
    return response.data;
  },
  deleteCategory: async (id: number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },

  // Orders (Admin view)
  getAllOrders: async () => {
    const response = await api.get<Order[]>("/orders/all");
    return response.data;
  },

  updateOrderStatus: async (
    orderId: number,
    status: string,
    adminNotes?: string
  ) => {
    const response = await api.put<Order>(`/orders/${orderId}`, {
      status,
      admin_notes: adminNotes,
    });
    return response.data;
  },

  // Stats
  getStats: async () => {
    const response = await api.get<{
      products: number;
      categories: number;
      orders: number;
    }>("/admin/stats");
    return response.data;
  },
};

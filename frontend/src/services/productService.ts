import { api } from "../lib/axios";
import type { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products/");
  return res.data;
};

export const getProductsByCategory = async (
  categoryId: number
): Promise<Product[]> => {
  console.log("hola");

  const res = await api.get<Product[]>(`/products/?category_id=${categoryId}`);
  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

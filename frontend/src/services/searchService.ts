import { api } from '../lib/axios';
import type { Product } from '../types/product';

export const searchProducts = async (query: string): Promise<Product[]> => {
  if (query.length < 2) return [];
  const response = await api.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`);
  return response.data;
};

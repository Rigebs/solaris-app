import { api } from "../lib/axios";
import type { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories/");
  return res.data;
};

export interface ProductSize {
  label: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  category_id: number;
  category_name?: string; // opcional
  sizes: ProductSize[];
  toppings: string[];
  images: string[];
}

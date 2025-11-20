export type ProductSize = {
  label: string;
  price: number;
};

export type Product = {
  id: number;
  name: string;
  basePrice: number;
  images: string[];
  category: string;
  categorySlug: string;
  description: string;
  sizes: ProductSize[];
  toppings: string[];
};

import { useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { getProducts } from "../services/productService";
import type { Product } from "../types/product";

interface useWishlistProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useWishlistProducts(): useWishlistProductsReturn {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const allProducts = await getProducts();
        const wishlistProducts = allProducts.filter((p) =>
          wishlist.includes(p.id)
        );
        setProducts(wishlistProducts);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar favoritos"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [wishlist]);

  return { products, loading, error };
}

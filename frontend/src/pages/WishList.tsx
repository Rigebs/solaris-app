import { useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import PageWrapper from "../components/ui/PageWrapper";
import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../services/productService";
import type { Product } from "../types/product";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        const wishlistProducts = allProducts.filter((p) => wishlist.includes(p.id));
        setProducts(wishlistProducts);
      } catch (error) {
        console.error('Error fetching wishlist products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [wishlist]);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="text-center py-12">
          <div className="text-lg text-gray-600">Cargando favoritos...</div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-yellow-700 mb-6">Tus favoritos</h1>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-yellow-50 rounded-xl">
          <p className="text-gray-600 text-lg mb-2">No tienes productos en favoritos.</p>
          <p className="text-gray-500 text-sm">Agrega productos a favoritos haciendo clic en el corazón ❤️</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </PageWrapper>
  );
}

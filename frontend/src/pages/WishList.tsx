import PageWrapper from "../components/ui/PageWrapper";
import ProductList from "../components/ProductList";
import { useWishlistProducts } from "../hooks";

export default function Wishlist() {
  const { products, loading, error } = useWishlistProducts();

  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-yellow-700 mb-6">Tus favoritos</h1>

      {error && (
        <div className="text-center py-12 bg-red-50 rounded-xl">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!error && (
        <ProductList
          products={products}
          isLoading={loading}
          emptyMessage="No tienes productos en favoritos. Agrega productos a favoritos haciendo clic en el corazón ❤️"
        />
      )}
    </PageWrapper>
  );
}

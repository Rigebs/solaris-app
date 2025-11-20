import { useWishlist } from "../context/WishlistContext";
import PageWrapper from "../components/ui/PageWrapper";
import { products } from "../mock/products";
import ProductGrid from "../components/ProductGrid";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-pink-700 mb-6">Tus favoritos</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">No tienes productos en favoritos.</p>
      ) : (
        <ProductGrid products={items} />
      )}
    </PageWrapper>
  );
}

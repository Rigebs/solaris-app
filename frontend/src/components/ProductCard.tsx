import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";
import type { Product } from "../types/product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      whileHover={{ scale: 1.03 }}
      className="relative bg-white rounded-2xl shadow p-4 flex flex-col"
    >
      {/* Wishlist button */}
      <WishlistButton id={product.id} />

      {/* Imagen principal */}
      <img
        src={product.images?.[0] ?? "/placeholder.jpg"}
        className="rounded-xl mb-4 h-48 w-full object-cover"
        alt={product.name}
      />

      {/* Nombre */}
      <h2 className="text-xl font-semibold text-yellow-700">{product.name}</h2>

      {/* Precio base */}
      <p className="text-gray-600 mt-1 font-medium">
        Desde ${product.base_price}
      </p>

      {/* Link */}
      <Link
        to={`/producto/${product.id}`}
        className="mt-4 bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 text-center"
      >
        Ver más
      </Link>
    </motion.div>
  );
}

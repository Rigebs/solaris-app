import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistButton({ id }: { id: number }) {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const active = isInWishlist(id);

  return (
    <button
      onClick={() => toggleWishlist(id)}
      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition"
    >
      {active ? (
        <AiFillHeart size={22} className="text-pink-600" />
      ) : (
        <AiOutlineHeart size={22} className="text-gray-600" />
      )}
    </button>
  );
}

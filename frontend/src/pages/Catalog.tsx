import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { products } from "../mock/products";

const categories = Array.from(
  new Map(
    products.map((p) => [
      p.categorySlug,
      { name: p.category, slug: p.categorySlug },
    ])
  ).values()
);

export default function Catalog() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-yellow-700 mb-10">Categorías</h1>

      <div className="flex flex-col gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/categoria/${cat.slug}`}
            className="
              w-full bg-white border border-yellow-300 rounded-2xl
              shadow-md p-6 flex items-center justify-between
              hover:shadow-xl hover:-translate-y-1 transition
            "
          >
            <span className="text-2xl font-semibold text-yellow-700">
              {cat.name}
            </span>

            <FaChevronRight
              size={26}
              className="text-yellow-600 group-hover:translate-x-1 transition"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

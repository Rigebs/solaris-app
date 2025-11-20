import { useParams, Link } from "react-router-dom";
import { products } from "../mock/products";

export default function CategoryPage() {
  const { slug } = useParams();

  // Filtramos productos que pertenecen a la categoría seleccionada
  const filteredProducts = products.filter((p) => p.categorySlug === slug);

  // Para mostrar el nombre real de la categoría
  const categoryName = filteredProducts[0]?.category ?? "Categoría";

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-yellow-700 mb-8">
        {categoryName}
      </h1>

      {/* Si no hay productos */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-600 text-lg">
          No hay productos en esta categoría.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/producto/${product.id}`}
            className="bg-white rounded-2xl border border-yellow-300 shadow-md p-4 
                       hover:shadow-xl hover:-translate-y-1 transition"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h2 className="text-xl font-semibold text-yellow-700">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-2">{product.description}</p>

            <p className="text-yellow-700 font-bold mt-3">
              Desde ${product.basePrice}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

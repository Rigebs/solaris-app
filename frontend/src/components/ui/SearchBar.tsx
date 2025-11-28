import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { searchProducts } from "../../services/searchService";
import type { Product } from "../../types/product";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const products = await searchProducts(query);
        setResults(products);
      } catch (error) {
        console.error('Error searching products:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-white border rounded-xl px-3 py-2 shadow-sm">
        <AiOutlineSearch size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Buscar postres..."
          className="flex-1 ml-2 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isLoading && (
          <div className="text-xs text-gray-400">Buscando...</div>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute left-0 right-0 bg-white shadow-lg rounded-xl mt-2 z-40 max-h-96 overflow-y-auto">
          {results.map((product) => (
            <Link
              key={product.id}
              to={`/producto/${product.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-yellow-50 border-b border-gray-100 last:border-0 transition-colors"
              onClick={() => setQuery("")}
            >
              {product.images && product.images.length > 0 && (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <div className="font-medium text-gray-800">{product.name}</div>
                {product.description && (
                  <div className="text-xs text-gray-500 line-clamp-1">{product.description}</div>
                )}
              </div>
              <div className="text-sm font-semibold text-yellow-600">
                S/. {product.base_price}
              </div>
            </Link>
          ))}
        </div>
      )}

      {query.length >= 2 && !isLoading && results.length === 0 && (
        <div className="absolute left-0 right-0 bg-white shadow-lg rounded-xl mt-2 z-40 px-4 py-3 text-center text-gray-500 text-sm">
          No se encontraron productos
        </div>
      )}
    </div>
  );
}

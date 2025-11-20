import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { products } from "../../mock/products";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const filtered =
    query.length > 1
      ? products.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

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
      </div>

      {filtered.length > 0 && (
        <div className="absolute left-0 right-0 bg-white shadow-lg rounded-xl mt-2 z-40 max-h-56 overflow-y-auto">
          {filtered.map((p) => (
            <Link
              key={p.id}
              to={`/producto/${p.id}`}
              className="block px-4 py-2 hover:bg-pink-50"
              onClick={() => setQuery("")}
            >
              {p.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

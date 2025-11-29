import type { Category } from "../types/category";

interface CategoryListProps {
  categories: Category[];
  isLoading?: boolean;
  onCategoryClick?: (categoryId: number) => void;
  selectedId?: number | null;
}

export default function CategoryList({
  categories,
  isLoading = false,
  onCategoryClick,
  selectedId,
}: CategoryListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => onCategoryClick?.(0)}
        className={`px-4 py-2 rounded-full transition ${
          selectedId === 0 || !selectedId
            ? "bg-yellow-500 text-white"
            : "bg-white border border-yellow-300 text-yellow-700 hover:border-yellow-500"
        }`}
      >
        Todos
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryClick?.(category.id)}
          className={`px-4 py-2 rounded-full transition ${
            selectedId === category.id
              ? "bg-yellow-500 text-white"
              : "bg-white border border-yellow-300 text-yellow-700 hover:border-yellow-500"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

// /src/components/CategoryFilterSimple.tsx
type Props = {
  selected: string;
  onSelect: (slug: string) => void;
  categories: { id: number; name: string; slug: string }[];
};

export default function CategoryFilterSimple({
  selected,
  onSelect,
  categories,
}: Props) {
  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect("all")}
        className={`px-4 py-2 rounded-full border ${
          selected === "all"
            ? "bg-yellow-500 text-white"
            : "bg-white text-yellow-700 border-yellow-400"
        }`}
      >
        Todas
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(String(cat.id))}
          className={`px-4 py-2 rounded-full border ${
            selected === String(cat.id)
              ? "bg-yellow-500 text-white"
              : "bg-white text-yellow-700 border-yellow-400"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

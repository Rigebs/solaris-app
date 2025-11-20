// /src/components/CategoryFilterSimple.tsx
type Props = {
  selected: string;
  onSelect: (value: string) => void;
};

export default function CategoryFilterSimple({ selected, onSelect }: Props) {
  const categories = [
    { id: "all", name: "Todos" },
    { id: "tortas", name: "Tortas" },
    { id: "cheesecake", name: "Cheesecakes" },
    { id: "brownies", name: "Brownies" },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-3 my-2 whitespace-nowrap">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`px-4 py-2 rounded-xl border ${
              selected === c.id
                ? "bg-pink-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}

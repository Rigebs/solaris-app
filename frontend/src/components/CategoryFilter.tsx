// /src/components/CategoryFilter.tsx
type Filters = {
  minPrice: number | null;
  maxPrice: number | null;
  sort: string;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function CategoryFilter({ filters, setFilters }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-wrap gap-4 items-end my-6">
      {/* Precio mínimo */}
      <div className="flex flex-col">
        <label className="font-medium">Precio mínimo</label>
        <input
          type="number"
          className="border p-2 rounded-xl w-32"
          value={filters.minPrice ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: Number(e.target.value) })
          }
        />
      </div>

      {/* Precio máximo */}
      <div className="flex flex-col">
        <label className="font-medium">Precio máximo</label>
        <input
          type="number"
          className="border p-2 rounded-xl w-32"
          value={filters.maxPrice ?? ""}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
        />
      </div>

      {/* Orden */}
      <div className="flex flex-col">
        <label className="font-medium">Ordenar</label>
        <select
          className="border p-2 rounded-xl"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="">Por defecto</option>
          <option value="asc">Precio (menor a mayor)</option>
          <option value="desc">Precio (mayor a menor)</option>
        </select>
      </div>
    </div>
  );
}

// OrderFilters.tsx o OrderFilters.jsx

import type { FilterStatus } from "../types/filter-status";

interface OrderFiltersProps {
  currentStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  isLoading: boolean;
}

// Opciones de filtro
const statusOptions: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "pending", label: "Pendiente" },
  { value: "shipped", label: "Enviado" },
  { value: "completed", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
];

export function OrderFilters({
  currentStatus,
  onStatusChange,
  isLoading,
}: OrderFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4 p-4 bg-white rounded-lg shadow-md border-t-4 border-yellow-500">
      <span className="text-sm font-semibold text-gray-700 self-center mr-2">
        Filtrar por:
      </span>
      {statusOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onStatusChange(option.value)}
          disabled={isLoading}
          className={`
            px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200
            ${
              currentStatus === option.value
                ? "bg-yellow-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-yellow-100 hover:text-yellow-800"
            }
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

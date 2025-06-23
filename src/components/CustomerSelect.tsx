import type { Customer } from "../types/sale";

// components/CustomerSelect.tsx
interface CustomerSelectProps {
  customers: Customer[];
  selectedCustomerId: string;
  onChange: (id: string) => void;
}

export default function CustomerSelect({
  customers,
  selectedCustomerId,
  onChange,
}: CustomerSelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        Cliente
      </label>
      <select
        className="w-full p-3 rounded-xl border border-gray-300"
        value={selectedCustomerId}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        {customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}

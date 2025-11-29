import type { Product } from "../types/product";
import { formatCurrency } from "../utils/currency";

interface ProductSelectorProps {
  product: Product;
  selectedSize: any;
  selectedToppings: string[];
  notes: string;
  onSizeChange: (size: any) => void;
  onToppingToggle: (topping: string) => void;
  onNotesChange: (notes: string) => void;
}

export default function ProductSelector({
  product,
  selectedSize,
  selectedToppings,
  notes,
  onSizeChange,
  onToppingToggle,
  onNotesChange,
}: ProductSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Tamaños */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Tamaños / Porciones</h2>
        <div className="flex flex-col gap-2">
          {product.sizes?.map((s) => (
            <button
              key={s.label}
              onClick={() => onSizeChange(s)}
              className={`px-4 py-2 rounded-xl border transition focus:outline-none focus:ring-0 ${
                selectedSize?.label === s.label
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white hover:border-yellow-300"
              }`}
            >
              {s.label} — {formatCurrency(s.price)}
            </button>
          ))}
        </div>
      </div>

      {/* Toppings */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Toppings opcionales</h2>
        <div className="flex flex-wrap gap-3">
          {product.toppings?.map((t) => (
            <button
              key={t}
              onClick={() => onToppingToggle(t)}
              className={`px-4 py-2 rounded-xl border transition focus:outline-none focus:ring-0 ${
                selectedToppings.includes(t)
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white hover:border-yellow-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Notas */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Notas (opcional)</h2>
        <textarea
          placeholder="Ej: sin azúcar, agregar fresas extra..."
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
}

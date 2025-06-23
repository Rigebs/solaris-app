// components/SaleItemRow.tsx
import { FiTrash2 } from "react-icons/fi";
import type { Product, SaleItem } from "../types/sale";

interface SaleItemRowProps {
  index: number;
  item: SaleItem;
  products: Product[];
  voucherDisponible: boolean;
  onChange: <K extends keyof SaleItem>(
    index: number,
    field: K,
    value: SaleItem[K]
  ) => void;
  onRemove: () => void;
  onSelectVoucher: () => void;
  disableVoucherCheckbox: boolean;
  showRemoveButton: boolean;
}

export default function SaleItemRow({
  index,
  item,
  products,
  voucherDisponible,
  onChange,
  onRemove,
  onSelectVoucher,
  disableVoucherCheckbox,
  showRemoveButton,
}: SaleItemRowProps) {
  const product = products.find((p) => p.id === item.product_id);
  const basePrice = product?.price ?? 0;
  const discountedPrice =
    item.usar_vale && voucherDisponible && product?.is_voucherable
      ? Math.round(basePrice * 0.85)
      : basePrice;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-50 p-4 pr-10 rounded-lg relative">
      <select
        className="w-full md:w-1/3 p-3 rounded-xl border border-gray-300"
        value={item.product_id}
        onChange={(e) => onChange(index, "product_id", e.target.value)}
      >
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        className="w-full md:w-1/4 p-3 rounded-xl border border-gray-300"
        min={1}
        value={item.quantity}
        onChange={(e) => onChange(index, "quantity", Number(e.target.value))}
        placeholder="Cantidad"
        required
      />

      {product?.is_returnable && (
        <label className="flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="checkbox"
            className="w-4 h-4 accent-yellow-500"
            checked={item.is_returned}
            onChange={(e) => onChange(index, "is_returned", e.target.checked)}
          />
          <span>¿Devolvió la bolsita?</span>
        </label>
      )}

      {voucherDisponible && product?.is_voucherable && (
        <label className="flex items-center space-x-2 text-sm text-green-700">
          <input
            type="checkbox"
            className="w-4 h-4 accent-green-500"
            checked={item.usar_vale || false}
            onChange={onSelectVoucher}
            disabled={disableVoucherCheckbox}
          />
          <span>Aplicar 15%</span>
        </label>
      )}

      <p className="text-sm text-gray-600">
        Precio:
        <span className="block font-semibold text-gray-800">
          S/. {discountedPrice}
        </span>
        {item.usar_vale && (
          <span className="block text-green-600">(con 15% OFF)</span>
        )}
      </p>

      {showRemoveButton && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
          title="Eliminar trufa"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

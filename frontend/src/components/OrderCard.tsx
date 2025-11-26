import type { Order } from "../types/order";
import { formatCurrency } from "../utils/currency";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-yellow-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-bold text-xl">
            Pedido #{order.id.toString().padStart(5, "0")}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide
            ${
              order.status === "completed"
                ? "bg-green-100 text-green-700"
                : order.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-200 text-gray-600"
            }
          `}
        >
          {order.status === "completed"
            ? "Completado"
            : order.status === "pending"
            ? "Pendiente"
            : "Cancelado"}
        </span>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-300">
        {order.items.map((it) => (
          <div
            key={it.id}
            className="py-4 flex items-center justify-between gap-4"
          >
            <img
              src={it.product?.images?.[0] || ""}
              alt={it.product?.name || it.name}
              className="w-20 h-20 rounded-xl object-cover border shadow-sm"
            />

            <div className="flex-1">
              <p className="font-semibold text-lg text-gray-800">
                {it.product?.name || it.name}{" "}
                {it.size && (
                  <span className="text-sm text-yellow-600 font-medium">
                    (Tamaño: {it.size})
                  </span>
                )}
              </p>

              {it.toppings && it.toppings.length > 0 && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Toppings:</span>{" "}
                  {it.toppings.join(", ")}
                </p>
              )}

              {it.notes && (
                <p className="text-sm italic text-gray-500">Nota: {it.notes}</p>
              )}

              <p className="text-sm text-gray-500">Cantidad: {it.quantity}</p>
            </div>

            <p className="font-semibold text-lg text-gray-800">
              {formatCurrency(it.unit_price * it.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="text-right pt-4 mt-4 border-t border-gray-400">
        <p className="text-2xl font-bold text-yellow-700">
          Total: {formatCurrency(order.total)}
        </p>
      </div>
    </div>
  );
}

import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";

export default function CartSummary() {
  const { cart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-2xl border border-yellow-200 shadow-md">
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Resumen del pedido
      </h2>

      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-gray-700">
          <span>Items ({itemCount}):</span>
          <span className="font-medium">{formatCurrency(total)}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Envío:</span>
          <span className="font-medium text-green-600">Gratis</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t-2 border-yellow-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Total:</span>
          <p className="text-2xl font-bold text-yellow-600">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        Impuestos calculados al final
      </p>
    </div>
  );
}

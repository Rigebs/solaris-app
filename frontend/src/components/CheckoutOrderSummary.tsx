import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";

export default function CheckoutOrderSummary() {
  const { cart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow border border-yellow-100">
        <p className="text-gray-600">No hay items en el carrito</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-yellow-100">
      <h2 className="text-xl font-semibold mb-4 text-yellow-700">
        Resumen del pedido
      </h2>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div key={`${item.id}-${index}`} className="border-b pb-4">
            <div className="flex justify-between gap-4">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-xl border"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-yellow-600">
                    Tamaño: <span className="font-semibold">{item.size}</span>
                  </p>
                )}
                {item.toppings?.length > 0 && (
                  <p className="text-sm text-gray-700">
                    Toppings: {item.toppings.join(", ")}
                  </p>
                )}
                {item.notes && (
                  <p className="text-sm italic text-gray-600">
                    Nota: {item.notes}
                  </p>
                )}
                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                {formatCurrency(item.finalPrice * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 text-right border-t border-gray-200">
        <p className="text-lg font-bold text-yellow-700">
          Total: {formatCurrency(total)}
        </p>
      </div>
    </div>
  );
}

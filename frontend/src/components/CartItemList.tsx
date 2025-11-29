import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/currency";

interface CartItemListProps {
  onRemoveItem?: (id: number, size?: string, toppings?: string[]) => void;
}

export default function CartItemList({ onRemoveItem }: CartItemListProps) {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-600">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {cart.map((item) => (
        <div
          key={`${item.id}-${item.size}-${JSON.stringify(item.toppings)}`}
          className="bg-white p-5 rounded-2xl shadow-md border border-yellow-100 flex justify-between items-start gap-4 hover:shadow-lg transition"
        >
          <div className="flex gap-4">
            <img
              src={item.images[0]}
              className="w-28 h-28 rounded-xl object-cover"
              alt={item.name}
            />

            <div className="flex flex-col justify-between flex-1">
              <div>
                <p className="text-lg font-semibold text-yellow-700">
                  {item.name}
                </p>

                <div className="mt-1 text-sm text-gray-600 space-y-1">
                  {item.size && (
                    <p>
                      <span className="font-medium">Tamaño:</span> {item.size}
                    </p>
                  )}

                  {item.toppings.length > 0 && (
                    <p>
                      <span className="font-medium">Toppings:</span>{" "}
                      {item.toppings.join(", ")}
                    </p>
                  )}

                  {item.notes && <p className="italic">Nota: {item.notes}</p>}

                  <p>
                    <span className="font-medium">Cantidad:</span>{" "}
                    {item.quantity}
                  </p>

                  <p className="text-yellow-600 font-semibold">
                    {formatCurrency(item.finalPrice * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              const handler = onRemoveItem || removeFromCart;
              handler(item.id, item.size, item.toppings);
            }}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition"
            title="Eliminar"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

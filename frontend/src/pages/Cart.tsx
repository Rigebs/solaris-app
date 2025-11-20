import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="text-center py-20">
        <p className="text-2xl font-semibold text-gray-700">
          Tu carrito está vacío
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-yellow-500 text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-600 transition"
        >
          Ir a comprar
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tu carrito</h1>

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

              <div className="flex flex-col justify-between">
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
                      ${(item.finalPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id, item.size, item.toppings)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition"
            >
              <AiOutlineDelete size={22} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="pb-4 border-b border-gray-100">
          <p className="text-gray-700 text-base">Subtotal</p>
          <p className="text-xl font-bold text-yellow-600 mt-1">
            ${total.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <button
            onClick={clearCart}
            className="w-full sm:w-auto px-6 py-3 rounded-lg border border-red-300
                 text-red-600 font-medium hover:bg-red-50 transition"
          >
            Vaciar carrito
          </button>

          <Link
            to="/checkout"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-yellow-600 text-white font-medium 
                 hover:bg-yellow-700 transition shadow-sm"
          >
            Proceder al pago
          </Link>
        </div>
      </div>
    </div>
  );
}

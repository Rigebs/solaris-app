import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const nav = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", address: "", phone: "" });

  const total = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return nav("/login");

    createOrder(user.id, cart, total);
    console.log(cart);

    clearCart();
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-pink-700">¡Pedido realizado!</h1>
        <p className="mt-4 text-gray-600">Revisa tus pedidos en tu perfil.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-700">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow space-y-4 border border-pink-100"
        >
          <h2 className="text-xl font-semibold text-pink-700">
            Información del cliente
          </h2>

          <input
            required
            type="text"
            placeholder="Nombre completo"
            className="w-full border p-3 rounded-xl focus:ring-2 ring-pink-300"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="Dirección"
            className="w-full border p-3 rounded-xl focus:ring-2 ring-pink-300"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <input
            required
            type="tel"
            placeholder="Teléfono"
            className="w-full border p-3 rounded-xl focus:ring-2 ring-pink-300"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <button
            type="submit"
            className="bg-pink-600 text-white w-full py-3 rounded-xl hover:bg-pink-700 transition"
          >
            Confirmar pedido
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow border border-pink-100">
          <h2 className="text-xl font-semibold mb-4 text-pink-700">
            Resumen del pedido
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}-${JSON.stringify(item.toppings)}`}
                className="border-b pb-4"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{item.name}</p>

                    {/* SIZE */}
                    {item.size && (
                      <p className="text-sm text-pink-600">
                        Tamaño:{" "}
                        <span className="font-semibold">{item.size}</span>
                      </p>
                    )}

                    {/* TOPPINGS */}
                    {item.toppings && item.toppings.length > 0 && (
                      <p className="text-sm text-gray-700">
                        Toppings:{" "}
                        <span className="font-medium">
                          {item.toppings.join(", ")}
                        </span>
                      </p>
                    )}

                    {/* NOTES */}
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
                    ${(item.finalPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 text-right">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

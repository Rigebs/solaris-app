import { useEffect, useState, useRef } from "react";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";
import type { OrderRequest } from "../types/order";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { userService } from "../services/userService";
import { formatCurrency } from "../utils/currency";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user, setRedirectAfterLogin } = useAuth();
  const { createOrder, loading } = useCreateOrder();
  const { showToast } = useToast();

  const nav = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const toastShownRef = useRef(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!user && !toastShownRef.current) {
      toastShownRef.current = true;
      showToast("Necesitas iniciar sesión para procesar el pago", "warning");
      setRedirectAfterLogin("/checkout");
      setIsRedirecting(true);
      // Redirigir inmediatamente sin setTimeout
      nav("/login");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        address: user.address ?? "",
        phone: user.phone ?? "",
      });
      console.log(user);
    }
  }, [user]);

  const total = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      form.name !== user?.name ||
      form.address !== user?.address ||
      form.phone !== user?.phone
    ) {
      try {
        await userService.updateMe({
          name: form.name,
          address: form.address,
          phone: form.phone,
        });
      } catch (error) {
        showToast("Error al actualizar datos", "error");
        return;
      }
    }

    const payload: OrderRequest = {
      total,
      items: cart.map((item) => ({
        product_id: item.id,
        name: item.name,
        size: item.size,
        toppings: item.toppings ?? [],
        notes: item.notes ?? "",
        unit_price: item.finalPrice,
        quantity: item.quantity,
      })),
    };

    const result = await createOrder(payload);

    if (result) {
      clearCart();
      setSubmitted(true);
    }
  };

  if (submitted)
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-yellow-700">
          ¡Pedido realizado!
        </h1>
        <p className="mt-4 text-gray-600">Revisa tus pedidos en tu perfil.</p>
      </div>
    );

  if (isRedirecting)
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Redirigiendo a login...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-yellow-700">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow space-y-4 border border-yellow-100"
        >
          <h2 className="text-xl font-semibold text-yellow-700">
            Información del cliente
          </h2>

          <input
            required
            type="text"
            placeholder="Nombre completo"
            className="w-full border border-gray-300 p-3 rounded-xl"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            required
            type="text"
            placeholder="Dirección"
            className="w-full border border-gray-300 p-3 rounded-xl"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <input
            required
            type="tel"
            placeholder="Teléfono"
            className="w-full border border-gray-300 p-3 rounded-xl"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-600 text-white w-full py-3 rounded-xl hover:bg-yellow-700 transition disabled:opacity-50"
          >
            {loading ? "Procesando…" : "Confirmar pedido"}
          </button>
        </form>

        {/* RESUMEN DEL PEDIDO */}
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
                        Tamaño:{" "}
                        <span className="font-semibold">{item.size}</span>
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

          <div className="pt-4 text-right">
            <p className="text-lg font-bold">Total: {formatCurrency(total)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

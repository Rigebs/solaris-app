import { useEffect, useRef, useState } from "react";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useNavigate } from "react-router-dom";
import type { OrderRequest } from "../types/order";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutOrderSummary from "../components/CheckoutOrderSummary";
import { useCheckoutForm } from "../hooks/useCheckoutForm";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user, setRedirectAfterLogin } = useAuth();
  const { createOrder, loading } = useCreateOrder();
  const { showToast } = useToast();
  const {
    form,
    updateField,
    saveUserData,
    isLoading: isUpdatingUser,
  } = useCheckoutForm();

  const nav = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const toastShownRef = useRef(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Verificar autenticación
  useEffect(() => {
    if (!user && !toastShownRef.current) {
      toastShownRef.current = true;
      showToast("Necesitas iniciar sesión para procesar el pago", "warning");
      setRedirectAfterLogin("/checkout");
      setIsRedirecting(true);
      nav("/login");
    }
  }, [user]);

  const total = cart.reduce(
    (acc, item) => acc + item.finalPrice * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guardar datos del usuario
    const dataSaved = await saveUserData();
    if (!dataSaved) return;

    // Crear orden
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
        <CheckoutForm
          onSubmit={handleSubmit}
          isLoading={loading || isUpdatingUser}
          formData={form}
          onFieldChange={updateField}
        />

        <CheckoutOrderSummary />
      </div>
    </div>
  );
}

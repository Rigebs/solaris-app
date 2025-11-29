import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItemList from "../components/CartItemList";
import CartSummary from "../components/CartSummary";

export default function Cart() {
  const { cart, clearCart } = useCart();

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
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Tu carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items del carrito - 2 columnas en desktop */}
        <div className="lg:col-span-2">
          <CartItemList />
        </div>

        {/* Resumen y botones - 1 columna en desktop */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-4">
            <CartSummary />

            <div className="space-y-3">
              <Link
                to="/checkout"
                className="w-full block px-6 py-3 rounded-lg bg-yellow-600 text-white font-medium 
                     hover:bg-yellow-700 transition shadow-md text-center"
              >
                Proceder al pago
              </Link>

              <button
                onClick={clearCart}
                className="w-full px-6 py-3 rounded-lg border border-red-300
                     text-red-600 font-medium hover:bg-red-50 transition"
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

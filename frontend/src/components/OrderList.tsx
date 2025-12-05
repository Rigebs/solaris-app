import type { Order } from "../types/order";
import OrderCard from "./OrderCard";

interface OrderListProps {
  orders: Order[];
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

export default function OrderList({
  orders,
  isLoading = false,
  error,
  emptyMessage = "No tienes pedidos aún",
}: OrderListProps) {
  // Componente visual para estado de Carga
  if (isLoading) {
    return (
      <div className="text-center py-12 border border-yellow-200 bg-yellow-50 rounded-xl animate-pulse">
        <div className="flex justify-center items-center space-x-2">
          {/* Un spinner o icono de carga visualmente atractivo */}
          <svg
            className="animate-spin h-5 w-5 text-yellow-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-yellow-700 font-medium">
            Cargando pedidos... por favor espera.
          </p>
        </div>
      </div>
    );
  }

  // Componente visual para estado de Error
  if (error) {
    return (
      <div className="text-center py-12 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-xl shadow-lg">
        <p className="font-bold">¡Ocurrió un error! 😔</p>
        <p className="text-sm mt-1">
          No pudimos cargar tus pedidos: **{error}**
        </p>
        <p className="text-sm mt-2">Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  // Componente visual para lista vacía
  if (orders.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-100 border border-gray-300 rounded-xl shadow-inner">
        <p className="text-lg text-gray-700 font-semibold">{emptyMessage}</p>
        <p className="text-sm text-gray-500 mt-2">
          ¡Es un buen momento para hacer uno!
        </p>
      </div>
    );
  }

  // Renderizado de la lista
  return (
    <div className="space-y-6 md:space-y-8">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          // Considera añadir un enlace a los detalles del pedido aquí si no lo tiene
        />
      ))}
    </div>
  );
}

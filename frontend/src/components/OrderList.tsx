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
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-xl">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl">
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/ui/PageWrapper";
import OrderList from "../components/OrderList";
import { useOrders } from "../hooks/useOrders";

export default function Orders() {
  const { user } = useAuth();
  const { orders, loading, error } = useOrders(user?.id ?? 0);

  if (!user)
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-yellow-700 mb-3">
            Necesitas iniciar sesión
          </h1>
          <p className="text-gray-600">
            Inicia sesión para ver el historial de pedidos.
          </p>
        </div>
      </PageWrapper>
    );

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-yellow-700 mb-6">Mis pedidos</h1>

      <OrderList
        orders={orders}
        isLoading={loading}
        error={error}
        emptyMessage="Aún no tienes pedidos"
      />
    </PageWrapper>
  );
}

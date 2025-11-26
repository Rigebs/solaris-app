import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/ui/PageWrapper";
import OrderCard from "../components/OrderCard";
import { useOrders } from "../hooks/useOrders";

export default function Orders() {
  const { user } = useAuth();

  // Usamos el hook pasando el userId
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

      {loading ? (
        <div className="text-gray-600 text-center py-20">
          Cargando pedidos...
        </div>
      ) : error ? (
        <div className="text-red-600 text-center py-20">
          Error al cargar los pedidos.
        </div>
      ) : orders.length === 0 ? (
        <div className="text-gray-600 text-center py-20">
          Aún no tienes pedidos.
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}

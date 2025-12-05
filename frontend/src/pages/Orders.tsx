import { useAuth } from "../context/AuthContext";
import PageWrapper from "../components/ui/PageWrapper";
import OrderList from "../components/OrderList";
import { useOrders } from "../hooks/useOrders";
import { useMemo, useState } from "react";
import type { FilterStatus } from "../types/filter-status";
import { OrderFilters } from "../components/OrderFilter";

export default function Orders() {
  const { user } = useAuth();
  const { orders, loading, error } = useOrders(user?.id ?? 0);

  // 1. Estado para el filtro seleccionado por el usuario
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // 2. Lógica de filtrado: solo se ejecuta cuando 'orders' o 'filterStatus' cambian
  const filteredOrders = useMemo(() => {
    if (filterStatus === "all") {
      return orders;
    }
    // Asumiendo que cada 'order' tiene una propiedad 'status'
    return orders.filter((order) => order.status === filterStatus);
  }, [orders, filterStatus]);

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

      {/* 3. Nuevo componente de Filtros */}
      <OrderFilters
        currentStatus={filterStatus}
        onStatusChange={setFilterStatus}
        isLoading={loading} // Deshabilitar filtros mientras se carga
      />

      <div className="mt-6">
        <OrderList
          orders={filteredOrders} // Se pasan los pedidos filtrados
          isLoading={loading}
          error={error}
          // El mensaje de vacío puede ser más específico si se filtra
          emptyMessage={
            filterStatus === "all"
              ? "Aún no tienes pedidos"
              : `No hay pedidos con el estado "${filterStatus}"`
          }
        />
      </div>
    </PageWrapper>
  );
}

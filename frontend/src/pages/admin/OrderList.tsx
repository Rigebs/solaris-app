import { useEffect, useState } from "react";
import { FiPackage, FiUser, FiDollarSign, FiCalendar } from "react-icons/fi";
import { adminService } from "../../services/adminService";
import type { Order } from "../../types/order";
import { formatCurrencySimple } from "../../utils/currency";

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminService.getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Cargando pedidos...</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <FiPackage className="text-yellow-600" size={32} />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Pedidos</h2>
          <p className="text-gray-600 mt-1">
            Historial de pedidos de tus clientes
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden border border-yellow-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-yellow-200 to-orange-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-yellow-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-400" />
                      <span>Usuario #{order.user_id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-yellow-600">
                    {formatCurrencySimple(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-400" size={14} />
                      {new Date(order.created_at).toLocaleDateString("es-ES")}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-5 border border-yellow-100"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <FiPackage className="text-yellow-600" size={20} />
                <span className="font-bold text-gray-800">
                  Pedido #{order.id}
                </span>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <FiUser size={16} className="text-gray-400" />
                <span>Usuario #{order.user_id}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiDollarSign size={16} className="text-gray-400" />
                <span className="font-semibold text-yellow-600">
                  {formatCurrencySimple(order.total)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiCalendar size={16} className="text-gray-400" />
                <span>
                  {new Date(order.created_at).toLocaleDateString("es-ES")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <FiPackage className="text-gray-400 mx-auto mb-4" size={64} />
          <p className="text-gray-600 text-lg">No hay pedidos aún</p>
        </div>
      )}
    </div>
  );
}

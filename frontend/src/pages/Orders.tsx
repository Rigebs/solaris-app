import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";
import PageWrapper from "../components/ui/PageWrapper";

export default function Orders() {
  const { user } = useAuth();
  const { getUserOrders } = useOrders();

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

  const orders = getUserOrders(user.id);

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-yellow-700 mb-6">Mis pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-gray-600 text-center py-20">
          Aún no tienes pedidos.
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-yellow-100 p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="font-bold text-xl">
                    Pedido #{o.id.toString().padStart(5, "0")}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide
                    ${
                      o.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : o.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-600"
                    }
                  `}
                >
                  {o.status === "completed"
                    ? "Completado"
                    : o.status === "pending"
                    ? "Pendiente"
                    : "Cancelado"}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-300">
                {o.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="py-4 flex items-center justify-between gap-4"
                  >
                    {/* Imagen */}
                    <img
                      src={it.images?.[0]}
                      alt={it.name}
                      className="w-20 h-20 rounded-xl object-cover border shadow-sm"
                    />

                    <div className="flex-1">
                      <p className="font-semibold text-lg text-gray-800">
                        {it.name}{" "}
                        {it.size && (
                          <span className="text-sm text-yellow-600 font-medium">
                            (Tamaño: {it.size})
                          </span>
                        )}
                      </p>

                      {it.toppings?.length > 0 && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">
                            Toppings:
                          </span>{" "}
                          {it.toppings.join(", ")}
                        </p>
                      )}

                      {it.notes && (
                        <p className="text-sm italic text-gray-500">
                          Nota: {it.notes}
                        </p>
                      )}

                      <p className="text-sm text-gray-500">
                        Cantidad: {it.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-lg text-gray-800">
                      ${(it.finalPrice * it.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="text-right pt-4 mt-4 border-t border-gray-400">
                <p className="text-2xl font-bold text-yellow-700">
                  Total: ${o.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}

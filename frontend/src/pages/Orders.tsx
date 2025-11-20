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
          <h1 className="text-2xl font-bold text-pink-700 mb-3">
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
      <h1 className="text-3xl font-bold text-pink-700 mb-8">Mis pedidos</h1>

      {orders.length === 0 ? (
        <div className="text-gray-600 text-center py-20">
          Aún no tienes pedidos.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white rounded-2xl shadow p-6 border border-pink-100 hover:shadow-lg transition"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">
                    Pedido #{o.id.toString().padStart(5, "0")}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      o.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : o.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                >
                  {o.status}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y">
                {o.items.map((it, idx) => (
                  <div key={idx} className="py-3 flex justify-between">
                    <div>
                      <p className="font-semibold">
                        {it.name}{" "}
                        {it.size && (
                          <span className="text-sm text-pink-600">
                            (Tamaño: {it.size})
                          </span>
                        )}
                      </p>

                      {/* Toppings */}
                      {it.toppings && it.toppings.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Toppings:{" "}
                          <span className="font-medium text-gray-800">
                            {it.toppings.join(", ")}
                          </span>
                        </p>
                      )}

                      {/* Notas */}
                      {it.notes && (
                        <p className="text-sm text-gray-600 italic">
                          Nota: {it.notes}
                        </p>
                      )}

                      <p className="text-sm text-gray-500">
                        Cantidad: {it.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ${(it.finalPrice * it.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="text-right pt-4 border-t mt-4">
                <p className="text-xl font-bold">
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

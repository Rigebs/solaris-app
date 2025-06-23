// src/pages/ListOrders.tsx
import AdminLayout from "../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { supabase } from "../clients/supabaseClient";

interface Order {
  id: number;
  customer_name: string;
  message: string;
  created_at: string;
}

export default function ListOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
      } else {
        setOrders(data as Order[]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-600 mb-6">
        Pedidos o mensajes recibidos
      </h2>
      {orders.length === 0 ? (
        <p>No hay pedidos todavía.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="bg-white p-4 rounded-xl shadow">
              <p className="font-semibold text-yellow-800">
                {order.customer_name}
              </p>
              <p className="text-gray-700">{order.message}</p>
              <p className="text-xs text-gray-500">
                {new Date(order.created_at).toLocaleString("es-PE")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </AdminLayout>
  );
}

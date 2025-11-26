import { createContext, useContext, useEffect, useState } from "react";
import type { Order, OrderItem } from "../types/order";

type OrdersCtx = {
  orders: Order[];
  createOrder: (userId: number, items: OrderItem[], total: number) => Order;
  getUserOrders: (userId: number) => Order[];
};

const OrdersContext = createContext<OrdersCtx | undefined>(undefined);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const raw = localStorage.getItem("mock_orders");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("mock_orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = (userId: number, items: OrderItem[], total: number) => {
    const newOrder: Order = {
      id: Date.now(),
      user_id: userId,
      items,
      total,
      created_at: new Date().toISOString(),
      status: "pending",
    };
    setOrders((s) => [newOrder, ...s]);
    return newOrder;
  };

  const getUserOrders = (userId: number) =>
    orders.filter((o) => o.user_id === userId);

  return (
    <OrdersContext.Provider value={{ orders, createOrder, getUserOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside OrdersProvider");
  return ctx;
};

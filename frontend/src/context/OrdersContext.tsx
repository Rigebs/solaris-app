import { createContext, useContext, useEffect, useState } from "react";

type Order = {
  id: string;
  userId: string;
  items: any[];
  total: number;
  createdAt: string;
  status: "pending" | "completed" | "cancelled";
};

type OrdersCtx = {
  orders: Order[];
  createOrder: (userId: string, items: any[], total: number) => Order;
  getUserOrders: (userId: string) => Order[];
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

  const createOrder = (userId: string, items: any[], total: number) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      userId,
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setOrders((s) => [newOrder, ...s]);
    return newOrder;
  };

  const getUserOrders = (userId: string) =>
    orders.filter((o) => o.userId === userId);

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

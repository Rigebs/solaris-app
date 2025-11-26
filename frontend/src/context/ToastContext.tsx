import { createContext, useContext, useState } from "react";

export type ToastTypeVariant = "info" | "success" | "error" | "warning";

type Toast = {
  id: string;
  message: string;
  type: ToastTypeVariant;
  productName?: string;
  productImage?: string;
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (
    message: string,
    type?: ToastTypeVariant,
    duration?: number,
    productName?: string,
    productImage?: string
  ) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: ToastTypeVariant = "info",
    duration: number = 3000,
    productName?: string,
    productImage?: string
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = { id, message, type, productName, productImage };

    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

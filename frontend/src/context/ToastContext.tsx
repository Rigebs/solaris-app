import { createContext, useContext, useState } from "react";

type ToastType = {
  message: string;
  show: boolean;
};

type ToastContextType = {
  toast: ToastType;
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastType>({ message: "", show: false });

  const showToast = (message: string) => {
    setToast({ message, show: true });

    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ toast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

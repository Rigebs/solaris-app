import { useToast } from "../context/ToastContext";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const toastStyles = {
    info: "border-blue-300 bg-blue-50",
    success: "border-yellow-300 bg-yellow-50",
    error: "border-red-300 bg-red-50",
    warning: "border-yellow-300 bg-yellow-50",
  };

  const iconStyles = {
    info: "text-blue-600",
    success: "text-yellow-600",
    error: "text-red-600",
    warning: "text-yellow-600",
  };

  const getIcon = (type: "info" | "success" | "error" | "warning") => {
    switch (type) {
      case "success":
      case "warning":
        return <FiCheckCircle className={`${iconStyles[type]} w-6 h-6`} />;
      case "error":
        return <FiAlertCircle className={`${iconStyles[type]} w-6 h-6`} />;
      default:
        return <FiCheckCircle className={`${iconStyles[type]} w-6 h-6`} />;
    }
  };

  return (
    <div className="fixed top-24 right-4 z-40 space-y-3 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${
            toastStyles[toast.type]
          } border-2 rounded-xl shadow-xl flex gap-4 p-4 animate-slide-in pointer-events-auto`}
        >
          {/* Icono */}
          <div className="flex-shrink-0">{getIcon(toast.type)}</div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800">{toast.message}</p>
            {toast.productName && (
              <p className="text-sm text-gray-600 mt-1">{toast.productName}</p>
            )}
          </div>

          {/* Imagen si existe */}
          {toast.productImage && (
            <div className="flex-shrink-0">
              <img
                src={toast.productImage}
                alt={toast.productName}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200"
              />
            </div>
          )}

          {/* Botón cerrar */}
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition"
            aria-label="Cerrar notificación"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}

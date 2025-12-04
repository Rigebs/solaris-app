import { useState } from "react";
import {
  FiX,
  FiPackage,
  FiUser,
  FiDollarSign,
  FiCalendar,
  FiEdit2,
  FiCheck,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import type { Order } from "../types/order";
import { formatCurrency } from "../utils/currency";
import { ConfirmToast } from "./ConfirmToast";

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (
    orderId: number,
    status: string,
    notes?: string
  ) => Promise<void>;
  isLoading?: boolean;
}

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
  onStatusChange,
  isLoading = false,
}: OrderDetailModalProps) {
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Usaremos este estado para manejar la confirmación de la acción en el Toast
  const [pendingConfirmAction, setPendingConfirmAction] = useState<{
    key: string;
    label: string;
  } | null>(null);

  // Nuevo estado para controlar si el Toast está procesando
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  if (!isOpen || !order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "ready":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-orange-100 text-orange-700";
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
      case "pending":
        return "Pendiente";
      case "in_progress":
        return "En preparación";
      case "ready":
        return "Listo para entregar";
      case "completed":
        return "Completado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  const availableActions = () => {
    // Define allowed transitions and labels
    const actions: Array<{
      key: string;
      label: string;
      color: string;
      icon: any;
      // Usamos un flag para indicar si requiere confirmación.
      // Las acciones destructivas o finales la requieren.
      requiresConfirmation: boolean;
    }> = [];
    if (order.status === "pending") {
      actions.push({
        key: "in_progress",
        label: "Empezar preparación",
        color: "bg-orange-500",
        icon: FiClock,
        requiresConfirmation: false, // Menos sensible, sin confirmación
      });
      actions.push({
        key: "cancelled",
        label: "Cancelar pedido",
        color: "bg-red-500",
        icon: FiAlertCircle,
        requiresConfirmation: true, // Destructivo, requiere confirmación
      });
    } else if (order.status === "in_progress") {
      actions.push({
        key: "ready",
        label: "Marcar como listo",
        color: "bg-blue-500",
        icon: FiCheck,
        requiresConfirmation: false, // Menos sensible, sin confirmación
      });
      actions.push({
        key: "cancelled",
        label: "Cancelar pedido",
        color: "bg-red-500",
        icon: FiAlertCircle,
        requiresConfirmation: true, // Destructivo, requiere confirmación
      });
    } else if (order.status === "ready") {
      actions.push({
        key: "completed",
        label: "Confirmar entrega",
        color: "bg-green-600",
        icon: FiCheck,
        requiresConfirmation: true, // Final, requiere confirmación
      });
      actions.push({
        key: "cancelled",
        label: "Cancelar pedido",
        color: "bg-red-500",
        icon: FiAlertCircle,
        requiresConfirmation: true, // Destructivo, requiere confirmación
      });
    }
    return actions;
  };

  // ----------------------------------------------------
  // 2. Lógica para manejar la acción
  // ----------------------------------------------------
  const startAction = (action: {
    key: string;
    label: string;
    requiresConfirmation: boolean;
  }) => {
    // 1. Si requiere confirmación, abrimos el Toast
    if (action.requiresConfirmation) {
      setPendingConfirmAction({ key: action.key, label: action.label });
    } else {
      // 2. Si NO requiere confirmación, ejecutamos inmediatamente
      executeAction(action.key);
    }
  };

  const executeAction = async (targetStatus: string) => {
    setIsProcessingAction(true);
    try {
      // Ejecutamos la acción con las notas si existen
      await onStatusChange(
        order!.id,
        targetStatus,
        order!.admin_notes || undefined
      );
      // Limpiamos estados
      setPendingConfirmAction(null);
      // Las notas no se deben limpiar hasta que el componente reciba el nuevo 'order.admin_notes'
      // setAdminNotes("");
    } catch (err) {
      console.error("Error updating order:", err);
      // Aquí podrías mostrar un toast de error
    } finally {
      setIsProcessingAction(false);
    }
  };

  // Lógica de guardar notas es independiente de la acción de estado
  const confirmSaveNotes = async () => {
    const originalProcessingState = isProcessingAction;
    setIsProcessingAction(true);
    try {
      // Solo actualizamos las notas, manteniendo el estado actual del pedido.
      await onStatusChange(order!.id, order!.status, adminNotes || undefined);
      setIsEditingNotes(false);
      // No limpiamos adminNotes, esperamos que el prop 'order' se actualice.
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessingAction(originalProcessingState);
    }
  };

  // Estado global de deshabilitación: si está cargando o si el toast está activo
  const globalDisabled =
    isLoading || isProcessingAction || Boolean(pendingConfirmAction);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* Ajustes clave de estilos en este div:
        - max-h-[90vh]: Limita la altura del modal en general.
        - flex flex-col: Permite que el contenido tome el espacio restante.
        - NO lleva overflow-y-auto: El scroll se manejará en el body interno.
      */}
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header - Ya NO es sticky */}
        <div className="bg-gradient-to-r from-yellow-200 to-orange-100 px-6 py-4 flex items-center justify-between border-b border-yellow-300 flex-shrink-0">
          <div className="flex items-center gap-3">
            <FiPackage className="text-yellow-700" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">
              Pedido #{order.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition disabled:opacity-50"
            disabled={globalDisabled}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content (Body) - AQUÍ es donde se aplica el scroll */}
        {/* Ajustes clave de estilos en este div:
          - flex-grow: 1: Permite que este div ocupe todo el espacio restante.
          - overflow-y-auto: Habilita el scroll vertical solo en el contenido.
        */}
        <div className="p-6 space-y-6 flex-grow overflow-y-auto">
          {/* Order Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiUser className="text-gray-400" size={18} />
                <span className="text-sm text-gray-600 font-medium">
                  Cliente
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                Usuario #{order.user_id}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiDollarSign className="text-gray-400" size={18} />
                <span className="text-sm text-gray-600 font-medium">Total</span>
              </div>
              <p className="text-lg font-bold text-yellow-600">
                {formatCurrency(order.total)}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FiCalendar className="text-gray-400" size={18} />
                <span className="text-sm text-gray-600 font-medium">
                  Creado
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {new Date(order.created_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600 font-medium">
                  Estado
                </span>
              </div>
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
          {/* --- */}
          {/* Items */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">Artículos</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
                >
                  <div className="flex gap-4">
                    {item.product?.images?.[0] && (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name || item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {item.product?.name || item.name}
                      </p>
                      {item.size && (
                        <p className="text-sm text-yellow-600">
                          Tamaño: {item.size}
                        </p>
                      )}
                      {item.toppings && item.toppings.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Extras: {item.toppings.join(", ")}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-sm italic text-gray-500">
                          Nota: {item.notes}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">
                        Cantidad:{" "}
                        <span className="font-semibold">{item.quantity}</span> x{" "}
                        <span className="font-semibold">
                          {formatCurrency(item.unit_price)}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-yellow-600">
                        {formatCurrency(item.unit_price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-700">
                Notas del administrador
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsEditingNotes((s) => !s);
                    setAdminNotes(order.admin_notes || "");
                  }}
                  className="text-sm text-yellow-600 hover:underline flex items-center gap-1 disabled:opacity-50"
                  disabled={globalDisabled}
                >
                  <FiEdit2 /> {isEditingNotes ? "Cerrar" : "Editar"}
                </button>
              </div>
            </div>
            {!isEditingNotes ? (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-blue-800">
                  {order.admin_notes || (
                    <span className="text-gray-500">Sin notas</span>
                  )}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Agregar notas para el cliente..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none h-24 disabled:bg-gray-100"
                  disabled={isProcessingAction}
                />
                <div className="flex gap-2">
                  <button
                    onClick={confirmSaveNotes}
                    disabled={globalDisabled}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg disabled:opacity-60 flex items-center justify-center"
                  >
                    {isProcessingAction && pendingConfirmAction === null ? (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <FiCheck className="mr-1" />
                    )}
                    Guardar notas
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingNotes(false);
                      setAdminNotes(order.admin_notes || ""); // Restaurar notas originales
                    }}
                    disabled={globalDisabled}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* --- */}
        </div>

        {/* Action Buttons (Footer) - Fijo en la parte inferior */}
        <div className="p-6 pt-0 flex-shrink-0">
          <div className="flex flex-col md:flex-row gap-2 pt-4">
            {availableActions().length === 0 ? (
              <div className="w-full bg-gray-100 rounded-lg p-4 text-center text-sm text-gray-600">
                No hay acciones disponibles para este estado.
              </div>
            ) : (
              availableActions().map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.key} className="flex-1">
                    <button
                      // El botón inicia la lógica de acción que decide si mostrar el toast o ejecutar
                      onClick={() => startAction(act)}
                      disabled={globalDisabled} // Deshabilitado si hay un toast activo o cargando
                      className={`w-full flex items-center justify-center gap-2 ${act.color} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60`}
                    >
                      {isProcessingAction &&
                      pendingConfirmAction?.key === act.key ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        Icon && <Icon />
                      )}
                      {act.label}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {pendingConfirmAction && (
        <ConfirmToast
          actionLabel={pendingConfirmAction.label}
          onConfirm={() => executeAction(pendingConfirmAction.key)}
          onCancel={() => setPendingConfirmAction(null)}
          isProcessing={isProcessingAction}
        />
      )}
    </div>
  );
}

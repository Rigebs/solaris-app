// ----------------------------------------------------
// 1. Componente Toast de Confirmación (Local)

import { FiAlertCircle } from "react-icons/fi";

// ----------------------------------------------------
interface ConfirmToastProps {
  actionLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export const ConfirmToast = ({
  actionLabel,
  onConfirm,
  onCancel,
  isProcessing,
}: ConfirmToastProps) => (
  <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] p-4 max-w-lg w-full mb-4">
    <div className="bg-white border border-yellow-300 rounded-xl shadow-2xl flex items-center p-4 gap-4">
      <FiAlertCircle className="text-yellow-500 flex-shrink-0" size={24} />
      <div className="flex-1">
        <p className="font-semibold text-gray-800">¿Confirmar acción?</p>
        <p className="text-sm text-gray-600">
          Estás a punto de:{" "}
          <span className="font-medium text-yellow-700">{actionLabel}</span>
        </p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={onConfirm}
          disabled={isProcessing}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition disabled:opacity-70 flex items-center justify-center"
        >
          {isProcessing ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Sí, confirmar"
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={isProcessing}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg text-sm transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
);

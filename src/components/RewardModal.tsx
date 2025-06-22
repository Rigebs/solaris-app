// components/RewardModal.tsx
import { motion } from "framer-motion";

interface RewardModalProps {
  onClose: () => void;
  unlockedSticker: string;
}

export default function RewardModal({
  onClose,
  unlockedSticker,
}: RewardModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-xl p-6 text-center shadow-xl max-w-sm w-full"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        <h2 className="text-2xl font-bold text-yellow-600 mb-4">
          🎉 ¡Felicidades!
        </h2>
        <p className="text-gray-700 mb-2">Has ganado un vale de descuento</p>
        <p className="text-sm text-gray-500 mb-4">
          Y desbloqueaste un nuevo sticker:
        </p>

        <motion.img
          src={unlockedSticker}
          alt="Nuevo sticker"
          className="w-24 h-24 mx-auto rounded-full border-4 border-yellow-400"
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />

        <button
          onClick={onClose}
          className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          ¡Continuar!
        </button>
      </motion.div>
    </div>
  );
}

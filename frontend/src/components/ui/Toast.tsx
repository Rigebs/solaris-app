import { AiOutlineCheckCircle } from "react-icons/ai";
import { useToast } from "../../context/ToastContext";

export default function Toast() {
  const { toast } = useToast();

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="bg-white shadow-lg border border-pink-200 px-5 py-3 rounded-xl flex items-center gap-3">
        <AiOutlineCheckCircle className="text-green-600" size={26} />
        <p className="text-gray-700 font-medium">{toast.message}</p>
      </div>
    </div>
  );
}

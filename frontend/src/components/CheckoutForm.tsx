interface CheckoutFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  formData: {
    name: string;
    address: string;
    phone: string;
  };
  onFieldChange: (field: "name" | "address" | "phone", value: string) => void;
}

export default function CheckoutForm({
  onSubmit,
  isLoading = false,
  formData,
  onFieldChange,
}: CheckoutFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-2xl shadow space-y-4 border border-yellow-100"
    >
      <h2 className="text-xl font-semibold text-yellow-700">
        Información del cliente
      </h2>

      <input
        required
        type="text"
        placeholder="Nombre completo"
        className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={formData.name}
        onChange={(e) => onFieldChange("name", e.target.value)}
      />

      <input
        required
        type="text"
        placeholder="Dirección"
        className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={formData.address}
        onChange={(e) => onFieldChange("address", e.target.value)}
      />

      <input
        required
        type="tel"
        placeholder="Teléfono"
        className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        value={formData.phone}
        onChange={(e) => onFieldChange("phone", e.target.value)}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-yellow-600 text-white w-full py-3 rounded-xl hover:bg-yellow-700 transition disabled:opacity-50 font-semibold"
      >
        {isLoading ? "Procesando…" : "Confirmar pedido"}
      </button>
    </form>
  );
}

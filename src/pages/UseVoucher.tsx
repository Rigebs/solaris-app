import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

const boxes = [
  {
    name: "Caja Clásica",
    description: "12 trufas artesanales surtidas.",
    price: 15000,
    image: "/cajas/caja3.jpg",
  },
  {
    name: "Caja Premium",
    description: "20 trufas gourmet + empaque de lujo.",
    price: 25000,
    image: "/cajas/caja2.jpg",
  },
  {
    name: "Mini Caja",
    description: "6 trufas para regalar.",
    price: 9000,
    image: "/cajas/caja1.jpg",
  },
];

export default function UseVoucher() {
  const [voucherApplied, setVoucherApplied] = useState(false);

  const applyDiscount = (price: number) => {
    return Math.round(price * 0.85); // 15% de descuento
  };

  return (
    <MainLayout email={null}>
      <div className="max-w-4xl mx-auto py-9">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
          🛍️ Elige tu caja favorita
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {boxes.map((box, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={box.image}
                alt={box.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{box.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{box.description}</p>
                <p className="text-gray-800 font-bold mb-4">
                  Precio:{" "}
                  <span className="line-through text-gray-400 mr-2">
                    S/. {box.price.toFixed(2)}
                  </span>
                  <span className="text-yellow-600">
                    S/. {applyDiscount(box.price).toFixed(2)}
                  </span>
                </p>
                <button
                  onClick={() => setVoucherApplied(true)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Ordenar
                </button>
              </div>
            </div>
          ))}
        </div>

        {voucherApplied && (
          <p className="mt-6 text-center text-green-600 font-semibold text-lg">
            ✅ ¡Vale aplicado! Nos pondremos en contacto para confirmar tu
            pedido.
          </p>
        )}
      </div>
    </MainLayout>
  );
}

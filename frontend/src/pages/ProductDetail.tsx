import { useParams } from "react-router-dom";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { products } from "../mock/products";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === Number(id));
  if (!product) return <p>Producto no encontrado</p>;

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleTopping = (t: string) => {
    setSelectedToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  // ❗ FINAL PRICE = precio del tamaño (no dependemos de basePrice)
  const finalPrice = selectedSize.price;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Galería Swiper */}
      <div>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rounded-xl"
        >
          {product.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} className="w-full rounded-xl" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Información del producto */}
      <div>
        <h1 className="text-4xl font-bold text-pink-700">{product.name}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>

        {/* Tamaños */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Tamaños / Porciones</h2>

          <div className="flex flex-col gap-2 mt-2">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 rounded-xl border transition ${
                  selectedSize.label === s.label
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white hover:border-pink-400"
                }`}
              >
                {s.label} — ${s.price}
              </button>
            ))}
          </div>
        </div>

        {/* Toppings */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Toppings opcionales</h2>

          <div className="flex flex-wrap gap-3 mt-2">
            {product.toppings.map((t) => (
              <button
                key={t}
                onClick={() => toggleTopping(t)}
                className={`px-4 py-2 rounded-xl border transition ${
                  selectedToppings.includes(t)
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white hover:border-pink-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Notas */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Notas (opcional)</h2>
          <textarea
            placeholder="Ej: sin azúcar, agregar fresas extra..."
            className="w-full border p-3 rounded-xl mt-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Precio final */}
        <p className="mt-6 text-3xl font-bold text-pink-700">
          ${finalPrice.toFixed(2)}
        </p>

        {/* Botón agregar al carrito */}
        <button
          className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition"
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              images: product.images,

              // Datos que el checkout SI puede leer
              size: selectedSize.label,
              toppings: selectedToppings,
              notes,

              price: product.basePrice, // precio base (si lo necesitas)
              finalPrice, // este es el que se cobra realmente

              quantity: 1,
            });

            showToast("Producto agregado al carrito");
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import type { Product } from "../types/product";
import { getProductById } from "../services/productService";
import { formatCurrency } from "../utils/currency";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  // Fetch del producto
  useEffect(() => {
    if (!id) return;

    setLoading(true);

    getProductById(Number(id))
      .then((data) => {
        setProduct(data);

        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }

        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const finalPrice = selectedSize.price;

  const toggleTopping = (t: string) => {
    setSelectedToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Galería Swiper */}
      <div>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="rounded-xl"
        >
          {product.images?.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="w-full h-[400px] object-cover rounded-xl"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Información del producto */}
      <div>
        <h1 className="text-4xl font-bold text-yellow-700">{product.name}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>

        {/* Tamaños */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Tamaños / Porciones</h2>

          <div className="flex flex-col gap-2 mt-2">
            {product.sizes?.map((s) => (
              <button
                key={s.label}
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 rounded-xl border transition focus:outline-none focus:ring-0 ${
                  selectedSize?.label === s.label
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "bg-white hover:border-yellow-300"
                }`}
              >
                {s.label} — {formatCurrency(s.price)}
              </button>
            ))}
          </div>
        </div>

        {/* Toppings */}
        <div className="mt-6">
          <h2 className="font-semibold text-lg">Toppings opcionales</h2>

          <div className="flex flex-wrap gap-3 mt-2">
            {product.toppings?.map((t) => (
              <button
                key={t}
                onClick={() => toggleTopping(t)}
                className={`px-4 py-2 rounded-xl border transition focus:outline-none focus:ring-0 ${
                  selectedToppings.includes(t)
                    ? "bg-yellow-500 text-white border-yellow-500"
                    : "bg-white hover:border-yellow-400"
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
            className="w-full border p-3 rounded-xl mt-2 focus:outline-none focus:ring-0"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Precio final */}
        <p className="mt-6 text-3xl font-bold text-yellow-600">
          {formatCurrency(finalPrice)}
        </p>

        {/* Botón agregar al carrito */}
        <button
          className="mt-6 bg-yellow-600 text-white px-6 py-3 rounded-xl hover:bg-yellow-700 transition focus:outline-none focus:ring-0"
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              images: product.images,
              size: selectedSize.label,
              toppings: selectedToppings,
              notes,
              price: product.base_price,
              finalPrice,
              quantity: 1,
            });

            showToast(
              "¡Producto agregado!",
              "success",
              3500,
              product.name,
              product.images?.[0]
            );
          }}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import ProductSelector from "../components/ProductSelector";
import { formatCurrency } from "../utils/currency";
import { useProductDetail, useProductSelection } from "../hooks";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const productId = id ? Number(id) : 0;
  const { product, loading, error } = useProductDetail(productId);
  const {
    selectedSize,
    selectedToppings,
    notes,
    setSelectedSize,
    toggleTopping,
    setNotes,
  } = useProductSelection();

  // Inicializar la selección cuando carga el producto
  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (loading)
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">Cargando producto...</p>
      </div>
    );

  if (error || !product)
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-lg">
          {error || "Producto no encontrado"}
        </p>
      </div>
    );

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("Por favor selecciona un tamaño", "warning");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      images: product.images,
      size: selectedSize.label,
      toppings: selectedToppings,
      notes,
      price: product.base_price,
      finalPrice: selectedSize.price,
      quantity: 1,
    });

    showToast(
      "¡Producto agregado!",
      "success",
      3500,
      product.name,
      product.images?.[0]
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
                alt={`${product.name} - imagen ${i + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Información del producto */}
      <div>
        <h1 className="text-4xl font-bold text-yellow-700">{product.name}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>

        <ProductSelector
          product={product}
          selectedSize={selectedSize}
          selectedToppings={selectedToppings}
          notes={notes}
          onSizeChange={setSelectedSize}
          onToppingToggle={toggleTopping}
          onNotesChange={setNotes}
        />

        {/* Precio final */}
        <p className="mt-6 text-3xl font-bold text-yellow-600">
          {selectedSize
            ? formatCurrency(selectedSize.price)
            : "Selecciona un tamaño"}
        </p>

        {/* Botón agregar al carrito */}
        <button
          className="mt-6 bg-yellow-600 text-white px-6 py-3 rounded-xl hover:bg-yellow-700 transition focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto font-semibold"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = {
  id: number;
  name: string;
  images: string[];
  size: string;
  toppings: string[];
  notes?: string;

  price: number; // basePrice
  finalPrice: number; // precio real según tamaño

  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size?: string, toppings?: string[]) => void;

  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // ⭐ Carga inicial desde localStorage
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // ⭐ Guarda el carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find(
        (p) =>
          p.id === item.id &&
          p.size === item.size &&
          JSON.stringify(p.toppings) === JSON.stringify(item.toppings)
      );

      if (exists) {
        return prev.map((p) =>
          p.id === item.id &&
          p.size === item.size &&
          JSON.stringify(p.toppings) === JSON.stringify(item.toppings)
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prev, item];
    });
  };

  const removeFromCart = (id: number, size?: string, toppings?: string[]) => {
    setCart((prev) =>
      prev.filter(
        (p) =>
          !(
            p.id === id &&
            p.size === size &&
            JSON.stringify(p.toppings) === JSON.stringify(toppings)
          )
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

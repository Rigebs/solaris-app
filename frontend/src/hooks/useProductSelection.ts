import { useState } from "react";
import type { Product } from "../types/product";

interface ProductSelection {
  selectedSize: any;
  selectedToppings: string[];
  notes: string;
}

interface useProductSelectionReturn extends ProductSelection {
  setSelectedSize: (size: any) => void;
  toggleTopping: (topping: string) => void;
  setNotes: (notes: string) => void;
  resetSelection: () => void;
  initializeSelection: (product: Product | null) => void;
}

export function useProductSelection(): useProductSelectionReturn {
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleTopping = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const resetSelection = () => {
    setSelectedSize(null);
    setSelectedToppings([]);
    setNotes("");
  };

  const initializeSelection = (product: Product | null) => {
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    resetSelection();
  };

  return {
    selectedSize,
    selectedToppings,
    notes,
    setSelectedSize,
    toggleTopping,
    setNotes,
    resetSelection,
    initializeSelection,
  };
}

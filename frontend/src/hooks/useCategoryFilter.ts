import { useState } from "react";

interface useCategoryFilterReturn {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  resetFilter: () => void;
}

export function useCategoryFilter(
  initialCategory: string = "all"
): useCategoryFilterReturn {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const resetFilter = () => {
    setSelectedCategory("all");
  };

  return { selectedCategory, setSelectedCategory, resetFilter };
}

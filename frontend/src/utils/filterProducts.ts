export const filterProducts = (products: any[], filters: any) => {
  let result = [...products];

  // Filtrar por precio
  if (filters.minPrice !== null) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }
  if (filters.maxPrice !== null) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }

  // Ordenar
  if (filters.sort === "asc") {
    result.sort((a, b) => a.price - b.price);
  }
  if (filters.sort === "desc") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
};

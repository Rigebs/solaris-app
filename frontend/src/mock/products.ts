export const products = [
  {
    id: 1,
    name: "Torta de Chocolate",
    basePrice: 25,
    images: [
      "https://tse1.explicit.bing.net/th/id/OIP.TXoFynkjJqWEnuj8Ym6_OgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://images.pexels.com/photos/45202/chocolate-dessert-cake-sweet-45202.jpeg",
      "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
    ],
    category: "Tortas",
    categorySlug: "tortas",
    description: "Deliciosa torta artesanal de chocolate.",
    sizes: [
      { label: "Pequeña (10cm)", price: 25 },
      { label: "Mediana (20cm)", price: 35 },
      { label: "Grande (30cm)", price: 48 },
    ],
    toppings: ["Nueces", "Fresas", "Chispas", "Crema extra"],
  },
  {
    id: 2,
    name: "Cupcakes Rosa",
    basePrice: 12,
    images: [
      "https://i.pinimg.com/originals/dc/bf/06/dcbf06f9e2b23d275b5cf45e15a4f1e1.jpg",
      "https://images.pexels.com/photos/14105/pexels-photo.jpg",
    ],
    category: "Cupcakes",
    categorySlug: "cupcakes",
    description: "Cupcakes suaves decorados a mano.",
    sizes: [
      { label: "Caja 4 unidades", price: 12 },
      { label: "Caja 6 unidades", price: 16 },
      { label: "Caja 12 unidades", price: 28 },
    ],
    toppings: ["Sprinkles", "Crema extra", "Fondant"],
  },
  {
    id: 3,
    name: "Galletas de Chispas",
    basePrice: 8,
    images: [
      "https://tse1.mm.bing.net/th/id/OIP.GR6kqpTCFKTzhd4IewABagHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg",
    ],
    category: "Galletas",
    categorySlug: "galletas",
    description: "Crujientes galletas con chispas de chocolate.",
    sizes: [
      { label: "Bolsa 6 unidades", price: 8 },
      { label: "Bolsa 12 unidades", price: 14 },
    ],
    toppings: ["Chispas extra", "Chocolate blanco"],
  },
];

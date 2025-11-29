// Mensajes de error comunes
export const ERROR_MESSAGES = {
  CREDENTIALS_INVALID: "Credenciales inválidas",
  EMAIL_ALREADY_EXISTS: "Ya existe una cuenta con ese correo",
  PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 6 caracteres",
  PASSWORDS_DONT_MATCH: "Las contraseñas no coinciden",
  PRODUCT_NOT_FOUND: "Producto no encontrado",
  LOAD_CATEGORIES_ERROR: "Error al cargar categorías",
  LOAD_PRODUCTS_ERROR: "Error al cargar productos",
  LOAD_ORDERS_ERROR: "Error al cargar los pedidos",
  UPDATE_USER_ERROR: "Error al actualizar datos",
  SELECT_SIZE: "Por favor selecciona un tamaño",
  LOGIN_REQUIRED: "Necesitas iniciar sesión",
  CHECKOUT_LOGIN_REQUIRED: "Necesitas iniciar sesión para procesar el pago",
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: "¡Cuenta creada exitosamente!",
  PRODUCT_ADDED: "¡Producto agregado!",
  ORDER_PLACED: "¡Pedido realizado!",
  USER_DATA_UPDATED: "Datos actualizados correctamente",
} as const;

// Rutas
export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalogo",
  CART: "/carrito",
  CHECKOUT: "/checkout",
  LOGIN: "/login",
  REGISTER: "/registro",
  ACCOUNT: "/cuenta",
  ORDERS: "/pedidos",
  WISHLIST: "/favoritos",
  PRODUCT_DETAIL: "/producto/:id",
  CATEGORY: "/categoria/:id",
} as const;

// Colores
export const COLORS = {
  PRIMARY: "yellow",
  SECONDARY: "gray",
  SUCCESS: "green",
  ERROR: "red",
  WARNING: "yellow",
} as const;

// Paginación
export const PAGINATION = {
  PRODUCTS_PER_PAGE: 12,
  ORDERS_PER_PAGE: 10,
} as const;

// Toast duraciones
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3500,
  LONG: 5000,
} as const;

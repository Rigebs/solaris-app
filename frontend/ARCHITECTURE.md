# Arquitectura del Frontend - Solaris App

## Descripción General

El frontend ha sido completamente reorganizado siguiendo principios de **separación de responsabilidades** y **composición de componentes**. La estructura ahora es escalable, mantenible y sigue patrones de React modernos.

---

## Estructura de Carpetas

```
src/
├── components/          # Componentes presentacionales (UI)
│   ├── ui/             # Componentes básicos reutilizables
│   ├── auth/           # Componentes relacionados a autenticación
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── CategoryList.tsx
│   ├── CartItemList.tsx
│   ├── CartSummary.tsx
│   ├── OrderList.tsx
│   ├── CheckoutForm.tsx
│   ├── CheckoutOrderSummary.tsx
│   └── ProductSelector.tsx
├── hooks/              # Custom hooks para lógica reutilizable
│   ├── useCategories.ts
│   ├── useProducts.ts
│   ├── useProductDetail.ts
│   ├── useProductSelection.ts
│   ├── useCategoryFilter.ts
│   ├── useCheckoutForm.ts
│   ├── useWishlistProducts.ts
│   ├── useCreateOrder.ts
│   ├── useOrders.ts
│   ├── useUsers.ts
│   └── index.ts        # Exports de todos los hooks
├── pages/              # Páginas (ahora solo manejan UI)
│   ├── Home.tsx
│   ├── Catalog.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Account.tsx
│   ├── Orders.tsx
│   ├── WishList.tsx
│   ├── CategoryPage.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── admin/
├── context/            # React Context para estado global
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   ├── ToastContext.tsx
│   ├── WishlistContext.tsx
│   └── OrdersContext.tsx
├── services/           # Servicios API
│   ├── authService.ts
│   ├── categoryService.ts
│   ├── productService.ts
│   ├── orderService.ts
│   ├── userService.ts
│   └── ...
├── utils/              # Utilidades generales
│   ├── currency.ts
│   ├── validators.ts   # Validaciones reutilizables
│   └── ...
├── constants/          # Constantes de la aplicación
│   └── app.ts
├── types/              # Tipos TypeScript
│   ├── product.ts
│   ├── order.ts
│   ├── user.ts
│   ├── category.ts
│   └── ...
├── lib/                # Librerías y configuraciones
│   └── axios.ts
├── routes/             # Rutas de la aplicación
│   └── AppRoutes.tsx
├── layouts/            # Layouts compartidos
│   ├── MainLayout.tsx
│   ├── AdminLayout.tsx
│   └── AuthLayout.tsx
└── main.tsx
```

---

## Patrones Principales

### 1. **Pages (Páginas)**

Las páginas ahora son **presentacionales** y **componedoras**. Solo manejan:

- Obtener datos mediante hooks
- Pasar props a componentes
- Manejar navegación

```tsx
export default function Home() {
  const { categories } = useCategories();
  const { selectedCategory, setSelectedCategory } = useCategoryFilter("all");
  const { products, loading } = useProducts(categoryId);

  return (
    <PageWrapper>
      <CategoryList
        categories={categories}
        onCategoryClick={handleCategorySelect}
      />
      <ProductList products={products} isLoading={loading} />
    </PageWrapper>
  );
}
```

### 2. **Hooks (Custom Hooks)**

Cada hook es responsable de **una sola cosa**:

#### `useCategories` - Obtener categorías

```tsx
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch logic aquí

  return { categories, loading, error };
}
```

#### `useProducts` - Obtener productos

```tsx
export function useProducts(categoryId?: number) {
  // Obtiene productos, puede ser filtrado por categoría
  return { products, loading, error, refetch };
}
```

#### `useProductDetail` - Detalle de un producto

```tsx
export function useProductDetail(productId: number) {
  // Obtiene un producto específico
  return { product, loading, error };
}
```

#### `useProductSelection` - Selecciones en un producto

```tsx
export function useProductSelection() {
  // Maneja talla, toppings, notas
  return {
    selectedSize,
    selectedToppings,
    notes,
    setSelectedSize,
    toggleTopping,
    setNotes,
  };
}
```

#### `useCheckoutForm` - Formulario de checkout

```tsx
export function useCheckoutForm() {
  // Maneja formulario, carga datos del usuario, guarda cambios
  return { form, updateField, saveUserData, isLoading };
}
```

### 3. **Componentes Presentacionales**

Los componentes **nunca hacen fetch** de datos. Solo reciben props:

#### `ProductList`

```tsx
interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function ProductList({
  products,
  isLoading,
  emptyMessage,
}: ProductListProps) {
  // Solo renderiza, sin lógica
}
```

#### `CartItemList`

```tsx
export default function CartItemList() {
  // Usa useCart() del context, pero no hace fetch
  const { cart, removeFromCart } = useCart();
  return <div>{/* render items */}</div>;
}
```

#### `CheckoutForm`

```tsx
interface CheckoutFormProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  formData: { name: string; address: string; phone: string };
  onFieldChange: (field: string, value: string) => void;
}
```

### 4. **Context (Estado Global)**

Los contextos mantienen estado compartido:

- **AuthContext**: Usuario autenticado, login, logout
- **CartContext**: Carrito de compras
- **ToastContext**: Notificaciones
- **WishlistContext**: Favoritos
- **OrdersContext**: Órdenes del usuario

---

## Flujo de Datos

```
Page (Container)
  ↓
hooks (useProducts, useCheckoutForm, etc)
  ↓
Services (API calls)
  ↓
Presentational Components (ProductList, CheckoutForm, etc)
  ↓
Context (CartContext, AuthContext, etc) - para estado global
```

### Ejemplo: Página de Inicio

```tsx
// 1. Página obtiene datos mediante hooks
const { categories } = useCategories();
const { selectedCategory, setSelectedCategory } = useCategoryFilter("all");
const { products } = useProducts(categoryId);

// 2. Pasa datos a componentes presentacionales
return (
  <>
    <CategoryList
      categories={categories} // ← Props
      onCategoryClick={setSelectedCategory}
    />
    <ProductList
      products={products} // ← Props
      isLoading={loading}
    />
  </>
);

// 3. Componentes solo renderizan
// ProductList: {products.map(p => <ProductCard product={p} />)}
```

---

## Nuevos Componentes

### `ProductList` - Lista de productos

- Maneja estados de carga y vacío
- Acepta número de columnas configurable
- Renderiza `ProductCard` para cada producto

### `CategoryList` - Selector de categorías

- Botón "Todos" + categorías dinámicas
- Callback al hacer clic
- Estado de selección visual

### `CartItemList` - Items del carrito

- Listra items con detalles
- Botón de eliminar
- Usa `useCart()`

### `CartSummary` - Resumen del carrito

- Total de items
- Precio total
- Información rápida

### `OrderList` - Lista de órdenes

- Estados de carga y error
- Renderiza `OrderCard` para cada orden
- Mensaje cuando está vacío

### `CheckoutForm` - Formulario de checkout

- Campos: nombre, dirección, teléfono
- Control de carga
- Cambios de campo

### `CheckoutOrderSummary` - Resumen en checkout

- Items del carrito con detalles
- Total
- Información de toppings y notas

### `ProductSelector` - Selector de opciones del producto

- Tamaños con precios
- Toppings con toggle
- Notas opcionales

---

## Nuevos Hooks

### `useCategories`

Obtiene categorías de la API.

```tsx
const { categories, loading, error } = useCategories();
```

### `useProducts`

Obtiene productos, opcionalmente filtrados por categoría.

```tsx
const { products, loading, error, refetch } = useProducts(categoryId);
```

### `useProductDetail`

Obtiene un producto específico por ID.

```tsx
const { product, loading, error } = useProductDetail(productId);
```

### `useProductSelection`

Maneja selecciones dentro de un producto (talla, toppings, notas).

```tsx
const {
  selectedSize,
  selectedToppings,
  notes,
  setSelectedSize,
  toggleTopping,
  setNotes,
} = useProductSelection();
```

### `useCategoryFilter`

Maneja el estado de filtro de categoría.

```tsx
const { selectedCategory, setSelectedCategory } = useCategoryFilter("all");
```

### `useCheckoutForm`

Maneja el formulario de checkout, carga datos del usuario, y guarda cambios.

```tsx
const { form, updateField, saveUserData, isLoading } = useCheckoutForm();
```

### `useWishlistProducts`

Obtiene productos del wishlist.

```tsx
const { products, loading, error } = useWishlistProducts();
```

---

## Constantes Centralizadas

Archivo: `src/constants/app.ts`

```tsx
export const ERROR_MESSAGES = {
  CREDENTIALS_INVALID: "Credenciales inválidas",
  EMAIL_ALREADY_EXISTS: "Ya existe una cuenta con ese correo",
  PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 6 caracteres",
  PASSWORDS_DONT_MATCH: "Las contraseñas no coinciden",
  // ... más mensajes
};

export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: "¡Cuenta creada exitosamente!",
  PRODUCT_ADDED: "¡Producto agregado!",
  // ... más mensajes
};

export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalogo",
  CART: "/carrito",
  // ... más rutas
};
```

---

## Utilidades de Validación

Archivo: `src/utils/validators.ts`

```tsx
export const Validators = {
  email: (email: string): boolean => { ... },
  password: (password: string): { valid: boolean; message?: string } => { ... },
  name: (name: string): boolean => { ... },
  phone: (phone: string): boolean => { ... },
  colombianPhone: (phone: string): boolean => { ... },
};

export function isCheckoutFormValid(form: any) {
  // Valida todo el formulario de checkout
}
```

---

## Principios Seguidos

### 1. **Separación de Responsabilidades**

- **Páginas**: Composición y orquestación
- **Hooks**: Lógica de estado y datos
- **Componentes**: Solo renderización
- **Services**: Llamadas a API
- **Context**: Estado global

### 2. **DRY (Don't Repeat Yourself)**

- Hooks reutilizables para lógica común
- Componentes reutilizables para UI común
- Constantes centralizadas

### 3. **Composición sobre Herencia**

- Componentes pequeños y enfocados
- Combinación de componentes para crear interfaces complejas

### 4. **Type Safety**

- TypeScript en todas partes
- Interfaces bien definidas para props
- Tipos de retorno explícitos en hooks

### 5. **Performance**

- Componentes memorizados donde sea necesario
- Hooks con dependencias optimizadas
- Evitar renders innecesarios

---

## Ejemplo Completo: Página de Productos por Categoría

```tsx
// src/pages/CategoryPage.tsx
import { useParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useProducts } from "../hooks";

export default function CategoryPage() {
  // 1. Obtener ID de la ruta
  const { id } = useParams();
  const categoryId = id ? Number(id) : 0;

  // 2. Obtener datos mediante hook
  const { products, loading, error } = useProducts(categoryId);

  // 3. Obtener nombre de categoría
  const categoryName = products[0]?.category_name || "Productos";

  // 4. Manejar errores
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  // 5. Renderizar usando componentes presentacionales
  return (
    <div className="max-w-5xl mx-auto px-4 pb-10">
      <h1 className="text-4xl font-bold text-yellow-700 mb-8">
        {categoryName}
      </h1>

      <ProductList
        products={products}
        isLoading={loading}
        emptyMessage="No hay productos en esta categoría"
      />
    </div>
  );
}
```

---

## Próximas Mejoras Sugeridas

1. **React Query o SWR** - Para caching automático de datos
2. **Error Boundary** - Para manejo de errores global
3. **Optimización de Imágenes** - Lazy loading y webp
4. **Code Splitting** - Con React.lazy y Suspense
5. **Testing** - Unit tests para hooks y componentes
6. **Documentación de Componentes** - Storybook

---

## Cómo Agregar una Nueva Página

1. **Crear página en `/pages`**
2. **Crear hooks necesarios en `/hooks` si no existen**
3. **Crear componentes presentacionales si son específicos**
4. **La página solo compon los elementos, no obtiene datos directamente**

### Ejemplo: Nueva página de "Promociones"

```tsx
// src/pages/Promotions.tsx
import { usePromotions } from "../hooks/usePromotions"; // Hook nuevo
import PromotionGrid from "../components/PromotionGrid"; // Componente nuevo

export default function Promotions() {
  const { promotions, loading } = usePromotions();

  return (
    <PageWrapper>
      <h1>Promociones</h1>
      <PromotionGrid promotions={promotions} isLoading={loading} />
    </PageWrapper>
  );
}
```

---

## Resumen

La nueva arquitectura es:

- ✅ **Escalable**: Fácil agregar nuevas funcionalidades
- ✅ **Mantenible**: Responsabilidades claras
- ✅ **Reutilizable**: Componentes y hooks independientes
- ✅ **Type-safe**: TypeScript en todas partes
- ✅ **Performance**: Optimizada y sin renders innecesarios

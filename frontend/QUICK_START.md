# Guía Rápida de Referencia - Frontend Reorganizado

## 🚀 Comenzar Rápidamente

### Importar un Hook

```tsx
import { useProducts, useCategories, useCheckoutForm } from "../hooks";
```

### Crear una Página Nueva

1. Archivo en `src/pages/MyPage.tsx`
2. Usar hooks para obtener datos
3. Usar componentes para renderizar

```tsx
import { useProducts } from "../hooks";
import ProductList from "../components/ProductList";

export default function MyPage() {
  const { products, loading } = useProducts();
  return <ProductList products={products} isLoading={loading} />;
}
```

---

## 📚 Referencia de Hooks

### Data Fetching

| Hook                       | Returns                                 | Uso                   |
| -------------------------- | --------------------------------------- | --------------------- |
| `useCategories()`          | `{ categories, loading, error }`        | Obtener categorías    |
| `useProducts(categoryId?)` | `{ products, loading, error, refetch }` | Obtener productos     |
| `useProductDetail(id)`     | `{ product, loading, error }`           | Producto específico   |
| `useWishlistProducts()`    | `{ products, loading, error }`          | Favoritos del usuario |

### Form & State

| Hook                          | Returns                                                  | Uso                  |
| ----------------------------- | -------------------------------------------------------- | -------------------- |
| `useCheckoutForm()`           | `{ form, updateField, saveUserData, isLoading }`         | Formulario checkout  |
| `useProductSelection()`       | `{ selectedSize, selectedToppings, notes, ... }`         | Opciones de producto |
| `useCategoryFilter(initial?)` | `{ selectedCategory, setSelectedCategory, resetFilter }` | Filtro de categoría  |

### Admin

| Hook                   | Returns                                                   | Uso                |
| ---------------------- | --------------------------------------------------------- | ------------------ |
| `useAdminStats()`      | `{ stats, loading, error, refetch }`                      | Estadísticas admin |
| `useAdminProducts()`   | `{ products, loading, error, deleteProduct, refetch }`    | Productos admin    |
| `useAdminCategories()` | `{ categories, loading, error, deleteCategory, refetch }` | Categorías admin   |

### Existentes

| Hook                | Returns                           | Uso                 |
| ------------------- | --------------------------------- | ------------------- |
| `useCreateOrder()`  | `{ createOrder, loading, error }` | Crear orden         |
| `useOrders(userId)` | `{ orders, loading, error }`      | Órdenes del usuario |
| `useUsers()`        | `{ ... }`                         | Manejo de usuarios  |

---

## 🎨 Referencia de Componentes

### Lists

```tsx
// ProductList - Lista de productos
<ProductList
  products={products}
  isLoading={loading}
  emptyMessage="No hay productos"
  columns={3}
/>

// OrderList - Lista de órdenes
<OrderList
  orders={orders}
  isLoading={loading}
  error={error}
/>

// CartItemList - Items del carrito
<CartItemList onRemoveItem={handleRemove} />
```

### Selectors

```tsx
// CategoryList - Selector de categorías
<CategoryList
  categories={categories}
  selectedId={selected}
  onCategoryClick={handleSelect}
/>

// ProductSelector - Opciones de producto
<ProductSelector
  product={product}
  selectedSize={size}
  selectedToppings={toppings}
  notes={notes}
  onSizeChange={setSize}
  onToppingToggle={toggleTopping}
  onNotesChange={setNotes}
/>
```

### Forms & Summaries

```tsx
// CheckoutForm
<CheckoutForm
  onSubmit={handleSubmit}
  isLoading={isLoading}
  formData={form}
  onFieldChange={updateField}
/>

// CheckoutOrderSummary
<CheckoutOrderSummary />

// CartSummary
<CartSummary />
```

---

## 🔄 Patrones Comunes

### Obtener y Mostrar Datos

```tsx
const { products, loading, error } = useProducts();

if (loading) return <p>Cargando...</p>;
if (error) return <p>Error: {error}</p>;

return <ProductList products={products} />;
```

### Formulario con Validación

```tsx
const { form, updateField, saveUserData, isLoading } = useCheckoutForm();

const handleSubmit = async (e) => {
  e.preventDefault();
  const saved = await saveUserData();
  if (saved) {
    // Continuar
  }
};

return (
  <CheckoutForm
    formData={form}
    onFieldChange={updateField}
    onSubmit={handleSubmit}
    isLoading={isLoading}
  />
);
```

### Selecciones en Producto

```tsx
const { selectedSize, selectedToppings, notes, ... } = useProductSelection();

// Usar los estados...
```

---

## 📍 Ubicaciones Importantes

| Qué           | Dónde                     |
| ------------- | ------------------------- |
| Hooks         | `src/hooks/`              |
| Componentes   | `src/components/`         |
| Páginas       | `src/pages/`              |
| Servicios API | `src/services/`           |
| Tipos         | `src/types/`              |
| Contextos     | `src/context/`            |
| Constantes    | `src/constants/`          |
| Validadores   | `src/utils/validators.ts` |

---

## 🎯 Checklist - Crear Nueva Página

- [ ] Crear archivo `src/pages/MyPage.tsx`
- [ ] Importar hooks necesarios
- [ ] Importar componentes presentacionales
- [ ] Usar hooks para datos
- [ ] Pasar datos a componentes
- [ ] Manejar loading/error
- [ ] Agregar a `AppRoutes.tsx`
- [ ] Revisar documentación en `ARCHITECTURE.md`

---

## 💡 Tips

1. **Nunca hagas fetch en componentes**: Usa hooks
2. **Los componentes solo renderizan**: No tienen lógica
3. **Reutiliza componentes**: ProductList, CartItemList, etc
4. **Maneja errores**: Los hooks retornan error
5. **Muestra loading**: Los hooks retornan loading
6. **Usa constantes**: Importa de `src/constants/app.ts`
7. **Valida inputs**: Usa `src/utils/validators.ts`

---

## 🆘 Ayuda Rápida

**¿Cómo obtener una categoría?**

```tsx
const { categories } = useCategories();
```

**¿Cómo obtener productos de una categoría?**

```tsx
const { products } = useProducts(categoryId);
```

**¿Cómo obtener un producto específico?**

```tsx
const { product } = useProductDetail(productId);
```

**¿Cómo manejar el checkout?**

```tsx
const { form, updateField, saveUserData } = useCheckoutForm();
```

**¿Cómo listar órdenes?**

```tsx
const { orders } = useOrders(userId);
<OrderList orders={orders} />;
```

**¿Cómo mostrar productos?**

```tsx
<ProductList products={products} />
```

---

## 📖 Documentación Completa

Para documentación detallada, ver:

- `ARCHITECTURE.md` - Arquitectura completa
- `CHANGELOG.md` - Todos los cambios realizados

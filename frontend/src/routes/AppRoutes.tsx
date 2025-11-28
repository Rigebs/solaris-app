import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Wishlist from "../pages/WishList";
import Checkout from "../pages/Checkout";
import Account from "../pages/Account";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import Orders from "../pages/Orders";
import Catalog from "../pages/Catalog";
import CategoryPage from "../pages/CategoryPage";
import { PrivateRoute, PublicRoute } from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import ProductList from "../pages/admin/ProductList";
import ProductForm from "../pages/admin/ProductForm";
import CategoryList from "../pages/admin/CategoryList";
import CategoryForm from "../pages/admin/CategoryForm";
import OrderList from "../pages/admin/OrderList";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas con layout normal */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/favoritos" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/categoria/:id" element={<CategoryPage />} />

        {/* Rutas protegidas - requieren autenticación */}
        <Route
          path="/cuenta"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Rutas de autenticación — solo accesibles si NO estás logueado */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>

      {/* Rutas de Administración */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/new" element={<CategoryForm />} />
        <Route path="categories/edit/:id" element={<CategoryForm />} />
        <Route path="orders" element={<OrderList />} />
      </Route>
    </Routes>
  );
}

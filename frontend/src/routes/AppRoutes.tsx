import { Routes, Route } from "react-router-dom";
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
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Rutas de autenticación — solo accesibles si NO estás logueado */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Route>
    </Routes>
  );
}

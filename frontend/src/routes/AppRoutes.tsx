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
        <Route path="/cuenta" element={<Account />} />
        <Route path="/pedidos" element={<Orders />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/categoria/:slug" element={<CategoryPage />} />
      </Route>

      {/* Rutas de autenticación — sin navbar/footer */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

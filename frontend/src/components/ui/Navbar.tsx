import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineMenu,
  AiOutlineArrowLeft,
} from "react-icons/ai";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navigate = useNavigate();
  const location = useLocation();

  // Rutas donde NO debe aparecer el botón de volver
  const hideBackOn = ["/", "/catalogo", "/contacto", "/sobre-nosotros"];
  const showBackButton = !hideBackOn.includes(location.pathname);

  const handleBack = () => {
    // Si estamos en el flujo de checkout, llevar al carrito
    if (location.pathname.startsWith("/checkout")) {
      return navigate("/carrito", { replace: true });
    }

    // Si estamos en /pedidos o viendo un pedido, ir a /cuenta
    if (
      location.pathname.startsWith("/pedido") ||
      location.pathname.startsWith("/pedidos")
    ) {
      return navigate("/cuenta", { replace: true });
    }

    // Si estamos en /cuenta, favoritos o carrito, ir a home
    // (no usar historial para evitar ciclos)
    if (
      location.pathname === "/cuenta" ||
      location.pathname === "/favoritos" ||
      location.pathname === "/carrito"
    ) {
      return navigate("/", { replace: true });
    }

    // Si estamos en detalle de producto, usar historial (-1)
    // Esto lleva a donde vino (home, catalogo, busqueda, etc)
    if (location.pathname.startsWith("/producto")) {
      return navigate(-1);
    }

    // Por defecto, ir a home
    navigate("/", { replace: true });
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* BACK BUTTON */}
        {showBackButton && (
          <button
            onClick={handleBack}
            className="text-gray-700 hover:text-yellow-600 flex items-center transition"
          >
            <AiOutlineArrowLeft size={24} />
          </button>
        )}

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-yellow-600">
          Solaris
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium ml-6">
          <Link to="/" className="hover:text-yellow-600 transition">
            Inicio
          </Link>
          <Link to="/contacto" className="hover:text-yellow-600 transition">
            Contacto
          </Link>
          <Link
            to="/sobre-nosotros"
            className="hover:text-yellow-600 transition"
          >
            Sobre Nosotros
          </Link>
        </div>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:flex w-1/3">
          <SearchBar />
        </div>

        {/* DESKTOP ICONS */}
        <div className="hidden md:flex items-center gap-6">
          {/* Wishlist */}
          <Link
            to="/favoritos"
            className="relative hover:text-yellow-500 transition"
          >
            <AiOutlineHeart size={24} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-600 text-white text-xs rounded-full px-2">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/carrito"
            className="relative hover:text-yellow-500 transition"
          >
            <AiOutlineShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-600 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User */}
          <Link to="/cuenta" className="hover:text-yellow-500 transition">
            <AiOutlineUser size={24} />
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(true)}
        >
          <AiOutlineMenu size={28} />
        </button>
      </div>

      {/* MOBILE SEARCH */}
      <div className="flex md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* MOBILE MENU */}
      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
    </nav>
  );
}

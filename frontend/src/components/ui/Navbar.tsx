import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineMenu,
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

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-yellow-600">
          Solaris
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex w-1/3">
          <SearchBar />
        </div>

        {/* Desktop Icons */}
        <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-yellow-600">
              Solaris
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
              <Link to="/" className="hover:text-pink-600 transition">
                Inicio
              </Link>
              <Link to="/contacto" className="hover:text-pink-600 transition">
                Contacto
              </Link>
              <Link
                to="/sobre-nosotros"
                className="hover:text-pink-600 transition"
              >
                Sobre Nosotros
              </Link>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex w-1/3">
              <SearchBar />
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/favoritos"
                className="relative hover:text-pink-500 transition"
              >
                <AiOutlineHeart size={24} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs rounded-full px-2">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/carrito"
                className="relative hover:text-pink-500 transition"
              >
                <AiOutlineShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-pink-600 text-white text-xs rounded-full px-2">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link to="/cuenta" className="hover:text-pink-500 transition">
                <AiOutlineUser size={24} />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileOpen(true)}
            >
              <AiOutlineMenu size={28} />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="flex md:hidden px-4 pb-3">
            <SearchBar />
          </div>

          {/* Mobile Menu Drawer */}
          <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(true)}
        >
          <AiOutlineMenu size={28} />
        </button>
      </div>

      {/* Mobile Search */}
      <div className="flex md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
    </nav>
  );
}

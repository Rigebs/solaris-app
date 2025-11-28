import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function MobileMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const { user } = useAuth();
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform 
      ${open ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-pink-600">Menú</h3>
        <button onClick={() => setOpen(false)}>
          <AiOutlineClose size={24} />
        </button>
      </div>

      <div className="flex flex-col p-4 gap-4">
        <Link to="/" onClick={() => setOpen(false)}>
          Inicio
        </Link>
        <Link
          to="/carrito"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          Carrito
          {totalItems > 0 && (
            <span className="bg-yellow-600 text-white text-xs rounded-full px-2 font-semibold">
              {totalItems}
            </span>
          )}
        </Link>
        <Link to="/favoritos" onClick={() => setOpen(false)}>
          Favoritos
        </Link>
        <Link to="/contacto" onClick={() => setOpen(false)}>
          Contacto
        </Link>
        <Link to="/sobre-nosotros" onClick={() => setOpen(false)}>
          Sobre Nosotros
        </Link>
        {user?.is_superuser && (
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="font-semibold text-orange-600"
          >
            Panel Admin
          </Link>
        )}
        <Link to="/cuenta" onClick={() => setOpen(false)}>
          Mi Cuenta
        </Link>
      </div>
    </div>
  );
}

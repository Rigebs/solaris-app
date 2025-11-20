import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

export default function MobileMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
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
        <Link to="/favoritos" onClick={() => setOpen(false)}>
          Favoritos
        </Link>
        <Link to="/contacto" onClick={() => setOpen(false)}>
          Contacto
        </Link>
        <Link to="/sobre-nosotros" onClick={() => setOpen(false)}>
          Sobre Nosotros
        </Link>
        <Link to="/cuenta" onClick={() => setOpen(false)}>
          Mi Cuenta
        </Link>
      </div>
    </div>
  );
}

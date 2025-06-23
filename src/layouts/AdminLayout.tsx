import { FiLogOut, FiHome, FiGift, FiStar, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../clients/supabaseClient";
import clsx from "clsx";
import { useState } from "react";
import type { ReactNode } from "react";
import { FaCookieBite } from "react-icons/fa";

interface AdminLayoutProps {
  children: ReactNode;
  email?: string | null;
}

export default function AdminLayout({ children, email }: AdminLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row text-gray-800 bg-yellow-50 relative">
      {/* Mobile Navbar - Fixed */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow p-4 flex justify-between items-center z-50">
        <h1 className="text-xl font-bold text-yellow-600">Solaris Admin</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-yellow-600 text-2xl"
        >
          <FiMenu />
        </button>
      </div>

      {/* Overlay (only visible in mobile when sidebar is open) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar - Fixed */}
      <aside
        className={clsx(
          "fixed md:fixed top-0 left-0 z-50 w-64 h-screen border-r border-yellow-200 p-6 shadow-md flex flex-col gap-6 bg-white transition-transform duration-300",
          {
            "-translate-x-full md:translate-x-0": !sidebarOpen,
            "translate-x-0": sidebarOpen,
          }
        )}
      >
        <h1 className="text-2xl font-extrabold text-yellow-700 mb-6 hidden md:block">
          Solaris Admin
        </h1>

        <nav className="flex flex-col gap-4 text-yellow-800">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <FiHome />
            Dashboard
          </button>
          <button
            onClick={() => navigate("/vales")}
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <FiGift />
            Vales usados
          </button>
          <button
            onClick={() => navigate("/stickers")}
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <FiStar />
            Stickers
          </button>
          <button
            onClick={() => navigate("/customers/progress")}
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <FiStar />
            Progreso clientes
          </button>

          <button
            onClick={() => navigate("/ventas")}
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <FaCookieBite />
            Registrar venta
          </button>
          <button
            onClick={() => navigate("/pedidos")}
            className="flex items-center gap-2 hover:text-yellow-600"
          >
            <FiStar />
            Pedidos
          </button>
        </nav>

        <div className="mt-auto text-sm text-yellow-900">
          {email && <div className="mb-4">{email}</div>}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-yellow-600 hover:text-red-500"
          >
            <FiLogOut />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={clsx(
          "flex-1 p-6 md:p-8 transition-all duration-300",
          "pt-20",
          "md:pl-74"
        )}
      >
        {children}
      </main>
    </div>
  );
}

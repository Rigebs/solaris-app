import { FiLogOut } from "react-icons/fi";
import { supabase } from "../clients/supabaseClient";
import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  email?: string | null;
}

export default function MainLayout({ children, email }: MainLayoutProps) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      <header className="bg-white shadow p-4 flex justify-between items-center relative z-10">
        <h1 className="text-xl font-bold text-yellow-600">Solaris</h1>

        <div className="flex items-center gap-4">
          {email && <span className="text-sm text-gray-600">{email}</span>}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-700 transition"
          >
            <FiLogOut />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 relative">{children}</main>
    </div>
  );
}

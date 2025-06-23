import { useEffect } from "react";
import { supabase } from "../clients/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        // Ya está autenticado con el magic link
        navigate("/auth/complete-profile");
      } else {
        // No se pudo autenticar correctamente
        navigate("/auth/login");
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500 text-sm">Procesando autenticación...</p>
    </div>
  );
}

import { useState, useEffect } from "react";
import { supabase } from "../clients/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario no está logueado, redirige al login
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth/login");
      }
    };
    getSession();
  }, [navigate]);

  const handleCompleteProfile = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("No hay sesión activa.");
      setLoading(false);
      return;
    }

    // 1. Guarda el nombre en tu tabla personalizada
    const { error: customerError } = await supabase
      .from("customers")
      .upsert({ user_id: user.id, name });

    if (customerError) {
      setMessage("Error al guardar el nombre.");
      setLoading(false);
      return;
    }

    // 2. Actualiza la contraseña del usuario en auth
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setMessage("Error al actualizar la contraseña.");
    } else {
      setMessage("Perfil completado con éxito.");
      setTimeout(() => navigate("/"), 2000); // o tu home/dashboard
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center font-sans px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-yellow-600">
          Completa tu perfil
        </h1>
        <p className="text-gray-500 text-sm">
          Ya casi terminas. Agrega tu nombre y elige una contraseña.
        </p>

        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border-2 border-yellow-200 rounded-full focus:outline-none"
        />

        <input
          type="password"
          placeholder="Contraseña nueva"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border-2 border-yellow-200 rounded-full focus:outline-none"
        />

        <button
          onClick={handleCompleteProfile}
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg w-full"
        >
          {loading ? "Guardando..." : "Guardar perfil"}
        </button>

        {message && <p className="text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
}

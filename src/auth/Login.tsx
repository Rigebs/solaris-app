import { useState } from "react";
import { supabase } from "../clients/supabaseClient";
import { FaCookieBite, FaEnvelope, FaLock } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Correo o contraseña incorrectos.");
    } else {
      setMessage("Inicio de sesión exitoso.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center font-sans px-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <FaCookieBite className="text-yellow-500 text-6xl animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-yellow-600">
          Bienvenida a Solaris
        </h1>
        <p className="text-gray-500">
          Inicia sesión para acumular vales dulces
        </p>

        <div className="flex items-center border-2 border-yellow-200 rounded-full overflow-hidden">
          <div className="px-3 text-yellow-400">
            <FaEnvelope />
          </div>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 focus:outline-none"
          />
        </div>

        <div className="flex items-center border-2 border-yellow-200 rounded-full overflow-hidden">
          <div className="px-3 text-yellow-400">
            <FaLock />
          </div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 focus:outline-none"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 w-full"
        >
          <MdLogin className="text-lg" />
          {loading ? "Ingresando..." : "Iniciar sesión"}
        </button>

        <button
          onClick={() => navigate("/auth/signup")}
          className="text-yellow-600 hover:underline text-sm"
        >
          ¿No tienes cuenta? Regístrate aquí
        </button>

        {message && <p className="text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}

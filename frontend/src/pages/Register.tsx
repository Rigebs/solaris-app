import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }

    if (password.length < 6) {
      showToast("La contraseña debe tener al menos 6 caracteres", "error");
      return;
    }

    try {
      setIsLoading(true);
      const ok = await register(name, email, password);

      if (!ok) {
        showToast("Ya existe una cuenta con ese correo", "error");
        return;
      }

      showToast("¡Cuenta creada exitosamente!", "success");
      nav("/cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-yellow-700 text-center">
        Crear cuenta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          required
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          required
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <input
          required
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-yellow-600 text-white w-full py-3 rounded-xl hover:bg-yellow-700 transition disabled:opacity-50 font-semibold"
        >
          {isLoading ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link
          to="/login"
          className="text-yellow-600 font-semibold hover:underline"
        >
          Inicia sesión aquí
        </Link>
      </div>

      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O continúa con</span>
        </div>
      </div>

      <div className="mt-6">
        <GoogleLoginButton />
      </div>
    </div>
  );
}

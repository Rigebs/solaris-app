import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Login() {
  const { login, redirectAfterLogin, setRedirectAfterLogin } = useAuth();
  const { showToast } = useToast();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const ok = await login(email, password);

      if (!ok) {
        showToast("Credenciales inválidas", "error");
        return;
      }

      // Redirigir a la página guardada o a cuenta por defecto
      const targetPath = redirectAfterLogin || "/cuenta";
      setRedirectAfterLogin(null);
      nav(targetPath);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-yellow-700 text-center">
        Iniciar sesión
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          disabled={isLoading}
          className="bg-yellow-600 text-white w-full py-3 rounded-xl hover:bg-yellow-700 transition disabled:opacity-50 font-semibold"
        >
          {isLoading ? "Ingresando..." : "Entrar"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link
          to="/register"
          className="text-yellow-600 font-semibold hover:underline"
        >
          Regístrate aquí
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

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Login() {
  const { login, redirectAfterLogin, setRedirectAfterLogin } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (!ok) setError("Credenciales inválidas");
    else {
      // Redirigir a la página guardada o a cuenta por defecto
      const targetPath = redirectAfterLogin || "/cuenta";
      setRedirectAfterLogin(null);
      nav(targetPath);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-700">Iniciar sesión</h1>
      <form onSubmit={handle} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        <input
          required
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-xl w-full"
        />
        <input
          required
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-xl w-full"
        />
        <button className="bg-pink-600 text-white w-full py-3 rounded-xl">
          Entrar
        </button>
        <div className="text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-pink-600">
            Regístrate
          </Link>
        </div>
      </form>
      <GoogleLoginButton />
    </div>
  );
}

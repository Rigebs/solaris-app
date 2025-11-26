import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register(name, email, password);
    if (!ok) setError("Ya existe una cuenta con ese correo");
    else nav("/cuenta");
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-pink-700">Crear cuenta</h1>
      <form onSubmit={handle} className=" space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        <input
          required
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-xl w-full"
        />
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
          Registrarme
        </button>
      </form>
      <GoogleLoginButton />
    </div>
  );
}

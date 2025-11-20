import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Account() {
  const { user, logout } = useAuth();

  if (!user)
    return (
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">Debes iniciar sesión</h2>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-pink-600 text-white px-4 py-2 rounded-xl"
          >
            Iniciar sesión
          </Link>
          <Link to="/register" className="border px-4 py-2 rounded-xl">
            Registrarse
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        Hola, {user.name}
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow">
        <p>
          <strong>Correo:</strong> {user.email}
        </p>
        <p className="mt-4">
          <strong>Acciones:</strong>
        </p>
        <div className="flex gap-3 mt-4">
          <Link
            to="/pedidos"
            className="bg-pink-600 text-white px-4 py-2 rounded-xl"
          >
            Mis pedidos
          </Link>
          <button onClick={logout} className="border px-4 py-2 rounded-xl">
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

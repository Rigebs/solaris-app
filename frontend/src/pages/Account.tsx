import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Account() {
  const { user, logout } = useAuth();

  if (!user)
    return (
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4 text-yellow-700">
          Debes iniciar sesión
        </h2>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="border border-yellow-600 text-yellow-600 px-4 py-2 rounded-xl hover:bg-yellow-50 transition"
          >
            Registrarse
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-yellow-700 mb-6">
        Hola, {user.name}
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow border border-yellow-100">
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 text-sm">Correo electrónico</p>
            <p className="text-lg font-semibold text-gray-800">{user.email}</p>
          </div>

          {user.address && (
            <div>
              <p className="text-gray-600 text-sm">Dirección</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.address}
              </p>
            </div>
          )}

          {user.phone && (
            <div>
              <p className="text-gray-600 text-sm">Teléfono</p>
              <p className="text-lg font-semibold text-gray-800">
                {user.phone}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-700 font-semibold mb-4">Acciones</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/pedidos"
              className="bg-yellow-600 text-white px-6 py-2 rounded-xl hover:bg-yellow-700 transition text-center"
            >
              Mis pedidos
            </Link>
            <button
              onClick={logout}
              className="border border-red-300 text-red-600 px-6 py-2 rounded-xl hover:bg-red-50 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

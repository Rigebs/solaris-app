import { Link } from "react-router-dom";
import { FiPackage, FiShoppingBag, FiFolder, FiSun } from "react-icons/fi";
import { useAdminStats } from "../../hooks";

export default function AdminDashboard() {
  const { stats, loading } = useAdminStats();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8 flex items-center gap-4">
        <FiSun className="text-yellow-600" size={48} />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Bienvenido al Panel de Administración
          </h1>
          <p className="text-gray-600 text-lg">
            Gestiona tu pastelería desde aquí
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <FiShoppingBag size={32} className="opacity-80" />
            <span className="text-3xl font-bold">
              {loading ? "..." : stats.products}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Productos</h3>
          <p className="text-blue-100 text-sm">Total en catálogo</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <FiFolder size={32} className="opacity-80" />
            <span className="text-3xl font-bold">
              {loading ? "..." : stats.categories}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Categorías</h3>
          <p className="text-purple-100 text-sm">Organizadas</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <FiPackage size={32} className="opacity-80" />
            <span className="text-3xl font-bold">
              {loading ? "..." : stats.orders}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-1">Pedidos</h3>
          <p className="text-green-100 text-sm">Total recibidos</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-2 border-transparent hover:border-yellow-400"
        >
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FiShoppingBag className="text-yellow-600" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Productos</h3>
          <p className="text-gray-600 mb-4">
            Gestiona tu catálogo de productos
          </p>
          <span className="text-yellow-600 font-medium group-hover:gap-2 flex items-center">
            Ir a productos
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </span>
        </Link>

        <Link
          to="/admin/categories"
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-2 border-transparent hover:border-blue-400"
        >
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FiFolder className="text-blue-600" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Categorías</h3>
          <p className="text-gray-600 mb-4">Organiza tus productos</p>
          <span className="text-blue-600 font-medium group-hover:gap-2 flex items-center">
            Ir a categorías
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </span>
        </Link>

        <Link
          to="/admin/orders"
          className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-8 border-2 border-transparent hover:border-green-400"
        >
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FiPackage className="text-green-600" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Pedidos</h3>
          <p className="text-gray-600 mb-4">
            Revisa los pedidos de tus clientes
          </p>
          <span className="text-green-600 font-medium group-hover:gap-2 flex items-center">
            Ver pedidos
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}

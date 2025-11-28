import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { FiHome, FiShoppingBag, FiFolder, FiPackage, FiSun, FiArrowLeft } from 'react-icons/fi';

export default function AdminLayout() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.is_superuser)) {
      navigate('/');
    }
  }, [isAuthenticated, user, isLoading, navigate]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="text-lg">Cargando...</div></div>;

  if (!isAuthenticated || !user?.is_superuser) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-40 hidden lg:block border-r border-yellow-200">
        <div className="p-6 border-b border-yellow-200 bg-gradient-to-r from-yellow-500 to-orange-500">
          <div className="flex items-center gap-2">
            <FiSun className="text-white" size={28} />
            <h1 className="text-2xl font-bold text-white">Solaris Admin</h1>
          </div>
          <p className="text-yellow-100 text-sm mt-1">Panel de Control</p>
        </div>
        <nav className="p-4 space-y-1">
          <Link 
            to="/admin/dashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700 hover:text-yellow-600 transition-all group"
          >
            <FiHome className="group-hover:scale-110 transition-transform" size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link 
            to="/admin/products" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700 hover:text-yellow-600 transition-all group"
          >
            <FiShoppingBag className="group-hover:scale-110 transition-transform" size={20} />
            <span className="font-medium">Productos</span>
          </Link>
          <Link 
            to="/admin/categories" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700 hover:text-yellow-600 transition-all group"
          >
            <FiFolder className="group-hover:scale-110 transition-transform" size={20} />
            <span className="font-medium">Categorías</span>
          </Link>
          <Link 
            to="/admin/orders" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-yellow-50 text-gray-700 hover:text-yellow-600 transition-all group"
          >
            <FiPackage className="group-hover:scale-110 transition-transform" size={20} />
            <span className="font-medium">Pedidos</span>
          </Link>
          <div className="pt-6 mt-6 border-t border-gray-200">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all"
            >
              <FiArrowLeft size={20} />
              <span className="text-sm">Volver a la tienda</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-30 border-b border-yellow-200">
          <div className="flex items-center gap-2">
            <FiSun className="text-yellow-600" size={24} />
            <span className="font-bold text-yellow-600">Solaris Admin</span>
          </div>
          <Link to="/" className="text-sm text-gray-600 hover:text-yellow-600 flex items-center gap-1">
            <FiArrowLeft size={16} />
            <span>Tienda</span>
          </Link>
        </header>

        {/* Mobile Nav */}
        <nav className="lg:hidden bg-white border-b border-yellow-200 p-3 flex gap-2 overflow-x-auto sticky top-16 z-20">
          <Link to="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-50 text-yellow-700 whitespace-nowrap text-sm font-medium">
            <FiHome size={16} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 whitespace-nowrap text-sm">
            <FiShoppingBag size={16} />
            <span>Productos</span>
          </Link>
          <Link to="/admin/categories" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 whitespace-nowrap text-sm">
            <FiFolder size={16} />
            <span>Categorías</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-yellow-50 text-gray-700 whitespace-nowrap text-sm">
            <FiPackage size={16} />
            <span>Pedidos</span>
          </Link>
        </nav>

        {/* Content */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

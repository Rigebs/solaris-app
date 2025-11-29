import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiPlus, FiShoppingBag } from "react-icons/fi";
import { useAdminProducts } from "../../hooks";
import { formatCurrencySimple } from "../../utils/currency";

export default function AdminProductList() {
  const { products, loading, deleteProduct } = useAdminProducts();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FiShoppingBag className="text-yellow-600" size={32} />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Productos</h2>
            <p className="text-gray-600 mt-1">
              Gestiona tu catálogo de productos
            </p>
          </div>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
        >
          <FiPlus size={20} />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-yellow-100"
          >
            {/* Product Image */}
            <div className="h-48 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FiShoppingBag className="text-yellow-600" size={64} />
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                  {product.name}
                </h3>
                <span className="text-yellow-600 font-bold text-lg">
                  {formatCurrencySimple(product.base_price)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {product.category_name || "Sin categoría"}
              </p>

              {product.description && (
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                  {product.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  <FiEdit2 size={16} />
                  <span className="hidden sm:inline">Editar</span>
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  <FiTrash2 size={16} />
                  <span className="hidden sm:inline">Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <FiShoppingBag className="text-gray-400 mx-auto mb-4" size={64} />
          <p className="text-gray-600 text-lg">No hay productos aún</p>
          <Link
            to="/admin/products/new"
            className="inline-block mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Crear el primer producto →
          </Link>
        </div>
      )}
    </div>
  );
}

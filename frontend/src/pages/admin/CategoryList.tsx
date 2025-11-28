import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiPlus, FiFolder } from 'react-icons/fi';
import { adminService } from '../../services/adminService';
import { getCategories } from '../../services/categoryService';
import type { Category } from '../../types/category';

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await adminService.deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error al eliminar categoría');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg text-gray-600">Cargando categorías...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <FiFolder className="text-yellow-600" size={32} />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Categorías</h2>
            <p className="text-gray-600 mt-1">Organiza tus productos por categorías</p>
          </div>
        </div>
        <Link 
          to="/admin/categories/new" 
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
        >
          <FiPlus size={20} />
          <span>Nueva Categoría</span>
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-yellow-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 rounded-lg">
                <FiFolder className="text-yellow-600" size={24} />
              </div>
              <span className="text-xs text-gray-500">#{category.id}</span>
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500 mb-4">/{category.slug}</p>

            {/* Actions */}
            <div className="flex gap-2">
              <Link 
                to={`/admin/categories/edit/${category.id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
              >
                <FiEdit2 size={14} />
                <span>Editar</span>
              </Link>
              <button 
                onClick={() => handleDelete(category.id)}
                className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors"
                title="Eliminar"
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <FiFolder className="text-gray-400 mx-auto mb-4" size={64} />
          <p className="text-gray-600 text-lg">No hay categorías aún</p>
          <Link 
            to="/admin/categories/new"
            className="inline-block mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
          >
            Crear la primera categoría →
          </Link>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminService } from "../../services/adminService";
import { getProductById } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import type { Category } from "../../types/category";
import { uploadImage } from "../../services/imageService";
import { FiUpload } from "react-icons/fi";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: "",
    base_price: 0,
    description: "",
    category_id: "",
    images: [] as string[],
    sizes: [] as any[],
    toppings: [] as string[],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const cats = await getCategories();
      setCategories(cats);

      if (isEditing) {
        const product = await getProductById(Number(id));
        setFormData({
          name: product.name,
          base_price: product.base_price,
          description: product.description || "",
          category_id: String(product.category_id),
          images: product.images || [],
          sizes: product.sizes || [],
          toppings: product.toppings || [],
        });
      }
    };
    loadData();
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        category_id: Number(formData.category_id),
        base_price: Number(formData.base_price),
      };

      if (isEditing) {
        await adminService.updateProduct(Number(id), payload);
      } else {
        await adminService.createProduct(payload);
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error al guardar producto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Editar Producto" : "Nuevo Producto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio Base
          </label>
          <input
            type="number"
            required
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2"
            value={formData.base_price}
            onChange={(e) =>
              setFormData({ ...formData, base_price: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2"
            value={formData.category_id}
            onChange={(e) =>
              setFormData({ ...formData, category_id: e.target.value })
            }
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 border p-2"
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* IMÁGENES DEL PRODUCTO */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imágenes del Producto
          </label>

          {/* Botón bonito para subir */}
          <label
            className={`
      flex items-center justify-center gap-2 border border-dashed border-gray-400 
      rounded-lg p-4 cursor-pointer hover:border-orange-500 hover:bg-orange-50
      transition-colors text-gray-600 font-medium
    `}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={async (e) => {
                if (!e.target.files) return;

                const files = Array.from(e.target.files);

                // nuevo estado separado
                setIsUploadingImages(true);

                for (const file of files) {
                  // evitar duplicados
                  const isDuplicate = formData.images.some((img) =>
                    img.includes(file.name)
                  );

                  if (isDuplicate) {
                    alert(`La imagen "${file.name}" ya fue agregada.`);
                    continue;
                  }

                  try {
                    const uploaded = await uploadImage(file);

                    setFormData((prev) => ({
                      ...prev,
                      images: [...prev.images, uploaded.url],
                    }));
                  } catch (err) {
                    console.error(err);
                    alert("Error subiendo imagen.");
                  }
                }

                setIsUploadingImages(false);
              }}
            />
            <FiUpload className="text-xl" />
            <span>
              {isUploadingImages
                ? "Subiendo imágenes..."
                : "Seleccionar imágenes"}
            </span>
          </label>

          {/* Loader debajo */}
          {isUploadingImages && (
            <div className="text-sm text-orange-600 mt-2 animate-pulse">
              Cargando imágenes...
            </div>
          )}

          {/* Vista previa */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {formData.images.map((imgUrl, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={imgUrl}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-sm border"
                />

                {/* Botón eliminar */}
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      images: prev.images.filter((i) => i !== imgUrl),
                    }))
                  }
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full 
                     px-2 py-1 text-xs opacity-0 group-hover:opacity-100 
                     transition-opacity shadow"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

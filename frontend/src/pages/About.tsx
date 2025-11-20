import { AiOutlineHeart, AiOutlineSmile, AiOutlineStar } from "react-icons/ai";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Título */}
      <h1 className="text-4xl font-bold text-pink-700 mb-6">Sobre Nosotros</h1>

      {/* Sección principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <img
          src="https://th.bing.com/th/id/R.379f7deab91c8be00c2766ce4e5df093?rik=FORhJKIBEsjR0g&pid=ImgRaw&r=0"
          alt="pastelería"
          className="rounded-3xl shadow-lg object-cover"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Postres hechos con dedicación
          </h2>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Solaris nació del amor por la repostería artesanal. Con recetas
            familiares, ingredientes frescos y un toque especial, buscamos
            endulzar los momentos más importantes de nuestros clientes.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Desde cheesecakes y tiramisú hasta postres personalizados, cada
            creación es preparada con cariño y atención al detalle.
          </p>
        </div>
      </div>

      {/* Iconos / Valores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-20">
        <div className="bg-white p-6 rounded-2xl shadow">
          <AiOutlineHeart size={40} className="text-pink-600 mx-auto" />
          <h3 className="text-xl font-semibold mt-3 text-gray-800">Pasión</h3>
          <p className="text-gray-600 mt-2">Cada postre está hecho con amor.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <AiOutlineStar size={40} className="text-pink-600 mx-auto" />
          <h3 className="text-xl font-semibold mt-3 text-gray-800">Calidad</h3>
          <p className="text-gray-600 mt-2">
            Ingredientes frescos y recetas artesanales.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <AiOutlineSmile size={40} className="text-pink-600 mx-auto" />
          <h3 className="text-xl font-semibold mt-3 text-gray-800">
            Clientes felices
          </h3>
          <p className="text-gray-600 mt-2">
            Nos encanta formar parte de tus momentos especiales.
          </p>
        </div>
      </div>

      {/* Llamado a acción */}
      <div className="text-center">
        <a
          href="/"
          className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition"
        >
          Ver catálogo de postres
        </a>
      </div>
    </div>
  );
}

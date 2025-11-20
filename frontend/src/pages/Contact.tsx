import { AiOutlineMail, AiOutlinePhone, AiFillInstagram } from "react-icons/ai";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-pink-700 mb-6">Contáctanos</h1>

      <p className="text-gray-600 mb-10">
        ¿Tienes un pedido especial o quieres saber más sobre nuestros postres?
        ¡Escríbenos! Estaremos felices de ayudarte 🍰✨
      </p>

      {/* Información */}
      <div className="bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Información directa
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <AiOutlineMail className="text-pink-600" size={26} />
            <span className="text-gray-700">correo@solaris.com</span>
          </div>

          <div className="flex items-center gap-3">
            <AiOutlinePhone className="text-pink-600" size={26} />
            <span className="text-gray-700">+51 999 999 999</span>
          </div>

          <div className="flex items-center gap-3">
            <AiFillInstagram className="text-pink-600" size={26} />
            <span className="text-gray-700">@solaris</span>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form className="bg-white p-6 rounded-2xl shadow grid grid-cols-1 gap-5">
        <h2 className="text-xl font-semibold text-gray-700">
          Envíanos un mensaje
        </h2>

        <input
          type="text"
          required
          placeholder="Tu nombre"
          className="border p-3 rounded-xl"
        />

        <input
          type="email"
          required
          placeholder="Tu correo"
          className="border p-3 rounded-xl"
        />

        <textarea
          required
          placeholder="Escribe tu mensaje..."
          rows={4}
          className="border p-3 rounded-xl resize-none"
        ></textarea>

        <button
          type="submit"
          className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}

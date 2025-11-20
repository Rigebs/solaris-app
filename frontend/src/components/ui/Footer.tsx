import { AiFillInstagram, AiFillFacebook, AiOutlineMail } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="mt-20 bg-pink-50 border-t border-pink-200 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-pink-700">Solaris</h2>
          <p className="mt-2 text-gray-600">
            Dulzura artesanal para tus momentos especiales.
          </p>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Síguenos</h3>
          <div className="flex gap-5 text-pink-600 mt-3">
            <a
              href="#"
              className="hover:text-pink-800 transition"
              aria-label="Instagram"
            >
              <AiFillInstagram size={28} />
            </a>

            <a
              href="#"
              className="hover:text-pink-800 transition"
              aria-label="Facebook"
            >
              <AiFillFacebook size={28} />
            </a>

            <a
              href="mailto:correo@ejemplo.com"
              className="hover:text-pink-800 transition"
              aria-label="Email"
            >
              <AiOutlineMail size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Solaris. Todos los derechos reservados.
      </div>
    </footer>
  );
}

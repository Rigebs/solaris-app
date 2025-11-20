import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden shadow-lg mb-10">
      <img
        src="https://aprende.com/wp-content/uploads/2020/10/pannacotta-postre-mas-rico-del-mundo-940x580.jpg"
        alt="postres"
        className="w-full h-[400px] object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="px-10 text-white max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
            Postres hechos con amor.
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Delicias artesanales para endulzar tus momentos más especiales.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl text-white font-semibold mt-6 shadow-lg transition"
          >
            Ver catálogo <AiOutlineArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

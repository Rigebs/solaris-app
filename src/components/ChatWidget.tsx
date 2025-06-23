import { useState } from "react";
import { FiX, FiMessageCircle } from "react-icons/fi";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Container */}
      {open && (
        <div
          className="fixed z-50 w-full h-full bg-white shadow-2xl border-none overflow-hidden
                     md:bottom-20 md:right-6 md:h-[500px] md:w-[350px] md:rounded-2xl md:border md:border-gray-300
                     top-0 left-0 md:top-auto md:left-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-yellow-500 text-white font-semibold md:rounded-t-2xl">
            <span>Soporte Solaris</span>
            <button onClick={() => setOpen(false)}>
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4 overflow-y-auto h-[calc(100%-60px)] text-sm text-gray-700">
            <p>👋 ¡Hola! ¿En qué podemos ayudarte hoy?</p>
            {/* Aquí puedes integrar un chat real o formulario */}
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!open && (
        <div className="fixed bottom-4 right-8 z-40">
          <div className="relative group flex flex-col items-start">
            {/* Texto + ícono alineado a la izquierda */}
            <div
              className="absolute -top-6 left-0 flex items-center gap-1
                         transition-all duration-300 group-hover:-top-10 group-hover:opacity-100 opacity-90
                         bg-white text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md"
            >
              <FiMessageCircle className="text-sm" />
              <span>Escríbenos</span>
            </div>

            {/* Botón con imagen */}
            <button
              onClick={() => setOpen(true)}
              className="w-40 h-40 rounded-2xl mt-2 bg-transparent overflow-hidden hover:scale-105 transition-transform duration-300 relative"
            >
              <img
                src="/solaris-icon.png"
                alt="Chat"
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import clsx from "clsx";
import MainLayout from "../layouts/MainLayout";

// Imágenes de prueba (puedes usar tus archivos locales o rutas públicas)
const availableStickers = [
  "/stickers/sticker1.jpg",
  "/stickers/sticker2.jpg",
  "/stickers/sticker3.jpg",
  "/stickers/sticker4.jpg",
  "/stickers/sticker5.jpg",
];

export default function UserProgress() {
  const trufasCompradas = 3;

  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [userStickers, setUserStickers] = useState<(string | null)[]>(
    Array(5).fill(null)
  );

  const handleAssignSticker = (index: number) => {
    if (index < trufasCompradas && selectedSticker) {
      const updated = [...userStickers];
      updated[index] = selectedSticker;
      setUserStickers(updated);
    }
  };

  return (
    <MainLayout email={null}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl shadow mb-8 w-full max-w-2xl mx-auto text-center">
            <p className="text-lg font-semibold">
              ¡Hola, Valentina! 🌟 Este es tu pase dulce. ¡Sigue disfrutando, tu
              descuento se acerca!
            </p>
          </div>

          <div className="flex gap-4 justify-center items-center flex-wrap">
            {Array.from({ length: 5 }).map((_, index) => {
              const isFilled = index < trufasCompradas;
              const isLastEmpty = index === 4 && !isFilled;

              return (
                <div
                  key={index}
                  onClick={() => handleAssignSticker(index)}
                  className={clsx(
                    "w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-300 cursor-pointer",
                    isFilled
                      ? "bg-yellow-400 shadow text-white hover:scale-105"
                      : "border-4 border-dashed border-gray-300 text-gray-300"
                  )}
                >
                  {isFilled ? (
                    userStickers[index] ? (
                      <img
                        src={userStickers[index]!}
                        alt="sticker"
                        className="w-20 h-20 rounded-full border-2 border-yellow-500"
                      />
                    ) : (
                      index + 1
                    )
                  ) : isLastEmpty ? (
                    <img
                      src="gift.svg"
                      alt="Regalo"
                      className="w-10 h-10 opacity-40"
                    />
                  ) : (
                    index + 1
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Sticker Selector */}
        <aside className="w-full lg:w-64 bg-yellow-100 p-4 rounded-xl shadow h-fit">
          <h3 className="text-lg font-bold mb-4 text-yellow-800">
            Elige tu sticker 🎨
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {availableStickers.map((src, idx) => {
              const isLocked = idx === 4 && trufasCompradas < 5;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (!isLocked) setSelectedSticker(src);
                  }}
                  className={clsx(
                    "w-14 h-14 p-1 border-2 rounded-lg cursor-pointer transition flex items-center justify-center",
                    selectedSticker === src
                      ? "border-yellow-500"
                      : "border-transparent hover:border-yellow-400",
                    isLocked && "cursor-not-allowed opacity-50"
                  )}
                >
                  {isLocked ? (
                    <span className="text-xl text-gray-500">?</span>
                  ) : (
                    <img
                      src={src}
                      alt={`sticker-${idx}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </MainLayout>
  );
}

import { useState, useRef, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: string[];
};

export default function ProductGallery({ images }: Props) {
  const [index, setIndex] = useState(0);
  const [lightOpen, setLightOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) =>
      (startX.current = e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => {
      if (startX.current === null) return;
      const diff = startX.current - e.changedTouches[0].clientX;
      if (diff > 40) next();
      if (diff < -40) prev();
      startX.current = null;
    };
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <>
      <div className="space-y-4">
        <div className="relative" ref={ref}>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow z-20"
            aria-label="Anterior"
          >
            <AiOutlineLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow z-20"
            aria-label="Siguiente"
          >
            <AiOutlineRight />
          </button>

          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`image-${index}`}
            className="w-full max-h-[520px] object-cover rounded-2xl cursor-zoom-in"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightOpen(true)}
          />
        </div>

        {/* thumbnails */}
        <div className="flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setIndex(i)}
              className={`rounded-lg overflow-hidden border-2 ${
                i === index ? "border-pink-600" : "border-transparent"
              } shrink-0`}
            >
              <img
                src={img}
                className="w-24 h-16 object-cover"
                alt={`thumb-${i}`}
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightOpen(false)}
          >
            <motion.img
              src={images[index]}
              className="max-h-[90vh] object-contain rounded-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

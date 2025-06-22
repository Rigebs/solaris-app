// components/Loader.tsx
export default function Loader() {
  return (
    <div className="absolute inset-0 z-50 bg-white/80 flex items-center justify-center">
      <img
        src="/sunflower.svg"
        alt="Cargando..."
        className="w-16 h-16 animate-[spin_2.5s_linear_infinite]"
      />
    </div>
  );
}

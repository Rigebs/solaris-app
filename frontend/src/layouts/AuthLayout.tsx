import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left image / background */}
      {/* Cambio: bg-pink-100 a bg-yellow-100 */}
      <div className="hidden lg:flex w-1/2 bg-yellow-100 items-center justify-center p-10">
        <img
          // Cambio: /auth-image.svg a /solaris-auth.webp
          src="/logos/solaris-auth.webp"
          alt="Login/Register Illustration"
          className="w-3/4 max-w-md drop-shadow-xl"
          // NOTA: Si necesitas quitar el margen de la imagen,
          // puedes ajustar la clase w-3/4 max-w-md o recortar la imagen original.
        />
      </div>

      {/* Right content */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/" className="text-3xl font-bold text-yellow-600">
              {/* Cambio: text-pink-600 a text-yellow-600 */}
              Solaris
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

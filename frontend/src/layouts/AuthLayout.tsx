import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left image / background */}
      <div className="hidden lg:flex w-1/2 bg-pink-100 items-center justify-center p-10">
        <img
          src="/auth-image.svg"
          alt="Postres"
          className="w-3/4 max-w-md drop-shadow-xl"
        />
      </div>

      {/* Right content */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link to="/" className="text-3xl font-bold text-pink-600">
              Solaris
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}

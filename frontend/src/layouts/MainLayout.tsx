import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Toast from "../components/ui/Toast";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-32 md:pt-24 pb-6">
        <Outlet />
      </main>

      <Footer />

      <Toast />
    </div>
  );
}

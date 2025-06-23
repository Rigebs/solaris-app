import { FaTicketAlt, FaRecycle, FaCookieBite } from "react-icons/fa";
import AdminLayout from "../layouts/AdminLayout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-600 mb-6">
        ¡Bienvenida de nuevo!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaCookieBite className="text-yellow-500 text-3xl" />
          <p className="mt-2 text-lg font-semibold text-gray-700">Trufas</p>
          <span className="text-2xl font-bold text-yellow-600">12</span>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaTicketAlt className="text-yellow-500 text-3xl" />
          <p className="mt-2 text-lg font-semibold text-gray-700">Vales</p>
          <span className="text-2xl font-bold text-yellow-600">2</span>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <FaRecycle className="text-yellow-500 text-3xl" />
          <p className="mt-2 text-lg font-semibold text-gray-700">Reusos</p>
          <span className="text-2xl font-bold text-yellow-600">5</span>
        </div>
      </div>
    </AdminLayout>
  );
}

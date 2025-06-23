import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { supabase } from "../clients/supabaseClient";
import clsx from "clsx";

const MAX_STICKERS = 5;

export default function AdminClientProgress() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("customers").select(`
          id,
          name,
          voucher_progress,
          vouchers (
            id,
            redeemed,
            voucher_stickers (
              position,
              sticker_url
            )
          )
        `);

      if (error) {
        console.error("Error fetching client data:", error);
        setLoading(false);
        return;
      }

      setClients(data || []);
      setLoading(false);
    };

    fetchClients();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold text-yellow-600 mb-6">
        Progreso de clientes
      </h2>

      {loading ? (
        <p className="text-yellow-700">Cargando progreso...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => {
            const activeVoucher = client.vouchers?.find(
              (v: any) => v.redeemed === false
            );

            const stickersArray = Array(MAX_STICKERS).fill(null);
            if (activeVoucher?.voucher_stickers) {
              activeVoucher.voucher_stickers.forEach((s: any) => {
                if (s.position < MAX_STICKERS) {
                  stickersArray[s.position] = s.sticker_url;
                }
              });
            }

            return (
              <div
                key={client.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
              >
                <h3 className="text-lg font-bold text-yellow-800 mb-2">
                  {client.name || "Cliente sin nombre"}
                </h3>
                <p className="text-gray-600 mb-2">
                  Trufas compradas:{" "}
                  <span className="text-yellow-700 font-semibold">
                    {client.voucher_progress}
                  </span>
                </p>

                <div className="flex gap-2 justify-center flex-wrap">
                  {Array.from({ length: MAX_STICKERS }).map((_, index) => {
                    const isFilled = index < client.voucher_progress;

                    return (
                      <div
                        key={index}
                        className={clsx(
                          "w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold",
                          isFilled
                            ? "bg-yellow-300 text-white"
                            : "border-2 border-dashed border-gray-300 text-gray-300"
                        )}
                      >
                        {stickersArray[index] ? (
                          <img
                            src={stickersArray[index]}
                            alt="sticker"
                            className="w-16 h-16 rounded-full border-2 border-yellow-500 object-cover"
                          />
                        ) : (
                          index + 1
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import clsx from "clsx";
import MainLayout from "../layouts/MainLayout";
import RewardModal from "../components/RewardModal";
import { useNavigate } from "react-router-dom";
import { supabase } from "../clients/supabaseClient";
import Loader from "../components/Loader";

const availableStickers = [
  "/stickers/sticker1.jpg",
  "/stickers/sticker2.jpg",
  "/stickers/sticker3.jpg",
  "/stickers/sticker4.jpg",
  "/stickers/sticker5.jpg", // Desbloqueable
];

export default function UserProgress() {
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [voucherId, setVoucherId] = useState<string | null>(null);
  const [userStickers, setUserStickers] = useState<(string | null)[]>(
    Array(5).fill(null)
  );
  const [showModal, setShowModal] = useState(false);
  const [trufasCompradas, setTrufasCompradas] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [loadingVoucherData, setLoadingVoucherData] = useState(true); // 👈 nuevo estado

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from("customers")
        .select("id, voucher_progress")
        .eq("user_id", userId)
        .single();

      if (error || !data) {
        console.error("Error obteniendo customer:", error);
        return;
      }

      setCustomerId(data.id);
      if (typeof data.voucher_progress === "number") {
        setTrufasCompradas(data.voucher_progress);
      }
    };

    fetchCustomer();
  }, [userId]);

  useEffect(() => {
    const alreadyShown = localStorage.getItem("valeMostrado") === "true";
    if (trufasCompradas >= 5 && !alreadyShown) {
      setShowModal(true);
    }
  }, [trufasCompradas]);

  useEffect(() => {
    const fetchVoucherAndStickers = async () => {
      if (!customerId) return;

      setLoadingVoucherData(true); // 👈 empezamos a cargar

      const { data: vouchers, error } = await supabase
        .from("vouchers")
        .select("id")
        .eq("customer_id", customerId)
        .eq("redeemed", false)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error || !vouchers || vouchers.length === 0) {
        console.error("❌ No hay vale activo o error:", error);
        setLoadingVoucherData(false); // 👈 incluso si hay error, terminamos de cargar
        return;
      }

      const voucher = vouchers[0];
      setVoucherId(voucher.id);

      const { data: stickers, error: stickersError } = await supabase
        .from("voucher_stickers")
        .select("position, sticker_url")
        .eq("voucher_id", voucher.id);

      if (stickersError) {
        console.error("❌ Error al obtener stickers:", stickersError);
        setLoadingVoucherData(false);
        return;
      }

      const stickerArr = Array(5).fill(null);
      stickers.forEach((s) => {
        stickerArr[s.position] = s.sticker_url;
      });
      setUserStickers(stickerArr);
      setLoadingVoucherData(false); // 👈 finalizamos la carga
    };

    fetchVoucherAndStickers();
  }, [customerId, trufasCompradas]);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("valeMostrado", "true");
  };

  const handleAssignSticker = async (index: number) => {
    if (!selectedSticker || index >= 5 || !voucherId) return;

    try {
      const { data: existing, error: fetchError } = await supabase
        .from("voucher_stickers")
        .select("id")
        .eq("voucher_id", voucherId)
        .eq("position", index)
        .maybeSingle();

      if (fetchError) {
        console.error("Error buscando sticker existente:", fetchError);
        return;
      }

      if (existing) {
        const { error: updateError } = await supabase
          .from("voucher_stickers")
          .update({ sticker_url: selectedSticker })
          .eq("id", existing.id);

        if (updateError) {
          console.error("Error actualizando sticker:", updateError);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from("voucher_stickers")
          .insert({
            voucher_id: voucherId,
            position: index,
            sticker_url: selectedSticker,
          });

        if (insertError) {
          console.error("Error insertando sticker:", insertError);
          return;
        }
      }

      const updated = [...userStickers];
      updated[index] = selectedSticker;
      setUserStickers(updated);
    } catch (e) {
      console.error("Error inesperado asignando sticker:", e);
    }
  };

  if (loadingVoucherData) return <Loader />;

  return (
    <MainLayout email={null}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {trufasCompradas >= 5 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-xl shadow mb-8 w-full max-w-2xl mx-auto text-center">
              <p className="text-lg font-semibold">
                ¡Hola, Valentina! 🌟 Has comprado {trufasCompradas} trufas y
                ganaste un vale de{" "}
                <span className="text-yellow-600 font-bold">
                  15% de descuento
                </span>
                . ¡Úsalo cuando quieras!
              </p>
            </div>
          )}

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

          {trufasCompradas >= 5 && (
            <button
              onClick={() => navigate("/usar-vale")}
              className="mt-6 mx-auto block border-2 border-yellow-500 text-yellow-600 px-6 py-3 rounded-xl text-lg font-semibold hover:bg-yellow-100 transition"
            >
              🎁 Usar vale de 15%
            </button>
          )}
        </div>

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

      {showModal && (
        <RewardModal
          unlockedSticker={availableStickers[4]}
          onClose={handleCloseModal}
        />
      )}
    </MainLayout>
  );
}

// src/pages/RegisterSale.tsx
import AdminLayout from "../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { supabase } from "../clients/supabaseClient";
import { FiTrash2 } from "react-icons/fi";

interface Customer {
  id: string;
  name: string;
  voucher_progress?: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  is_voucherable?: boolean;
  is_returnable?: boolean;
}

interface SaleItem {
  product_id: string;
  quantity: number;
  is_returned: boolean;
  usar_vale?: boolean;
}

export default function RegisterSale() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<SaleItem[]>([]);

  const [voucherDisponible, setVoucherDisponible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [customerRes, productRes] = await Promise.all([
        supabase
          .from("customers")
          .select("id, name, voucher_progress")
          .order("created_at", { ascending: false }),
        supabase
          .from("products")
          .select("id, name, price, is_voucherable, is_returnable")
          .order("created_at", { ascending: false }),
      ]);

      if (customerRes.data) {
        setCustomers(customerRes.data);
        const firstCustomer = customerRes.data[0];
        if (firstCustomer) {
          setSelectedCustomerId(firstCustomer.id);
          setVoucherDisponible((firstCustomer.voucher_progress ?? 0) >= 5);
        }
      }

      if (productRes.data) {
        setProducts(productRes.data);
        if (productRes.data.length > 0) {
          setItems([
            {
              product_id: productRes.data[0].id,
              quantity: 1,
              is_returned: false,
              usar_vale: false,
            },
          ]);
        }
      }
    };

    fetchData();
  }, []);

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        product_id: products[0]?.id || "",
        quantity: 1,
        is_returned: false,
        usar_vale: false,
      },
    ]);
  };

  const handleItemChange = <K extends keyof SaleItem>(
    index: number,
    field: K,
    value: SaleItem[K]
  ) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setItems(updated);
  };

  const handleValeSelection = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) => {
        const isSelected = i === index && item.usar_vale;
        return {
          ...item,
          usar_vale: voucherDisponible && !isSelected && i === index,
        };
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: saleData, error: saleError } = await supabase
      .from("sales")
      .insert([{ customer_id: selectedCustomerId, notes }])
      .select("id")
      .single();

    if (saleError || !saleData) {
      alert("Error al registrar la venta.");
      return;
    }

    const saleDetails = items.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      const basePrice = product?.price ?? 0;
      const isVoucherable = product?.is_voucherable;

      const finalPrice =
        item.usar_vale && voucherDisponible && isVoucherable
          ? Math.round(basePrice * 0.85)
          : basePrice;

      return {
        sale_id: saleData.id,
        product_id: item.product_id,
        quantity: item.quantity,
        is_returned: item.is_returned,
        price: finalPrice,
      };
    });

    const { error: detailsError } = await supabase
      .from("sale_details")
      .insert(saleDetails);

    if (detailsError) {
      alert("Error al guardar detalles de la venta.");
    } else {
      alert("Venta registrada con éxito ✔️");
      setItems([
        {
          product_id: products[0]?.id || "",
          quantity: 1,
          is_returned: false,
          usar_vale: false,
        },
      ]);
      setNotes("");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mb-6">
        <h2 className="text-3xl font-bold text-yellow-600">
          Registrar venta de trufas
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-6 max-w-3xl mx-auto"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Cliente
          </label>
          <select
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm transition"
            value={selectedCustomerId}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedCustomerId(id);
              const customer = customers.find((c) => c.id === id);
              setVoucherDisponible((customer?.voucher_progress ?? 0) >= 5);
              // resetear uso del vale
              setItems((prev) =>
                prev.map((item) => ({ ...item, usar_vale: false }))
              );
            }}
            required
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Trufas</h3>
          {items.map((item, index) => {
            const product = products.find((p) => p.id === item.product_id);
            const basePrice = product?.price ?? 0;
            const discountedPrice =
              item.usar_vale && voucherDisponible && product?.is_voucherable
                ? Math.round(basePrice * 0.85)
                : basePrice;

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-gray-50 p-4 pr-10 rounded-lg relative"
              >
                <select
                  className="w-full md:w-1/3 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm transition"
                  value={item.product_id}
                  onChange={(e) =>
                    handleItemChange(index, "product_id", e.target.value)
                  }
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="w-full md:w-1/4 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm transition"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                  placeholder="Cantidad"
                  required
                />

                {product?.is_returnable && (
                  <label className="flex items-center space-x-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-yellow-500"
                      checked={item.is_returned}
                      onChange={(e) =>
                        handleItemChange(index, "is_returned", e.target.checked)
                      }
                    />
                    <span>¿Devolvió la bolsita?</span>
                  </label>
                )}

                {voucherDisponible && product?.is_voucherable && (
                  <label className="flex items-center space-x-2 text-sm text-green-700">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-green-500"
                      checked={item.usar_vale || false}
                      onChange={() => handleValeSelection(index)}
                      disabled={
                        !item.usar_vale &&
                        items.some((it, i) => i !== index && it.usar_vale)
                      }
                    />
                    <span>Aplicar 15%</span>
                  </label>
                )}

                <p className="text-sm text-gray-600">
                  Precio:
                  <span className="block font-semibold text-gray-800">
                    S/. {discountedPrice}
                  </span>
                  {item.usar_vale && (
                    <span className="block text-green-600">(con 15% OFF)</span>
                  )}
                </p>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 transition"
                    title="Eliminar trufa"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={handleAddItem}
            className="text-sm text-yellow-600 font-medium hover:underline"
          >
            + Agregar otra trufa
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Notas
          </label>
          <textarea
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm transition"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-yellow-600"
        >
          Registrar venta
        </button>
      </form>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "../clients/supabaseClient";
import type { Customer, Product, SaleItem } from "../types/sale";

export function useRegisterSale() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<SaleItem[]>([]);
  const [voucherDisponible, setVoucherDisponible] = useState(false);
  const [saleConfirmed, setSaleConfirmed] = useState(false);

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

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleValeSelection = (index: number) => {
    setItems((prev) =>
      prev.map((item, i) => ({
        ...item,
        usar_vale: voucherDisponible && i === index && !item.usar_vale,
      }))
    );
  };

  const handleCustomerChange = (id: string) => {
    setSelectedCustomerId(id);
    const customer = customers.find((c) => c.id === id);
    setVoucherDisponible((customer?.voucher_progress ?? 0) >= 5);
    setItems((prev) => prev.map((item) => ({ ...item, usar_vale: false })));
  };

  const handleSubmit = async () => {
    const { data: saleData, error: saleError } = await supabase
      .from("sales")
      .insert([{ customer_id: selectedCustomerId, notes }])
      .select("id")
      .single();

    if (saleError || !saleData) {
      throw new Error("Error al registrar la venta.");
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
      throw new Error("Error al guardar detalles de la venta.");
    }

    // Detectar si se usó un vale en esta venta
    const valeUsado = items.some((item) => item.usar_vale);

    if (valeUsado) {
      // 1. Marcar el voucher como redimido
      await supabase
        .from("vouchers")
        .update({ redeemed: true })
        .eq("customer_id", selectedCustomerId)
        .eq("redeemed", false);

      // 2. Reiniciar el progreso del cliente
      await supabase
        .from("customers")
        .update({ voucher_progress: 0 })
        .eq("id", selectedCustomerId);

      // Tu trigger se encargará de crear un nuevo voucher automáticamente 💡
    }

    setSaleConfirmed(true);
    setTimeout(() => setSaleConfirmed(false), 3000);

    // Reset
    setItems([
      {
        product_id: products[0]?.id || "",
        quantity: 1,
        is_returned: false,
        usar_vale: false,
      },
    ]);
    setNotes("");

    // Actualizar estado del cliente localmente
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === selectedCustomerId ? { ...c, voucher_progress: 0 } : c
      )
    );
    setVoucherDisponible(false);
  };

  return {
    customers,
    products,
    selectedCustomerId,
    notes,
    items,
    voucherDisponible,
    saleConfirmed,
    setNotes,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleValeSelection,
    handleCustomerChange,
    handleSubmit,
  };
}

// pages/RegisterSale.tsx
import AdminLayout from "../layouts/AdminLayout";
import CustomerSelect from "../components/CustomerSelect";
import SaleItemRow from "../components/SaleItemRow";
import { useRegisterSale } from "../hooks/useRegisterSale";

export default function RegisterSale() {
  const {
    customers,
    products,
    selectedCustomerId,
    handleCustomerChange,
    notes,
    setNotes,
    items,
    voucherDisponible,
    saleConfirmed,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleValeSelection,
    handleSubmit,
  } = useRegisterSale();

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mb-6">
        <h2 className="text-3xl font-bold text-yellow-600">
          Registrar venta de trufas
        </h2>
      </div>

      {saleConfirmed && (
        <div className="max-w-3xl mx-auto mb-4">
          <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-xl text-center shadow-md transition-all animate-fade-in">
            ✅ ¡Venta registrada exitosamente!
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-6 max-w-3xl mx-auto"
      >
        <CustomerSelect
          customers={customers}
          selectedCustomerId={selectedCustomerId}
          onChange={handleCustomerChange}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Trufas</h3>

          {items.map((item, index) => (
            <SaleItemRow
              key={index}
              index={index}
              item={item}
              products={products}
              voucherDisponible={voucherDisponible}
              onChange={handleItemChange}
              onRemove={() => handleRemoveItem(index)}
              onSelectVoucher={() => handleValeSelection(index)}
              disableVoucherCheckbox={
                !item.usar_vale &&
                items.some((it, i) => i !== index && it.usar_vale)
              }
              showRemoveButton={items.length > 1}
            />
          ))}

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
            className="w-full p-3 rounded-xl border border-gray-300"
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

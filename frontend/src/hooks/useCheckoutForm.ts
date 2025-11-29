import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
import { useToast } from "../context/ToastContext";

interface CheckoutFormData {
  name: string;
  address: string;
  phone: string;
}

interface useCheckoutFormReturn {
  form: CheckoutFormData;
  setForm: (data: CheckoutFormData) => void;
  updateField: (field: keyof CheckoutFormData, value: string) => void;
  saveUserData: () => Promise<boolean>;
  isLoading: boolean;
}

export function useCheckoutForm(): useCheckoutFormReturn {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState<CheckoutFormData>({
    name: "",
    address: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Cargar datos del usuario al montar
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        address: user.address ?? "",
        phone: user.phone ?? "",
      });
    }
  }, [user]);

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveUserData = async (): Promise<boolean> => {
    if (!user) return false;

    // Si no hay cambios, retornar true
    if (
      form.name === user.name &&
      form.address === user.address &&
      form.phone === user.phone
    ) {
      return true;
    }

    try {
      setIsLoading(true);
      await userService.updateMe({
        name: form.name,
        address: form.address,
        phone: form.phone,
      });
      return true;
    } catch (error) {
      showToast("Error al actualizar datos", "error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { form, setForm, updateField, saveUserData, isLoading };
}

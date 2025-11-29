/**
 * Utilidades de validación para formularios y datos
 */

export const Validators = {
  /**
   * Valida un email
   */
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Valida una contraseña
   */
  password: (password: string): { valid: boolean; message?: string } => {
    if (password.length < 6) {
      return { valid: false, message: "Mínimo 6 caracteres" };
    }
    return { valid: true };
  },

  /**
   * Valida un nombre
   */
  name: (name: string): boolean => {
    return name.trim().length >= 2;
  },

  /**
   * Valida un teléfono
   */
  phone: (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]{7,}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Valida que dos valores sean iguales
   */
  match: (value1: string, value2: string): boolean => {
    return value1 === value2;
  },

  /**
   * Valida un número de teléfono colombiano
   */
  colombianPhone: (phone: string): boolean => {
    const colombianPhoneRegex = /^(\+57|57|0)?([1-8]{1})(\d{7}|\d{10})$/;
    return colombianPhoneRegex.test(phone.replace(/\s/g, ""));
  },
};

/**
 * Formatea y valida un teléfono colombiano
 */
export function formatColombianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("57")) {
    return cleaned.slice(2);
  }

  if (cleaned.startsWith("0")) {
    return cleaned.slice(1);
  }

  return cleaned;
}

/**
 * Valida que un carrito no esté vacío
 */
export function isCartValid(cart: any[]): boolean {
  return Array.isArray(cart) && cart.length > 0;
}

/**
 * Valida datos de checkout
 */
export function isCheckoutFormValid(form: {
  name: string;
  address: string;
  phone: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!Validators.name(form.name)) {
    errors.push("Nombre inválido");
  }

  if (!form.address || form.address.trim().length < 5) {
    errors.push("Dirección inválida");
  }

  if (!Validators.colombianPhone(form.phone)) {
    errors.push("Teléfono inválido");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

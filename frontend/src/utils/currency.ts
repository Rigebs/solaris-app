/**
 * Formatea un número como moneda en soles peruanos
 * @param value - Valor numérico a formatear
 * @param decimals - Cantidad de decimales (por defecto 2)
 * @returns Cadena formateada como "S/. 25.50"
 */
export const formatCurrency = (value: number, decimals: number = 2): string => {
  const formatted = value.toFixed(decimals);
  return `S/. ${formatted}`;
};

/**
 * Versión simplificada que redondea a 2 decimales (sin mostrar decimales si son .00)
 * @param value - Valor numérico a formatear
 * @returns Cadena formateada como "S/. 25" o "S/. 25.50"
 */
export const formatCurrencySimple = (value: number): string => {
  if (Math.floor(value) === value) {
    return `S/. ${Math.floor(value)}`;
  }
  return `S/. ${value.toFixed(2)}`;
};

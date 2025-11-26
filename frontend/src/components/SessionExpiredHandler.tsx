import { useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setSessionExpiredCallback } from "../lib/axios";

/**
 * Componente que maneja el callback cuando la sesión expira.
 * Muestra un toast elegante al usuario sin redirigir bruscamente.
 */
export default function SessionExpiredHandler() {
  const { showToast } = useToast();
  const { logout, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setSessionExpiredCallback(() => {
      // Limpiar usuario
      logout();

      // Guardar redirección a la página de cuenta para que vuelva después de login
      setRedirectAfterLogin("/cuenta");

      // Mostrar toast elegante
      showToast(
        "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
        "warning",
        5000
      );

      // Redirigir a login después de 1.5 segundos
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    });

    return () => {
      setSessionExpiredCallback(() => {});
    };
  }, [showToast, logout, navigate, setRedirectAfterLogin]);

  return null;
}

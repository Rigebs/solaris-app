import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: ProtectedRouteProps) {
  const { user, setRedirectAfterLogin } = useAuth();
  const location = useLocation();

  if (!user) {
    // Guardar la URL actual para redirigir después del login
    setRedirectAfterLogin(location.pathname + location.search);
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function PublicRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();

  // Si el usuario está logueado, redirige a home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

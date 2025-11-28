import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

export default function GoogleLoginButton() {
  const { loginWithGoogle, redirectAfterLogin, setRedirectAfterLogin, user } =
    useAuth();
  const { showToast } = useToast();
  const nav = useNavigate();
  const [loginPending, setLoginPending] = useState(false);

  useEffect(() => {
    // Si el login fue exitoso y el usuario está actualizado, redirigir
    if (loginPending && user) {
      const storedRedirect = localStorage.getItem("redirect_after_login");
      const targetPath = storedRedirect || redirectAfterLogin || "/cuenta";
      localStorage.removeItem("redirect_after_login");
      setRedirectAfterLogin(null);
      setLoginPending(false);
      nav(targetPath);
    }
  }, [user, loginPending, redirectAfterLogin, setRedirectAfterLogin, nav]);

  const handleSuccess = async (credentialResponse: any) => {
    const id_token = credentialResponse.credential;
    setLoginPending(true);
    const ok = await loginWithGoogle(id_token);

    if (!ok) {
      showToast("Error al iniciar sesión con Google", "error");
      setLoginPending(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O continúa con</span>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.log("Error en Google login")}
          theme="outline"
          size="large"
          text="signin_with"
          locale="es"
        />
      </div>
    </div>
  );
}

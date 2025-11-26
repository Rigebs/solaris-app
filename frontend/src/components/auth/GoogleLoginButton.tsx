import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function GoogleLoginButton() {
  const { loginWithGoogle } = useAuth();
  const nav = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    const id_token = credentialResponse.credential;
    const ok = await loginWithGoogle(id_token);

    if (ok) {
      nav("/cuenta");
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
        <div className="w-full max-w-xs">
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
    </div>
  );
}

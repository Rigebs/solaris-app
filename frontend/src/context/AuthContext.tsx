import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types/user";
import { api } from "../lib/axios";

type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (id_token: string) => Promise<boolean>;
  logout: () => void;
  redirectAfterLogin: string | null;
  setRedirectAfterLogin: (path: string | null) => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(
    () => localStorage.getItem("redirect_after_login")
  );

  // guarda usuario en localStorage
  useEffect(() => {
    localStorage.setItem("auth_user", JSON.stringify(user));
  }, [user]);

  // guarda redirect path en localStorage
  useEffect(() => {
    if (redirectAfterLogin) {
      localStorage.setItem("redirect_after_login", redirectAfterLogin);
    } else {
      localStorage.removeItem("redirect_after_login");
    }
  }, [redirectAfterLogin]);

  // ************* LOGIN NORMAL *************
  const login = async (email: string, password: string) => {
    try {
      const res = await api.post(
        "/auth/token",
        new URLSearchParams({
          username: email,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const { access_token, refresh_token } = res.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // cargar usuario desde backend
      const me = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      console.log(me);

      setUser(me.data);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // ************* REGISTRO REAL *************
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { access_token, refresh_token } = res.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      setUser(res.data.user);
      return true;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  // ************* LOGIN CON GOOGLE *************
  const loginWithGoogle = async (id_token: string) => {
    try {
      // 1️⃣ Enviar el token de Google al backend
      const res = await api.post("/auth/google", { id_token });

      // 2️⃣ Guardar access token y refresh token devueltos por backend
      const { access_token, refresh_token } = res.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      // 3️⃣ Llamar a /users/me para obtener el usuario
      const me = await api.get("/users/me"); // Axios ya tiene interceptor con token
      setUser(me.data);

      return true;
    } catch (error) {
      console.error("Google login error:", error);
      return false;
    }
  };

  // ************* LOGOUT *************
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        loginWithGoogle,
        logout,
        redirectAfterLogin,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

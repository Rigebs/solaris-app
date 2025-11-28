import axios, { AxiosError } from "axios";
import { API_URL } from "../config/api";

export const api = axios.create({
  baseURL: API_URL,
});

// Flag para evitar múltiples intentos de refresh simultáneos
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}> = [];

// Para manejo de sesión expirada
let onSessionExpired: (() => void) | null = null;

export const setSessionExpiredCallback = (callback: () => void) => {
  onSessionExpired = callback;
};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // Si es 401 y no es un reintento, intentar refrescar
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Si ya está refrescando, esperar en la cola
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          // Si no hay refresh token, el usuario nunca tuvo sesión
          // No disparar callback de "sesión expirada"
          throw new Error("No refresh token");
        }

        const res = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token: newRefreshToken } = res.data;
        localStorage.setItem("token", access_token);
        localStorage.setItem("refresh_token", newRefreshToken);

        api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        processQueue(null, access_token);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("auth_user");

        // Solo disparar callback si había refresh token (sesión expirada)
        // Si no había refresh token, es que el usuario nunca tuvo sesión
        const hadRefreshToken = localStorage.getItem("refresh_token") !== null;
        if (onSessionExpired && hadRefreshToken) {
          onSessionExpired();
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

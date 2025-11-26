import { useState, useEffect, useCallback } from "react";
import type { User, UserUpdate } from "../types/user";
import { userService } from "../services/userService";

export const useUsers = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userService.getMe();
      setUser(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al obtener usuario");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (updateData: UserUpdate) => {
    setLoading(true);
    try {
      const updated = await userService.updateMe(updateData);
      setUser(updated);
      setError(null);
      return updated;
    } catch (err: any) {
      setError(err.message || "Error al actualizar usuario");
      throw err; // lanzamos el error para que el componente pueda manejarlo
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, fetchUser, updateUser };
};

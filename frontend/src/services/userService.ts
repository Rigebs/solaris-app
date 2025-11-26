import { api } from "../lib/axios";
import type { User, UserUpdate } from "../types/user";

const getMe = async (): Promise<User> => {
  const { data } = await api.get(`/users/me`);
  return data;
};

const updateMe = async (updateData: UserUpdate): Promise<User> => {
  const { data } = await api.put(`/users/me`, updateData);
  return data;
};

export const userService = {
  getMe,
  updateMe,
};

import { api } from "../lib/axios";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
}

export async function deleteImage(publicId: string) {
  const res = await api.delete(`/images/${publicId}`);
  return res.data;
}

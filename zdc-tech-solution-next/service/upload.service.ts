import api from "./api";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteFile = async (public_id: string) => {
  const response = await api.delete("/upload", {
    data: { public_id },
  });

  return response.data;
};

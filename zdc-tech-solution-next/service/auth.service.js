import api from "./api";
import { request } from "./crud.service";

const saveToken = (data) => {
  if (typeof window !== "undefined" && data?.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

export const setupAdmin = async (data) => {
  try {
    return saveToken(await request(() => api.post("/auth/setup-admin", data)));
  } catch (error) {
    throw error;
  }
};

export const adminLogin = async (emailOrMobile, password) => {
  try {
    return saveToken(
      await request(() =>
        api.post("/auth/login/admin", { emailOrMobile, password }),
      ),
    );
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const data = await request(() => api.get("/auth/logout"));
    if (typeof window !== "undefined") localStorage.removeItem("token");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await request(() => api.get("/auth/me"));
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    return await request(() => api.put("/auth/profile", data));
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (data) => {
  try {
    return await request(() => api.put("/auth/password", data));
  } catch (error) {
    throw error;
  }
};

export default {
  setupAdmin,
  adminLogin,
  logout,
  getCurrentUser,
  updateProfile,
  updatePassword,
};

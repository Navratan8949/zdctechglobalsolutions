import api from "./api";
import { request } from "./crud.service";

export const getDatabaseBackup = async () => {
  try {
    return await request(() => api.get("/admin/backup"));
  } catch (error) {
    throw error;
  }
};

export default { getDatabaseBackup };

import api from "./api";
import { createCrudService, request } from "./crud.service";

const demoService = createCrudService("/demos");

export const getDemos = demoService.getAll;
export const getDemoById = demoService.getById;

export const getAllDemosAdmin = async () => {
  try {
    return await request(() => api.get("/demos/admin/all"));
  } catch (error) {
    throw error;
  }
};

export const createDemo = demoService.create;
export const updateDemo = demoService.update;
export const deleteDemo = demoService.remove;

export const seedDefaultDemos = async () => {
  try {
    return await request(() => api.post("/demos/seed"));
  } catch (error) {
    throw error;
  }
};

export default demoService;

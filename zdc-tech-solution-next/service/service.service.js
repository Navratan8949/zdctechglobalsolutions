import api from "./api";
import { createCrudService, request } from "./crud.service";

const serviceService = createCrudService("/services");

export const getServices = serviceService.getAll;
export const getServiceById = serviceService.getById;
export const getServiceBySlug = async (slug) => {
  try {
    return await request(() => api.get(`/services/slug/${slug}`));
  } catch (error) {
    throw error;
  }
};
export const createService = serviceService.create;
export const updateService = serviceService.update;
export const deleteService = serviceService.remove;
export default serviceService;

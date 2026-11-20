import api from "./api";
import { createCrudService, request } from "./crud.service";

const registrationCrudService = createCrudService("/registration-services");

export const getRegistrationServices = registrationCrudService.getAll;
export const getRegistrationServiceById = registrationCrudService.getById;

export const getRegistrationServiceBySlug = async (slug: string) => {
  try {
    return await request(() => api.get(`/registration-services/slug/${slug}`));
  } catch (error) {
    throw error;
  }
};

export const getAllRegistrationServicesAdmin = async () => {
  try {
    return await request(() => api.get("/registration-services/admin/all"));
  } catch (error) {
    throw error;
  }
};

export const createRegistrationService = registrationCrudService.create;
export const updateRegistrationService = registrationCrudService.update;
export const deleteRegistrationService = registrationCrudService.remove;

export const seedDefaultRegistrationServices = async () => {
  try {
    return await request(() => api.post("/registration-services/seed"));
  } catch (error) {
    throw error;
  }
};

export default registrationCrudService;


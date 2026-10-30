import api from "./api";
import { createCrudService, request } from "./crud.service";

const clientService = createCrudService("/clients");

export const getClients = clientService.getAll;
export const getClientById = clientService.getById;
export const createClient = clientService.create;
export const updateClient = clientService.update;
export const deleteClient = clientService.remove;

export const getClientsPageContent = async () => {
  try {
    return await request(() => api.get("/clients/page-content"));
  } catch (error) {
    throw error;
  }
};

export const updateClientsPageContent = async (data) => {
  try {
    return await request(() => api.put("/clients/page-content", data));
  } catch (error) {
    throw error;
  }
};

export default clientService;

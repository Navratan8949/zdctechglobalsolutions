import { createCrudService } from "./crud.service";

const clientService = createCrudService("/clients");

export const getClients = clientService.getAll;
export const getClientById = clientService.getById;
export const createClient = clientService.create;
export const updateClient = clientService.update;
export const deleteClient = clientService.remove;
export default clientService;

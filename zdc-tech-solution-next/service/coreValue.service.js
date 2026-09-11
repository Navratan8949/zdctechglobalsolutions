import { createCrudService } from "./crud.service";

const coreValueService = createCrudService("/core-values");

export const getCoreValues = coreValueService.getAll;
export const getCoreValueById = coreValueService.getById;
export const createCoreValue = coreValueService.create;
export const updateCoreValue = coreValueService.update;
export const deleteCoreValue = coreValueService.remove;
export default coreValueService;

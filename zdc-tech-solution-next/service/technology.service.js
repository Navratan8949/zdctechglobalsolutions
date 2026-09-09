import { createCrudService } from "./crud.service";

const technologyService = createCrudService("/technologies");

export const getTechnologies = technologyService.getAll;
export const getTechnologyById = technologyService.getById;
export const createTechnology = technologyService.create;
export const updateTechnology = technologyService.update;
export const deleteTechnology = technologyService.remove;
export default technologyService;

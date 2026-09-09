import { createCrudService } from "./crud.service";

const industryService = createCrudService("/industries");

export const getIndustries = industryService.getAll;
export const getIndustryById = industryService.getById;
export const createIndustry = industryService.create;
export const updateIndustry = industryService.update;
export const deleteIndustry = industryService.remove;
export default industryService;

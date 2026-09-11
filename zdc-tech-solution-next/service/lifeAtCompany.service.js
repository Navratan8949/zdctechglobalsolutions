import { createCrudService } from "./crud.service";

const lifeAtCompanyService = createCrudService("/life-at-company");

export const getLifeAtCompany = lifeAtCompanyService.getAll;
export const getLifeAtCompanyById = lifeAtCompanyService.getById;
export const createLifeAtCompany = lifeAtCompanyService.create;
export const updateLifeAtCompany = lifeAtCompanyService.update;
export const deleteLifeAtCompany = lifeAtCompanyService.remove;
export default lifeAtCompanyService;

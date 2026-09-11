import { createCrudService } from "./crud.service";

const statService = createCrudService("/stats");

export const getStats = statService.getAll;
export const getStatById = statService.getById;
export const createStat = statService.create;
export const updateStat = statService.update;
export const deleteStat = statService.remove;
export default statService;

import { createCrudService } from "./crud.service";

const processStepService = createCrudService("/process-steps");

export const getProcessSteps = processStepService.getAll;
export const getProcessStepById = processStepService.getById;
export const createProcessStep = processStepService.create;
export const updateProcessStep = processStepService.update;
export const deleteProcessStep = processStepService.remove;
export default processStepService;

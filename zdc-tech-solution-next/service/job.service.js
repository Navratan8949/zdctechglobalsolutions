import api from "./api";
import { createCrudService, request } from "./crud.service";

const jobService = createCrudService("/jobs");

export const getJobs = jobService.getAll;
export const getJobById = jobService.getById;
export const getJobBySlug = async (slug) => {
  try {
    return await request(() => api.get(`/jobs/slug/${slug}`));
  } catch (error) {
    throw error;
  }
};
export const createJob = jobService.create;
export const updateJob = jobService.update;
export const deleteJob = jobService.remove;
export default jobService;

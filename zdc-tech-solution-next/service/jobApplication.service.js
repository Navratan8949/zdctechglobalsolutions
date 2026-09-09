import api from "./api";
import { createCrudService, request } from "./crud.service";

const jobApplicationService = createCrudService("/job-applications");

export const submitJobApplication = jobApplicationService.create;
export const getJobApplications = jobApplicationService.getAll;
export const getJobApplicationById = jobApplicationService.getById;
export const updateJobApplication = jobApplicationService.update;
export const deleteJobApplication = jobApplicationService.remove;

export const submitJobApplicationWithResume = async (data) => {
  try {
    return await request(() => api.post("/job-applications", data));
  } catch (error) {
    throw error;
  }
};

export default jobApplicationService;

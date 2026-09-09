import api from "./api";
import { createCrudService, request } from "./crud.service";

const caseStudyService = createCrudService("/case-studies");

export const getCaseStudies = caseStudyService.getAll;
export const getCaseStudyById = caseStudyService.getById;
export const getCaseStudyBySlug = async (slug) => {
  try {
    return await request(() => api.get(`/case-studies/slug/${slug}`));
  } catch (error) {
    throw error;
  }
};
export const createCaseStudy = caseStudyService.create;
export const updateCaseStudy = caseStudyService.update;
export const deleteCaseStudy = caseStudyService.remove;
export default caseStudyService;

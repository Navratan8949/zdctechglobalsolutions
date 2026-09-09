import api from "./api";
import { createCrudService, request } from "./crud.service";

const siteContentService = createCrudService("/site-content");

export const getSiteContents = siteContentService.getAll;
export const getSiteContentById = siteContentService.getById;
export const getCurrentSiteContent = async () => {
  try {
    return await request(() => api.get("/site-content/current"));
  } catch (error) {
    throw error;
  }
};
export const createSiteContent = siteContentService.create;
export const updateSiteContent = siteContentService.update;
export const deleteSiteContent = siteContentService.remove;
export default siteContentService;

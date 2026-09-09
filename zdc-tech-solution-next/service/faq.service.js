import { createCrudService } from "./crud.service";

const faqService = createCrudService("/faqs");

export const getFaqs = faqService.getAll;
export const getFaqById = faqService.getById;
export const createFaq = faqService.create;
export const updateFaq = faqService.update;
export const deleteFaq = faqService.remove;
export default faqService;

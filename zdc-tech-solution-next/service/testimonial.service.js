import { createCrudService } from "./crud.service";

const testimonialService = createCrudService("/testimonials");

export const getTestimonials = testimonialService.getAll;
export const getTestimonialById = testimonialService.getById;
export const createTestimonial = testimonialService.create;
export const updateTestimonial = testimonialService.update;
export const deleteTestimonial = testimonialService.remove;
export default testimonialService;

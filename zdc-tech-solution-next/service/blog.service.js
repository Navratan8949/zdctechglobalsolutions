import api from "./api";
import { createCrudService, request } from "./crud.service";

const blogService = createCrudService("/blogs");

export const getBlogs = blogService.getAll;
export const getBlogById = blogService.getById;
export const getBlogBySlug = async (slug) => {
  try {
    return await request(() => api.get(`/blogs/slug/${slug}`));
  } catch (error) {
    throw error;
  }
};
export const createBlog = blogService.create;
export const updateBlog = blogService.update;
export const deleteBlog = blogService.remove;
export default blogService;

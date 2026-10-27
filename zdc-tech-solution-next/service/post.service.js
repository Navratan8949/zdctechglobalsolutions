import api from "./api";
import { createCrudService, request } from "./crud.service";

const postService = createCrudService("/posts");

export const getPosts = postService.getAll;
export const getPostById = postService.getById;
export const getPostBySlug = async (slug) => {
  try {
    return await request(() => api.get(`/posts/slug/${slug}`));
  } catch (error) {
    throw error;
  }
};
export const createPost = postService.create;
export const updatePost = postService.update;
export const deletePost = postService.remove;
export const likePost = async (id) => {
  try {
    return await request(() => api.post(`/posts/${id}/like`));
  } catch (error) {
    throw error;
  }
};

export default postService;

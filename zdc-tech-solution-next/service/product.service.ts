import api from "./api";
import { createCrudService, request } from "./crud.service";

const productService = createCrudService("/products");

export const getProducts = productService.getAll;
export const getProductById = productService.getById;

export const getProductBySlug = async (slug: string) => {
  try {
    return await request(() => api.get(`/products/slug/${slug}`));
  } catch (error) {
    throw error;
  }
};

export const getAllProductsAdmin = async () => {
  try {
    return await request(() => api.get("/products/admin/all"));
  } catch (error) {
    throw error;
  }
};

export const createProduct = productService.create;
export const updateProduct = productService.update;
export const deleteProduct = productService.remove;

export const seedDefaultProducts = async () => {
  try {
    return await request(() => api.post("/products/seed"));
  } catch (error) {
    throw error;
  }
};

export default productService;


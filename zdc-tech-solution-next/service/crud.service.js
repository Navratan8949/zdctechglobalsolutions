import api from "./api";

export const request = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCrudService = (resource) => ({
  getAll: async (params) => {
    try {
      return await request(() => api.get(resource, { params }));
    } catch (error) {
      throw error;
    }
  },
  getById: async (id) => {
    try {
      return await request(() => api.get(`${resource}/${id}`));
    } catch (error) {
      throw error;
    }
  },
  create: async (data) => {
    try {
      return await request(() => api.post(resource, data));
    } catch (error) {
      throw error;
    }
  },
  update: async (id, data) => {
    try {
      return await request(() => api.put(`${resource}/${id}`, data));
    } catch (error) {
      throw error;
    }
  },
  remove: async (id) => {
    try {
      return await request(() => api.delete(`${resource}/${id}`));
    } catch (error) {
      throw error;
    }
  },
});

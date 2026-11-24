import api from "./api";
import { request } from "./crud.service";

export interface SolarServiceItem {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  category:
    | "Residential Solar"
    | "Commercial & Industrial"
    | "Solar Maintenance & AMC"
    | "Agricultural Solar"
    | "Off-Grid Battery System"
    | "Other";
  badge: string;
  capacity?: string;
  shortDescription: string;
  fullDescription?: string;
  image: {
    public_id?: string;
    url: string;
  };
  fee?: string;
  subsidy?: string;
  features: string[];
  popular: boolean;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type SolarServicePayload = Omit<
  SolarServiceItem,
  "_id" | "id" | "createdAt" | "updatedAt"
>;

// Public endpoints
export const getAllSolarServices = async (category?: string) => {
  return request(() =>
    api.get("/solar-services", {
      params: category ? { category } : undefined,
    })
  );
};

export const getSolarServiceBySlug = async (slug: string) => {
  return request(() => api.get(`/solar-services/slug/${slug}`));
};

// Admin endpoints
export const getAllSolarServicesAdmin = async (params?: {
  category?: string;
  search?: string;
}) => {
  return request(() =>
    api.get("/solar-services/admin/all", {
      params,
    })
  );
};

export const createSolarService = async (data: SolarServicePayload) => {
  return request(() => api.post("/solar-services", data));
};

export const updateSolarService = async (
  id: string,
  data: Partial<SolarServicePayload>
) => {
  return request(() => api.put(`/solar-services/${id}`, data));
};

export const deleteSolarService = async (id: string) => {
  return request(() => api.delete(`/solar-services/${id}`));
};

export const seedDefaultSolarServices = async () => {
  return request(() => api.post("/solar-services/seed"));
};


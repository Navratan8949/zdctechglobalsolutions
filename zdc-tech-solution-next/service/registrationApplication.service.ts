import api from "./api";
import { request } from "./crud.service";

export interface RegistrationApplicationItem {
  _id: string;
  id?: string;
  name: string;
  phone: string;
  email: string;
  city?: string;
  serviceTitle: string;
  category?: "NGO Registration" | "Company Registration" | "Other";
  message?: string;
  status:
    | "pending"
    | "in_review"
    | "contacted"
    | "in_progress"
    | "completed"
    | "cancelled";
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApplicationSubmitPayload {
  name: string;
  phone: string;
  email: string;
  city?: string;
  serviceTitle: string;
  category?: string;
  message?: string;
}

// Public Submission
export const submitRegistrationApplication = async (
  data: ApplicationSubmitPayload
) => {
  return request(() => api.post("/registration-applications", data));
};

// Admin Endpoints
export const getAllRegistrationApplications = async (params?: {
  status?: string;
  category?: string;
  search?: string;
}) => {
  return request(() =>
    api.get("/registration-applications", {
      params,
    })
  );
};

export const getRegistrationApplicationById = async (id: string) => {
  return request(() => api.get(`/registration-applications/${id}`));
};

export const updateRegistrationApplication = async (
  id: string,
  data: {
    status?: string;
    adminNotes?: string;
  }
) => {
  return request(() => api.put(`/registration-applications/${id}`, data));
};

export const deleteRegistrationApplication = async (id: string) => {
  return request(() => api.delete(`/registration-applications/${id}`));
};


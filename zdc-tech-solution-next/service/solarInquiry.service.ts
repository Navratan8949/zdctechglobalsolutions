import api from "./api";
import { request } from "./crud.service";

export interface SolarInquiryItem {
  _id: string;
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  propertyType?:
    | "Residential Home"
    | "Commercial Building"
    | "Factory / Industrial"
    | "School / Hospital"
    | "Agriculture / Farm"
    | "Other";
  systemType?:
    | "On-Grid (Net Metering)"
    | "Off-Grid (Battery Backup)"
    | "Hybrid (Grid + Battery)"
    | "Not Sure / Need Advice";
  monthlyBill?: string;
  estimatedCapacity?: string;
  roofArea?: string;
  message?: string;
  status:
    | "new"
    | "survey_scheduled"
    | "quotation_sent"
    | "in_installation"
    | "completed"
    | "cancelled";
  adminNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SolarInquiryPayload {
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  state?: string;
  propertyType?: string;
  systemType?: string;
  monthlyBill?: string;
  estimatedCapacity?: string;
  roofArea?: string;
  message?: string;
}

// Public Lead Submission
export const submitSolarInquiry = async (data: SolarInquiryPayload) => {
  return request(() => api.post("/solar-inquiries", data));
};

// Admin Endpoints
export const getAllSolarInquiries = async (params?: {
  status?: string;
  propertyType?: string;
  search?: string;
}) => {
  return request(() =>
    api.get("/solar-inquiries", {
      params,
    })
  );
};

export const getSolarInquiryById = async (id: string) => {
  return request(() => api.get(`/solar-inquiries/${id}`));
};

export const updateSolarInquiry = async (
  id: string,
  data: {
    status?: string;
    adminNotes?: string;
  }
) => {
  return request(() => api.put(`/solar-inquiries/${id}`, data));
};

export const deleteSolarInquiry = async (id: string) => {
  return request(() => api.delete(`/solar-inquiries/${id}`));
};


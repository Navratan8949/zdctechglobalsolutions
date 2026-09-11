import api from "./api";
import { createCrudService, request } from "./crud.service";

export interface WhyChooseUsData {
  _id: string;
  title: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type CreateWhyChooseUsInput = Omit<
  WhyChooseUsData,
  "_id" | "createdAt" | "updatedAt"
>;
export type UpdateWhyChooseUsInput = Partial<CreateWhyChooseUsInput>;

const service = createCrudService("/why-choose-us");

export const getWhyChooseUs = service.getAll;
export const getWhyChooseUsById = service.getById;
export const createWhyChooseUs = service.create;
export const updateWhyChooseUs = service.update;
export const deleteWhyChooseUs = service.remove;


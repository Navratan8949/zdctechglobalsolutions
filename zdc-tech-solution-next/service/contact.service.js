import { createCrudService } from "./crud.service";

const contactService = createCrudService("/contact");

export const submitContact = contactService.create;
export const getContacts = contactService.getAll;
export const getContactById = contactService.getById;
export const updateContact = contactService.update;
export const deleteContact = contactService.remove;
export default contactService;

import { createCrudService } from "./crud.service";

const subscriberService = createCrudService("/subscribers");

export const subscribe = subscriberService.create;
export const getSubscribers = subscriberService.getAll;
export const getSubscriberById = subscriberService.getById;
export const updateSubscriber = subscriberService.update;
export const deleteSubscriber = subscriberService.remove;
export default subscriberService;

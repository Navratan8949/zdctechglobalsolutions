import { createCrudService } from "./crud.service";

const teamService = createCrudService("/team");

export const getTeamMembers = teamService.getAll;
export const getTeamMemberById = teamService.getById;
export const createTeamMember = teamService.create;
export const updateTeamMember = teamService.update;
export const deleteTeamMember = teamService.remove;
export default teamService;

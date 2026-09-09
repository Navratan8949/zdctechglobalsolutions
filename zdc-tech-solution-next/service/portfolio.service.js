import api from "./api";
import { createCrudService, request } from "./crud.service";

const portfolioService = createCrudService("/portfolios");

export const getPortfolios = portfolioService.getAll;
export const getPortfolioById = portfolioService.getById;
export const getPortfolioBySlug = async (slug) => {
  try {
    return await request(() => api.get(`/portfolios/slug/${slug}`));
  } catch (error) {
    throw error;
  }
};
export const createPortfolio = portfolioService.create;
export const updatePortfolio = portfolioService.update;
export const deletePortfolio = portfolioService.remove;
export default portfolioService;

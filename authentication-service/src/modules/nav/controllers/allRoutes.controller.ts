import { Request, Response } from "express";
import { allRoutesNav } from "../services/getAllNav";
import { API } from "@shared/index";

export const allRoutes = async (req: Request, res: Response): Promise<void> => {
  const getNav = await allRoutesNav();
  if (!getNav.success) {
    API.serverError(res, getNav.message, getNav.error);
    return;
  }
  API.success(res, getNav.message, getNav.data);
  return;
};

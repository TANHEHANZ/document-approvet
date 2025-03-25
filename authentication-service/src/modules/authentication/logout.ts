import { Request, Response } from "express";
import { API } from "../../infraestructure/CONSTANTS/permission";

export const logoutController = (req: Request, res: Response) => {
  try {
    return API.success(res, "Logout exitoso");
  } catch (error) {
    return API.serverError(res, "Error en logout", error);
  }
};

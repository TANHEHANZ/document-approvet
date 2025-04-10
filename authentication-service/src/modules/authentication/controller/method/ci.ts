import { Request, Response } from "express";
import { validateUser } from "../helper/validated";
import { Provider } from "@prisma/client";
import { API } from "@firma-gamc/shared";
import { handleValidationError } from "../helper/authErrorHandler";

export const authCi = async (req: Request, res: Response): Promise<void> => {
  try {
    const credentials = req.body;
    const validation = await validateUser(credentials, Provider.CI);
    const error = handleValidationError(validation);
    console.log(validation);
    if (error) {
      API.badRequest(res, error.message);
      return;
    }
    //  aca debemos manejar el token
    API.success(res, "Login successful", validation.user);
  } catch (error) {
    API.serverError(res, "Authentication failed", error);
  }
};

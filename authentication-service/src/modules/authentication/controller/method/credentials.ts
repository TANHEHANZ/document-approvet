import { API } from "@shared/index";
import { Request, Response } from "express";
import { validateUser } from "../helper/validated";
import { handleValidationError } from "../helper/authErrorHandler";
import { Provider } from "@prisma/client";

export const authCredential = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const credentials = req.body;
    const validation = await validateUser(credentials, Provider.CREDENTIALS);
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

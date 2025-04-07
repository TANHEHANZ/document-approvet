import { Request, Response } from "express";
import { API } from "@firma-gamc/shared";
import { AuthInput } from "document-approvet/authentication-service/src/infraestructure/models/auth.dto";
export const createdSeccion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body as AuthInput;
  API.success(res, "Inicio de secio9n correcto", data);
};

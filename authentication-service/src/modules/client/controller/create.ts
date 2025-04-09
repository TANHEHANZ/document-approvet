import { API } from "@shared/index";
import { Request, Response } from "express";

export const createClientOAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    API.success(res, "create client su");
  } catch (error) {
    API.serverError(res, "Server Error ");
  }
};

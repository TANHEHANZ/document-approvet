import { NextFunction, Request, Response } from "express";
import { reponseGoogle } from "../provider/googleStrategy";

import { API } from "@shared/index";
import { Provider } from "@prisma/client";
import { formatUser } from "../helper/format";

export const manageCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { profile, validation } = req.user as reponseGoogle;
  const state = JSON.parse(req.query.state as string);
  if (
    !validation.exists &&
    !validation.isActive &&
    !validation.isMethodActive
  ) {
    const newUser = await formatUser(
      { ...profile?._json, ip: state.ip },
      Provider.GOOGLE
    );
    API.success(res, "Inico de secion correcto ", newUser);
  }
  if (validation.exists) {
    API.success(res, "Usuario ya existente ", validation.user);
  }
};

import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { fromError } from "zod-validation-error";
import { API } from "../CONSTANTS";

type ValidateSource = "body" | "query" | "params";

export const validate = (
  schema: ZodSchema,
  source: ValidateSource = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await schema.parseAsync(req[source]);
      req[source] = data;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        return API.badRequest(
          res,
          "Validation failed",
          validationError.details
        );
      }
      return API.serverError(res, "Validation error", error);
    }
  };
};

import { Response } from "express";
import { HTTP_STATUS } from "../CONSTANTS/HTTP";
import { ApiResponse, PaginatedData } from "../interfaces/API.RESPONSE";
import { handlePrismaError } from "./prisma.errors";

export const API = {
  createResponse: <T>(
    res: Response,
    status: number,
    message: string,
    data?: T,
    errors?: any
  ): Response => {
    const response: ApiResponse<T> = {
      status,
      message,
      metadata: {
        timestamp: new Date().toISOString(),
        path: res.req.originalUrl,
      },
    };

    if (data) response.data = data;
    if (errors) response.errors = errors;

    return res.status(status).json(response);
  },

  success: <T>(res: Response, message: string, data?: T): Response =>
    API.createResponse(res, HTTP_STATUS.OK, message, data),

  created: <T>(res: Response, message: string, data?: T): Response =>
    API.createResponse(res, HTTP_STATUS.CREATED, message, data),

  paginated: <T>(
    res: Response,
    message: string,
    paginatedData: PaginatedData<T>
  ): Response =>
    API.createResponse(res, HTTP_STATUS.OK, message, paginatedData),

  badRequest: (res: Response, message: string, errors?: any): Response =>
    API.createResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      message,
      undefined,
      errors
    ),

  unauthorized: (res: Response, message: string = "Unauthorized"): Response =>
    API.createResponse(res, HTTP_STATUS.UNAUTHORIZED, message),

  forbidden: (res: Response, message: string = "Forbidden"): Response =>
    API.createResponse(res, HTTP_STATUS.FORBIDDEN, message),

  notFound: (res: Response, message: string = "Not Found"): Response =>
    API.createResponse(res, HTTP_STATUS.NOT_FOUND, message),

  conflict: (res: Response, message: string, errors?: any): Response =>
    API.createResponse(res, HTTP_STATUS.CONFLICT, message, undefined, errors),

  serverError: (
    res: Response,
    message: string = "Error en el servidor contactate con hancito :)",
    errors?: any
  ): Response => {
    const errorDetails = handlePrismaError(errors);
    console.error("Server Error:", errors);
    return API.createResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER,
      errorDetails.message,
      undefined,
      process.env.NODE_ENV === "development" ? errorDetails.details : undefined
    );
  },

  custom: <T>(
    res: Response,
    status: number,
    message: string,
    data?: T,
    errors?: any
  ): Response => API.createResponse(res, status, message, data, errors),
};

import {
  USER_MANAGEMENT,
  ROLE_MANAGEMENT,
  DOCUMENT_MANAGEMENT,
  API_ACCESS,
  SESSIONS,
  INTEGRATIONS,
  AUDIT,
} from "../../../../shared/config/permits";
import { STATUS } from "../../../../shared/config/status";
import { JWT_CONFIG } from "../../../../shared/CONSTANTS/JWT_CONFIG";
import { API } from "../../../../shared/config/response";
import { HTTP_STATUS } from "../../../../shared/CONSTANTS/HTTP";

export {
  USER_MANAGEMENT,
  ROLE_MANAGEMENT,
  DOCUMENT_MANAGEMENT,
  API_ACCESS,
  SESSIONS,
  INTEGRATIONS,
  AUDIT,
  JWT_CONFIG,
  HTTP_STATUS,
  STATUS,
  API,
};

export const PERMISSIONS = {
  USER_MANAGEMENT,
  ROLE_MANAGEMENT,
  DOCUMENT_MANAGEMENT,
  API_ACCESS,
  SESSIONS,
  INTEGRATIONS,
  AUDIT,
} as const;
export const SALT_ROUNDS = 10;
export type PermissionType = typeof PERMISSIONS;
export type PermissionKey = keyof typeof PERMISSIONS;

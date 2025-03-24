import {
  USER_MANAGEMENT,
  ROLE_MANAGEMENT,
  DOCUMENT_MANAGEMENT,
  API_ACCESS,
  SESSIONS,
  INTEGRATIONS,
  AUDIT,
} from "../../../../shared/config/permits";

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

export type PermissionType = typeof PERMISSIONS;
export type PermissionKey = keyof typeof PERMISSIONS;

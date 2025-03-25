import { AUDIT } from "./audit.permissions";
import { AUTH } from "./auth.permissions";
import { DOCUMENT } from "./document.permissions";
import { NOTIFICATION } from "./notification.permissions";
import { REPORT } from "./report.permissions";
import { SYSTEM } from "./system.permissions";
import { USER } from "./user.permissions";

export const PERMISSIONS = {
  AUTH,
  USER,
  DOCUMENT,
  SYSTEM,
  REPORT,
  NOTIFICATION,
  AUDIT,
} as const;

export type PermissionValue =
  | `${string}:${string}`
  | `${string}:${string}:${string}`;
export type Permission = PermissionValue | "*";

import { AUTH } from "./auth.permissions";
import { CLIENT } from "./client.permissions";
import { ROLE } from "./role.permissions";
import { SCOPE } from "./scope.permissioon";
import { USER } from "./user.permissions";

export const PERMISSIONS = {
  AUTH,
  USER,
  SCOPE,
  ROLE,
  CLIENT,
} as const;

export type PermissionValue =
  | `${string}:${string}`
  | `${string}:${string}:${string}`;
export type Permission = PermissionValue | "*";

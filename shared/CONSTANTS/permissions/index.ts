import { AUTH } from "./auth.permissions";
import { USER } from "./user.permissions";

export const PERMISSIONS = {
  AUTH,
  USER,
} as const;

export type PermissionValue =
  | `${string}:${string}`
  | `${string}:${string}:${string}`;
export type Permission = PermissionValue | "*";

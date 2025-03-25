import { PERMISSIONS } from "../permissions";

export const ROLES = {
  SUPERADMIN: {
    name: "SUPERADMIN",
    permissions: ["*"],
    description: "Full system access",
  },
  ADMIN: {
    name: "ADMIN",
    permissions: [
      PERMISSIONS.USER.ALL,
      PERMISSIONS.DOCUMENT.ALL,
      PERMISSIONS.REPORT.ALL,
      PERMISSIONS.AUTH.TOKEN.ASSIGN,
      PERMISSIONS.AUTH.TOKEN.REVOKE,
      PERMISSIONS.AUDIT.VIEW,
    ],
    description: "System administrator",
  },
  SUPERVISOR: {
    name: "SUPERVISOR",
    permissions: [
      PERMISSIONS.USER.READ,
      PERMISSIONS.DOCUMENT.READ,
      PERMISSIONS.DOCUMENT.VERIFY,
      PERMISSIONS.REPORT.READ,
      PERMISSIONS.REPORT.GENERATE,
      PERMISSIONS.AUDIT.VIEW,
    ],
    description: "System supervisor",
  },
  USER: {
    name: "USER",
    permissions: [
      PERMISSIONS.USER.SELF_MANAGE,
      PERMISSIONS.DOCUMENT.SIGN,
      PERMISSIONS.DOCUMENT.READ,
      PERMISSIONS.REPORT.READ,
    ],
    description: "Regular user",
  },
} as const;

export type Role = keyof typeof ROLES;

import { AUTH } from "../permissions/auth.permissions";
import { USER } from "../permissions/user.permissions";

export const DEFAULT_SCOPES = {
  openid: {
    name: "openid",
    description: "OpenID Connect authentication flow",
    permissions: [AUTH.LOGIN_CREDENTIALS, AUTH.LOGIN_GOOGLE, AUTH.LOGIN_CI],
  },
  profile: {
    name: "profile",
    description: "Read-only access to profile information",
    permissions: [USER.SELF_READ],
  },
  "profile.write": {
    name: "profile.write",
    description: "Full access to profile management",
    permissions: [USER.SELF_READ, USER.SELF_UPDATE, USER.SELF_MANAGE],
  },
  user: {
    name: "user",
    description: "Basic user information access",
    permissions: [USER.READ],
  },
  "user.write": {
    name: "user.write",
    description: "Full user management capabilities",
    permissions: [
      USER.CREATE,
      USER.READ,
      USER.UPDATE,
      USER.DELETE,
      USER.ACTIVATE,
      USER.DEACTIVATE,
    ],
  },
  "user.admin": {
    name: "user.admin",
    description: "Administrative access to user management",
    permissions: [USER.ALL, USER.MANAGE_PERMISSIONS],
  },
} as const;

export type DefaultScope = keyof typeof DEFAULT_SCOPES;

export const AUTH = {
  LOGIN: "auth:login",
  LOGOUT: "auth:logout",
  RESET_PASSWORD: "auth:reset_password",
  CHANGE_PASSWORD: "auth:change_password",
  TOKEN: {
    GENERATE: "auth:token:generate",
    VALIDATE: "auth:token:validate",
    REVOKE: "auth:token:revoke",
    ASSIGN: "auth:token:assign",
    UNASSIGN: "auth:token:unassign",
    VIEW: "auth:token:view",
  },
} as const;

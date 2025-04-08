export const USER = {
  CREATE: "user:create",
  READ: "user:read",
  UPDATE: "user:update",
  DELETE: "user:delete",

  ACTIVATE: "user:activate",
  DEACTIVATE: "user:deactivate",

  MANAGE_PERMISSIONS: "user:manage:permissions",

  SELF_MANAGE: "user:self:manage",
  SELF_UPDATE: "user:self:update",
  SELF_READ: "user:self:read",

  ALL: "user:*",
} as const;

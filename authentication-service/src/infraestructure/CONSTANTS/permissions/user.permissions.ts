export const USER = {
  CREATE: "user:create",
  READ: "user:read",
  UPDATE: "user:update",
  DELETE: "user:delete",

  ACTIVATE: "user:activate",
  DEACTIVATE: "user:deactivate",

  ASSIGN_SYSTEM: "user:assign:system",
  REMOVE_SYSTEM: "user:remove:system",

  MANAGE_PERMISSIONS: "user:manage:permissions",

  SELF_MANAGE: "user:self:manage",
  SELF_UPDATE: "user:self:update",
  SELF_READ: "user:self:read",

  MANAGE_TOKENS: "user:manage:tokens",
  ASSIGN_TOKEN: "user:assign:token",
  REVOKE_TOKEN: "user:revoke:token",

  ALL: "user:*",
} as const;

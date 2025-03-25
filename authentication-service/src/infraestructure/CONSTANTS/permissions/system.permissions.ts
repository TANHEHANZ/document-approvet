export const SYSTEM = {
  CREATE: "system:create",
  READ: "system:read",
  UPDATE: "system:update",
  DELETE: "system:delete",
  GRANT: "system:grant",
  REVOKE: "system:revoke",
  MANAGE_WEBHOOKS: "system:webhooks",
  ALL: "system:*",
} as const;

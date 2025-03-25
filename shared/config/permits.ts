export const AUTH_MANAGEMENT = {
  AUTH_LOGIN: "auth:login",
  AUTH_LOGOUT: "auth:logout",
  AUTH_RESET_PASSWORD: "auth:reset_password",
  AUTH_CHANGE_PASSWORD: "auth:change_password",

  // Token Management
  TOKEN_GENERATE: "token:generate",
  TOKEN_VALIDATE: "token:validate",
  TOKEN_REVOKE: "token:revoke",
  TOKEN_ASSIGN: "token:assign",
  TOKEN_UNASSIGN: "token:unassign",
  TOKEN_VIEW: "token:view",
} as const;

export const USER_MANAGEMENT = {
  USER_CREATE: "user:create",
  USER_READ: "user:read",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",

  // Advanced User Management
  USER_ACTIVATE: "user:activate",
  USER_DEACTIVATE: "user:deactivate",
  USER_ASSIGN_SYSTEM: "user:assign_system",
  USER_REMOVE_SYSTEM: "user:remove_system",
  USER_MANAGE_PERMISSIONS: "user:manage_permissions",

  // Self Management
  USER_MANAGE_SELF: "user:manage_self",
} as const;

// System Integration
export const SYSTEM_MANAGEMENT = {
  // System Registration
  SYSTEM_REGISTER: "system:register",
  SYSTEM_UPDATE: "system:update",
  SYSTEM_DELETE: "system:delete",
  SYSTEM_VIEW: "system:view",

  // System Access
  SYSTEM_GRANT_ACCESS: "system:grant_access",
  SYSTEM_REVOKE_ACCESS: "system:revoke_access",
  SYSTEM_MANAGE_WEBHOOKS: "system:manage_webhooks",
} as const;

// Document Management
export const DOCUMENT_MANAGEMENT = {
  // Basic Operations
  DOCUMENT_CREATE: "document:create",
  DOCUMENT_READ: "document:read",
  DOCUMENT_UPDATE: "document:update",
  DOCUMENT_DELETE: "document:delete",

  // Signature Operations
  DOCUMENT_SIGN: "document:sign",
  DOCUMENT_VERIFY_SIGNATURE: "document:verify_signature",
  DOCUMENT_REVOKE_SIGNATURE: "document:revoke_signature",

  // Document Sharing
  DOCUMENT_SHARE: "document:share",
  DOCUMENT_UNSHARE: "document:unshare",
} as const;

// Report Management
export const REPORT_MANAGEMENT = {
  // Report Operations
  REPORT_CREATE: "report:create",
  REPORT_READ: "report:read",
  REPORT_UPDATE: "report:update",
  REPORT_DELETE: "report:delete",

  // Report Assignment
  REPORT_ASSIGN: "report:assign",
  REPORT_UNASSIGN: "report:unassign",

  // Report Generation
  REPORT_GENERATE: "report:generate",
  REPORT_EXPORT: "report:export",
} as const;

// Notification Management
export const NOTIFICATION_MANAGEMENT = {
  NOTIFICATION_SEND: "notification:send",
  NOTIFICATION_READ: "notification:read",
  NOTIFICATION_MANAGE: "notification:manage",
} as const;

// Audit Management
export const AUDIT_MANAGEMENT = {
  AUDIT_VIEW: "audit:view",
  AUDIT_EXPORT: "audit:export",
  AUDIT_SYSTEM_LOGS: "audit:system_logs",
  AUDIT_USER_LOGS: "audit:user_logs",
} as const;

// Role-based permission sets

// Helper type for type-safety
export type Permission =
  | (typeof AUTH_MANAGEMENT)[keyof typeof AUTH_MANAGEMENT]
  | (typeof USER_MANAGEMENT)[keyof typeof USER_MANAGEMENT]
  | (typeof SYSTEM_MANAGEMENT)[keyof typeof SYSTEM_MANAGEMENT]
  | (typeof DOCUMENT_MANAGEMENT)[keyof typeof DOCUMENT_MANAGEMENT]
  | (typeof REPORT_MANAGEMENT)[keyof typeof REPORT_MANAGEMENT]
  | (typeof NOTIFICATION_MANAGEMENT)[keyof typeof NOTIFICATION_MANAGEMENT]
  | (typeof AUDIT_MANAGEMENT)[keyof typeof AUDIT_MANAGEMENT];

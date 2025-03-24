export const TOPICS = {
  DOCUMENT: {
    CREATED: "document.created",
    SIGNED: "document.signed",
    APPROVED: "document.approved",
    REJECTED: "document.rejected",
  },
  USER: {
    CREATED: "user.created",
    UPDATED: "user.updated",
    DELETED: "user.deleted",
  },
  AUDIT: {
    LOG: "audit.log",
    ALERT: "audit.alert",
  },
} as const;

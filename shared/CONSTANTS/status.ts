export const STATUS = [
  {
    status: "ACTIVE",
    color: "#4CAF50",
  },
  {
    status: "INACTIVE",
    color: "#F44336",
  },
  {
    status: "PENDING",
    color: "#FFC107",
  },
  {
    status: "BLOCKED",
    color: "#9E9E9E",
  },
  {
    status: "DELETED",
    color: "#000000",
  },
  {
    status: "SUSPENDED",
    color: "#FF9800",
  },
  {
    status: "LOCKED",
    color: "#795548",
  },
  {
    status: "EXPIRED",
    color: "#607D8B",
  },
  {
    status: "REQUIRES_VERIFICATION",
    color: "#2196F3",
  },
  {
    status: "UNDER_REVIEW",
    color: "#9C27B0",
  },
] as const;

export type StatusType = (typeof STATUS)[number]["status"];

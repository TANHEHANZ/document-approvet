// import { PERMISSIONS } from "./index";
// import { ROLES } from "../roles";
// import { Permission, Role } from "@prisma/client";

// export const hasPermission = (
//   userRole: Role,
//   permission: Permission
// ): boolean => {
//   if (userRole === "SUPERADMIN") return true;

//   const rolePermissions = ROLES[userRole].permissions;
//   return rolePermissions.includes(permission);
// };

// export const getRolePermissions = (role: Role): Permission[] => {
//   return ROLES[role].permissions;
// };

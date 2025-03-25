// import { PERMISSIONS } from "./permissions";
// import { ROLES } from "./roles";
// import { Permission } from "./permissions";
// import { Role } from "./roles";

// export const hasPermission = (
//   userRole: Role,
//   permission: Permission,
//   additionalPermissions: string[] = []
// ): boolean => {
//   if (userRole === "SUPERADMIN") return true;

//   const rolePermissions = ROLES[userRole].permissions;
//   return rolePermissions.includes(permission) || additionalPermissions.includes(permission);
// };

// export const getRolePermissions = (role: Role): Permission[] => {
//   return ROLES[role].permissions;
// };

// export const validatePermission = (permission: string): permission is Permission => {
//   const allPermissions = Object.values(PERMISSIONS)
//     .flatMap(domain =>
//       typeof domain === 'object'
//         ? Object.values(domain)
//         : []
//     );
//   return allPermissions.includes(permission as Permission);
// };

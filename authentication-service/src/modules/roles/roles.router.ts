import { Router } from "express";
import { validate } from "../../infraestructure/midlweware/validated";
import {
  CreateRoleSchema,
  RolePermissionSchema,
} from "../../infraestructure/models/role.dto";
import { createRole } from "./controller/create-rol";
import { assignRole } from "./controller/assign-role";
import { getRoleAll } from "./controller/list-rol";
import { updateRolePermissions } from "./controller/update-assign-role";
import { removeRolePermissions } from "./controller/remove-assign-role";
import { allPermissions } from "./controller/allPermissions";
import { checkPermission } from "@/infraestructure/midlweware/check-permission";
import { PERMISSIONS } from "@shared/index";
import { authMiddleware } from "@/infraestructure/midlweware/authentication";

const rolRouter = Router();
rolRouter.use(authMiddleware);
rolRouter.post(
  "/",
  validate(CreateRoleSchema),
  checkPermission(PERMISSIONS.ROLE.CREATE),
  createRole
);
rolRouter.get("/", checkPermission(PERMISSIONS.ROLE.READ), getRoleAll);

rolRouter
  .route("/permissions")
  .get(allPermissions, checkPermission(PERMISSIONS.ROLE.READ))
  .post(
    validate(RolePermissionSchema),
    checkPermission(PERMISSIONS.ROLE.ASSIGN),
    assignRole
  )
  .put(
    validate(RolePermissionSchema),
    checkPermission(PERMISSIONS.ROLE.UPDATE),
    updateRolePermissions
  )
  .delete(
    validate(RolePermissionSchema),
    checkPermission(PERMISSIONS.ROLE.DELETE),
    removeRolePermissions
  );

export default rolRouter;

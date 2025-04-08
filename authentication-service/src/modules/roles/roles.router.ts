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

const rolRouter = Router();

rolRouter.post("/", validate(CreateRoleSchema), createRole);
rolRouter.get("/", getRoleAll);

rolRouter
  .route("/permissions")
  .get(allPermissions)
  .post(validate(RolePermissionSchema), assignRole)
  .put(validate(RolePermissionSchema), updateRolePermissions)
  .delete(validate(RolePermissionSchema), removeRolePermissions);

export default rolRouter;

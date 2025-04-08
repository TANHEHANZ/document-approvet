import { Router } from "express";
import { validate } from "../../infraestructure/midlweware/validated";
import { createRole } from "./controller/create-rol";
import {
  AssignMultiplePermissionsSchema,
  CreateRoleSchema,
} from "../../infraestructure/models/role.dto";
import { assignRole } from "./controller/assign-role";
import { getRoleAll } from "./controller/list-rol";

const rolRouter = Router();

rolRouter.post("/create", validate(CreateRoleSchema), createRole);
rolRouter.post(
  "/assign-rol-permission",
  validate(AssignMultiplePermissionsSchema),
  assignRole
);
rolRouter.get("/all", getRoleAll);
export default rolRouter;

import { Router } from "express";
import { validate } from "../../infraestructure/midlweware/validated";
import { createRole } from "./controller/create-rol";
import { RoleSchema } from "../../infraestructure/models/role.dto";
import { assignRole } from "./controller/assign-rol-to-user";
import { AssignRolesSchema } from "../../infraestructure/models/user-role.dto";
import { getRoleAll } from "./controller/list-rol";

const rolRouter = Router();

rolRouter.post("/create", validate(RoleSchema), createRole);
rolRouter.post("/assign", validate(AssignRolesSchema), assignRole);
rolRouter.get("/", validate(AssignRolesSchema), getRoleAll);

export default rolRouter;

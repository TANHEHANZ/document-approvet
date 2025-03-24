import { Router } from "express";
import { assignPerm } from "./controller/assign-permission-to-rol";
import { validate } from "../../infraestructure/midlweware/validated";
import { AssignPermissionsSchema } from "../../infraestructure/models/role-permission.dto";

const permssRouter = Router();

permssRouter.post("/assig", validate(AssignPermissionsSchema), assignPerm);

export default permssRouter;

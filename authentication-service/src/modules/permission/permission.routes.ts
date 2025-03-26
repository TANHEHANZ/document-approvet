import { Router } from "express";
import { assignPerm } from "./controller/assign-to-user";
import { validate } from "../../infraestructure/midlweware/validated";

const permssRouter = Router();

permssRouter.post("/assig", assignPerm);

export default permssRouter;

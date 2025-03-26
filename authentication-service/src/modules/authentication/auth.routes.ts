import { Router } from "express";
import { createdSeccion } from "./auth";
const authRouter = Router();
authRouter.post("/", createdSeccion);

export default authRouter;

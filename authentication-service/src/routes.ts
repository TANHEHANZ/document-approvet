import { Router } from "express";
import rolRouter from "./modules/roles/roles.router";

const auth = Router();
auth.use("/rol", rolRouter);

export default auth;

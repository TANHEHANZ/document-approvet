import { Router } from "express";
import userRouter from "./modules/users/user.router";
import rolRouter from "./modules/roles/roles.router";
import permssRouter from "./modules/permission/permission.routes";

const auth = Router();
auth.use("/user", userRouter);
auth.use("/rols", rolRouter);
auth.use("/permissions", permssRouter);

export default auth;

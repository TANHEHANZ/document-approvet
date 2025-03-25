import { Router } from "express";
import userRouter from "./modules/users/user.router";
import permssRouter from "./modules/permission/permission.routes";
import { authMiddleware } from "./infraestructure/midlweware/authentication";

const auth = Router();
auth
  .use(authMiddleware)
  .use("/user", userRouter)
  .use("/permission", permssRouter);

export default auth;

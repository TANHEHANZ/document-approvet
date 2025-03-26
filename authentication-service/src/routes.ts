import { Router } from "express";
import userRouter from "./modules/users/user.router";
import permssRouter from "./modules/permission/permission.routes";
import { authMiddleware } from "./infraestructure/midlweware/authentication";
import authRouter from "./modules/authentication/auth.routes";

const auth = Router();
auth
  .use("/auth", authRouter)
  .use(authMiddleware)
  .use("/user", userRouter)
  .use("/permission", permssRouter);

export default auth;

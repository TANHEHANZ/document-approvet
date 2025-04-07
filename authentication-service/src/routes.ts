import { Router } from "express";
import userRouter from "./modules/users/user.router";
import permssRouter from "./modules/permission/permission.routes";
import { authMiddleware } from "./infraestructure/midlweware/authentication";
import authRouter from "./modules/authentication/routes.auth";

const auth = Router();
auth.use("/auth", authRouter);

export default auth;

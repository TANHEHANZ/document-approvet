import { Router } from "express";
import rolRouter from "./modules/roles/roles.router";
import userRouter from "./modules/users/user.router";
import authRouter from "./modules/authentication/routes.auth";
import scopeRoute from "./modules/scope/scope.routes";
import clientRoute from "./modules/client/client.routes";
import { authMiddleware } from "./infraestructure/midlweware/authentication";

const auth = Router();
auth.use("/authentication", authRouter);
authMiddleware;
auth
  .use("/rol", rolRouter)
  .use("/user", userRouter)
  .use("/scope", scopeRoute)
  .use("/client", clientRoute);
export default auth;

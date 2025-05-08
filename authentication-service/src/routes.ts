import { Router } from "express";
import rolRouter from "./modules/roles/roles.router";
import userRouter from "./modules/users/user.router";
import authRouter from "./modules/authentication/routes.auth";
import scopeRoute from "./modules/scope/scope.routes";
import clientRoute from "./modules/client/client.routes";
import { authMiddleware } from "./infraestructure/midlweware/authentication";
import cors from "cors";
import navRoutes from "./modules/nav/nav.routes";
const auth = Router();
auth.use(
  cors({
    origin: "*",
  })
);
auth.use("/authentication", authRouter).use("/nav", navRoutes);
authMiddleware;
auth
  .use("/rol", rolRouter)
  .use("/user", userRouter)
  .use("/scope", scopeRoute)
  .use("/client", clientRoute);
export default auth;

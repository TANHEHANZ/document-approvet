import { Router } from "express";
import clientAuthRoute from "./client/client.routes";
import userAuthRoutes from "./user/user.routes";

const authRouter = Router();
authRouter.use("/user", userAuthRoutes).use("/client", clientAuthRoute);

export default authRouter;

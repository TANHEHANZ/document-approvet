import { Router } from "express";
import rolRouter from "./modules/roles/roles.router";
import userRouter from "./modules/users/user.router";

const auth = Router();
auth
  .use("/rol", rolRouter)
  .use("/user", userRouter)
  .use("/authentication", userRouter);
export default auth;

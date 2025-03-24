import { Router } from "express";
import userRouter from "./modules/users/user.router";

const auth = Router();
auth.use("/user", userRouter);

export default auth;

import { Router } from "express";
import { createUser } from "./controllers/create";
import { validate } from "../../infraestructure/midlweware/validated";
import { CreateUserSchema } from "../../infraestructure/models/user.dto";

const userRouter = Router();

userRouter.post("/", validate(CreateUserSchema), createUser);

export default userRouter;

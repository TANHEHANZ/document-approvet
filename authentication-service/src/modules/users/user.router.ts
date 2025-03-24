import { Router } from "express";
import { createUser } from "./controllers/create";
import { validate } from "../../infraestructure/midlweware/validated";

const userRouter = Router();

// userRouter.post("/",
//   validate(CreateUserSchema),
//   createUser
// );

export default userRouter;

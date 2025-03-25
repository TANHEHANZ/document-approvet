import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
} from "./controllers";
import { validate } from "../../infraestructure/midlweware/validated";
import {
  CreateUserSchema,
  UpdateUserSchema,
} from "../../infraestructure/models/user.dto";

const userRouter = Router();

userRouter.post("/", validate(CreateUserSchema), createUser);

userRouter.get("/", getUsers);

userRouter.get("/:id", getUserById);

userRouter.put("/:id", validate(UpdateUserSchema), updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;

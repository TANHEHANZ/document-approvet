import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
} from "./controllers";
import { PERMISSIONS } from "@firma-gamc/shared";
import { checkPermission } from "../../infraestructure/midlweware/check-permission";
import { validate } from "../../infraestructure/midlweware/validated";
import { CreateUserSchema } from "../../infraestructure/models/user.dto";
import { createClientOAuth } from "../client/controller/create";
import { authMiddleware } from "@/infraestructure/midlweware/authentication";
import { verifyEmailUser } from "./controllers/verify-user.ts/send-email";

const userRouter = Router();
//  manejo de el doble autenticado
// userRouter.get("/email", verifyEmailUser);
userRouter.use(authMiddleware);

userRouter.get("/", checkPermission(PERMISSIONS.USER.READ), getUsers);

// .get("/:id", checkPermission(PERMISSIONS.USER.READ), getUserById)
// .put("/:id", checkPermission(PERMISSIONS.USER.UPDATE), updateUser)
// .delete("/:id", checkPermission(PERMISSIONS.USER.DELETE), deleteUser);

export default userRouter;

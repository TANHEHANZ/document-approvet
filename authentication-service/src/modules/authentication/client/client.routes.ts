import { validate } from "@/infraestructure/midlweware/validated";
import { AuthClientQuerySchema } from "@/infraestructure/models/client/authClient.dto";
import { Router } from "express";
import { authClient } from "./controller/auth.client";
import { verificacionJWT } from "./controller/verificated";

const clientAuthRoute = Router();

clientAuthRoute
  .post("/", validate(AuthClientQuerySchema, "query"), authClient)
  .post("/validate", verificacionJWT);

export default clientAuthRoute;

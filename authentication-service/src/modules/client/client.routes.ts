import { Router } from "express";
import { createClientOAuth } from "./controller/create";
import { validate } from "@/infraestructure/midlweware/validated";
import { CreateOAuthClientSchema } from "@/infraestructure/models/OAuthClient";

const clientRoute = Router();

clientRoute.post("/", validate(CreateOAuthClientSchema), createClientOAuth);

export default clientRoute;

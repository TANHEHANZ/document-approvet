import { Router } from "express";
import { createClientOAuth } from "./controller/create";
import { validate } from "@/infraestructure/midlweware/validated";
import {
  CreateOAuthClientSchema,
  QueryParamsOAuthClient,
} from "@/infraestructure/models/OAuthClient";
import { checkPermission } from "@/infraestructure/midlweware/check-permission";
import { PERMISSIONS } from "@shared/index";
import { getAllClient } from "./controller/getAll";

const clientRoute = Router();

clientRoute
  .post(
    "/",
    checkPermission(PERMISSIONS.CLIENT.CREATE),
    validate(CreateOAuthClientSchema),
    createClientOAuth
  )
  .get("/", validate(QueryParamsOAuthClient, "query"), getAllClient);

export default clientRoute;

import { Router } from "express";
import { scopeAll } from "./controller/getAllScope";
import { validate } from "@/infraestructure/midlweware/validated";
import { CreateScopeSchema } from "@/infraestructure/models/scope.dto";
import { checkScopeExists } from "./controller/checkScopeExists";
import { scopeCreate } from "./controller/createScopePermission";
import { checkPermission } from "@/infraestructure/midlweware/check-permission";
import { PERMISSIONS } from "@shared/index";

const scopeRoute = Router();

scopeRoute
  .get("/", checkPermission(PERMISSIONS.SCOPE.READ), scopeAll)
  .get(
    "/check/:name",
    checkPermission(PERMISSIONS.SCOPE.CHECK),
    checkScopeExists
  )
  .post(
    "/",
    checkPermission(PERMISSIONS.SCOPE.CREATE),
    validate(CreateScopeSchema),
    scopeCreate
  );

export default scopeRoute;

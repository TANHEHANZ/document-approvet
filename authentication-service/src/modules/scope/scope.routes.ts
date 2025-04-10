import { Router } from "express";
import { scopeAll } from "./controller/getAllScope";
import { validate } from "@/infraestructure/midlweware/validated";
import { CreateScopeSchema } from "@/infraestructure/models/scope.dto";
import { checkScopeExists } from "./controller/checkScopeExists";
import { scopeCreate } from "./controller/createScopePermission";

const scopeRoute = Router();

scopeRoute
  .get("/", scopeAll)
  .get("/check/:name", checkScopeExists)
  .post("/", validate(CreateScopeSchema), scopeCreate);

export default scopeRoute;

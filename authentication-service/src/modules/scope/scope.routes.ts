import { Router } from "express";
import { scopeAll } from "./controller/getAllScopes";

const scopeRoute = Router();

scopeRoute.get("/", scopeAll);
export default scopeRoute;

import { Router } from "express";
import { createClientOAuth } from "./controller/create";

const clientRoute = Router();

clientRoute.post("/", createClientOAuth);

export default clientRoute;

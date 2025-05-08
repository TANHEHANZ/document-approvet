import { Router } from "express";
import { allRoutes } from "./controllers/allRoutes.controller";

const navRoutes = Router();
navRoutes.get("/all", allRoutes);
export default navRoutes;

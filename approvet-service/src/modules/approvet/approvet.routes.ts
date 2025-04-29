import { Router } from "express";
import { verifyDocument } from "./controllers/aprovador";
const appoventRouter = Router();
appoventRouter.post("/verify", verifyDocument);
export default appoventRouter;

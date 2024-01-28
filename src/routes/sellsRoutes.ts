import express, { Router } from "express";
import { postSellNow } from "../controllers/sellsController";

const sellsRoutes: Router = express.Router();

sellsRoutes.post("/sell-now", postSellNow);

export default sellsRoutes;

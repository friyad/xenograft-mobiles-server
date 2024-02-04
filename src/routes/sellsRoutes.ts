import express, { Router } from "express";
import { getSelesHistory, postSellNow } from "../controllers/sellsController";
import validateRequest from "../middlewares/validateRequest";
import { sellValidation } from "../validations/sellsValidations";

const sellsRoutes: Router = express.Router();

sellsRoutes.post("/sell-now", validateRequest(sellValidation), postSellNow);
sellsRoutes.get("/seles-history", getSelesHistory);

export default sellsRoutes;

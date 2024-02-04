"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sellsController_1 = require("../controllers/sellsController");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const sellsValidations_1 = require("../validations/sellsValidations");
const sellsRoutes = express_1.default.Router();
sellsRoutes.post("/sell-now", (0, validateRequest_1.default)(sellsValidations_1.sellValidation), sellsController_1.postSellNow);
sellsRoutes.get("/seles-history", sellsController_1.getSelesHistory);
exports.default = sellsRoutes;

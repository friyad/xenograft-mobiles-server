"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const userValidations_1 = require("../validations/userValidations");
const verifyUser_1 = __importDefault(require("../middlewares/verifyUser"));
const userRoutes = express_1.default.Router();
userRoutes.post("/signup", (0, validateRequest_1.default)(userValidations_1.signUpSchema), userController_1.handleSignUP);
userRoutes.post("/signin", (0, validateRequest_1.default)(userValidations_1.signInSchema), userController_1.handleSignIn);
userRoutes.get("/me", verifyUser_1.default, userController_1.getMe);
userRoutes.post("/sign-out", verifyUser_1.default, userController_1.signOut);
exports.default = userRoutes;

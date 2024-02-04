import express, { Router } from "express";
import {
  getMe,
  handleSignIn,
  handleSignUP,
  signOut,
} from "../controllers/userController";
import validateRequest from "../middlewares/validateRequest";
import { signInSchema, signUpSchema } from "../validations/userValidations";
import verifyUser from "../middlewares/verifyUser";

const userRoutes: Router = express.Router();

userRoutes.post("/signup", validateRequest(signUpSchema), handleSignUP);
userRoutes.post("/signin", validateRequest(signInSchema), handleSignIn);
userRoutes.get("/me", verifyUser, getMe);
userRoutes.post("/sign-out", verifyUser, signOut);

export default userRoutes;

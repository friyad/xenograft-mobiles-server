import express, { Router } from "express";
import { handleSignIn, handleSignUP } from "../controllers/userController";

const userRoutes: Router = express.Router();

userRoutes.post("/signup", handleSignUP);
userRoutes.post("/signin", handleSignIn);

export default userRoutes;

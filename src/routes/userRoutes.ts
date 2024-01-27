import express, { Router } from "express";
import { handleSignUP } from "../controllers/userController";

const userRoutes: Router = express.Router();

userRoutes.post("/signup", handleSignUP);

export default userRoutes;

import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import { SignUpCredentials } from "../types/globalTypes";

export const handleSignUP = async (req: Request, res: Response) => {
  const { email, password, name }: SignUpCredentials = req.body;

  try {
    const user = await userModel.findOne({ id: "" });
  } catch (error: unknown) {
    console.log((error as Error).message);
  }
};

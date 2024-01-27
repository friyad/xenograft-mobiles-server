import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userID: string, res: Response) => {
  try {
    const payload = {
      _id: userID,
    };
    const secretKey = process.env.JWT_SECRET!;

    // generate a token for user
    const token = jwt.sign(payload, secretKey, {
      expiresIn: "30d",
    });

    // Set the token to user's browser
    res.cookie("_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days validity
    });

    return token;
  } catch (error: unknown) {
    console.log("Failed to generate token: ", error);
    return false;
  }
};

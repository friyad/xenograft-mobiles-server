import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { CRequest } from "../types/globalTypes";

const verifyUser = async (req: CRequest, res: Response, next: NextFunction) => {
  const token = req.cookies._token;
  console.log(req);
  console.log(req.cookies);

  if (!token) {
    res.status(401).json({
      status: false,
      message: "Unauthorized, invalid token",
    });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET!;
    const result: any = jwt.verify(token, secretKey);
    const user = await UserModel.findById(result._id);

    if (!user) {
      res.status(401).clearCookie("_token").json({
        status: false,
        message: "Unauthorized",
      });
      return;
    }

    req.user = user;
    next();
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(401).clearCookie("_token").json({
      status: false,
      message: "Unauthorized",
    });
  }
};

export default verifyUser;

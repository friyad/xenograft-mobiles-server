import { Request, Response } from "express";
import { generateToken } from "../helpers/GenerateToken";
import { UserModel } from "../models/userModel";
import {
  SignUpCredentials,
  SignInCredentials,
  CRequest,
} from "../types/globalTypes";
import bcrypt from "bcrypt";
import { InventoriesModel } from "../models/inventoryModels";
import { SellsModel } from "../models/sellsModel";

export const handleSignUP = async (req: Request, res: Response) => {
  const { email, password, name }: SignUpCredentials = req.body;

  try {
    // const isValidate = signUpSchema.validate(req.body);
    // if (isValidate.error) {
    //   throw new Error(isValidate.error.message);
    // }
    const user = await UserModel.findOne({ email: email });

    // If user already exist then return with message
    if (user?.email) {
      res.status(400).json({
        status: false,
        message: "A user already exist with this email",
      });
      return;
    }

    // If it is an new user
    const hashedPassword = await bcrypt.hash(password, 10); // hash the plain text password
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      refreshToken: "",
    });
    const token = generateToken(newUser._id.toString(), res);

    // if token genereated successfully
    if (token) {
      // create an empty inventory for this user
      const inventoryCollection = new InventoriesModel({
        userID: newUser._id.toString(),
        smartPhones: [],
      });

      // create an empty sells collection for this user
      const sellsCollection = new SellsModel({
        userID: newUser._id.toString(),
        sellsData: [],
      });

      // update the refreshToken to user data
      newUser.refreshToken = token;

      // save the user and user's empty collections to db at the same time
      await Promise.all([
        inventoryCollection.save(),
        sellsCollection.save(),
        newUser.save(),
      ]);

      res.status(201).json({
        status: true,
        message: "Sign Up Successfull!",
      });
    } else {
      throw new Error("Sign Up Failed! Please try again later");
    }
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const handleSignIn = async (req: Request, res: Response) => {
  const { email, password }: SignInCredentials = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    // If NOT registered user
    if (!user?.email) {
      res.status(400).json({
        status: false,
        message: "Incorrect Email or Password",
      });
      return;
    }

    // Compare user's provided password with db hashed password
    const isPassCorrect = await bcrypt.compare(password, user.password!);
    if (!isPassCorrect) {
      res.status(400).json({
        status: false,
        message: "Incorrect Email or Password",
      });
      return;
    }

    // Generate a new token for looged is user
    const token = generateToken(user._id.toString(), res);
    if (token) {
      res.status(200).json({
        status: true,
        message: "Sign In Successfully!",
      });
    } else {
      throw new Error("Sign In Failed! Please try again later");
    }
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const getMe = async (req: CRequest, res: Response) => {
  const user = req.user;

  try {
    res.status(200).json({
      status: true,
      data: {
        _id: user?._id,
        email: user?.email,
        name: user?.name,
      },
    });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

export const signOut = async (req: CRequest, res: Response) => {
  // const user = req.user;
  try {
    res
      .status(200)
      .clearCookie("_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      })
      .json({
        status: false,
        message: "Sign Out Successfully!",
      });
  } catch (error: unknown) {
    console.log((error as Error).message);
    res.status(500).json({
      status: false,
      message: (error as Error).message,
    });
  }
};

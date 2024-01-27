import { Request, Response } from "express";
import { generateToken } from "../helpers/GenerateToken";
import { UserModel } from "../models/userModel";
import { SignUpCredentials, SignInCredentials } from "../types/globalTypes";
import { signUpSchema, signInSchema } from "../validations/userValidations";
import bcrypt from "bcrypt";

export const handleSignUP = async (req: Request, res: Response) => {
  const { email, password, name }: SignUpCredentials = req.body;

  try {
    const value = signUpSchema.validate(req.body);
    if (value.error) {
      throw new Error(value.error.message);
    }
    const user = await UserModel.findOne({ email: email });

    // If user already exist then return with message
    if (user?.email) {
      res.status(404).json({
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
      newUser.refreshToken = token;
      await newUser.save(); // save the user to db
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
    const value = signInSchema.validate(req.body);
    if (value.error) {
      throw new Error(value.error.message);
    }
    const user = await UserModel.findOne({ email: email });

    // If NOT registered user
    if (!user?.email) {
      res.status(404).json({
        status: false,
        message: "Incorrect Email or Password",
      });
      return;
    }

    // Compare user's provided password with db hashed password
    const isPassCorrect = await bcrypt.compare(password, user.password!);
    if (!isPassCorrect) {
      res.status(404).json({
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

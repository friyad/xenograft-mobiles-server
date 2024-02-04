import { z } from "zod";

export const signInSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password can't be more than 15 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z]).+$/,
        "Password must contain at least 1 Uppercase and 1 Lowercase"
      )
      .regex(/^(?=.*\d)/, "Password must contain at least 1 number")
      .regex(/^\S*$/, "Whitespace is not allowed on Password")
      .regex(
        /^(?=.*[!@#$%^&*()])/,
        "Password must contain at least 1 Special Character"
      ),
  })
  .required();

export const signUpSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(15, "Password can't be more than 15 characters")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z]).+$/,
        "Password must contain at least 1 Uppercase and 1 Lowercase"
      )
      .regex(/^(?=.*\d)/, "Password must contain at least 1 number")
      .regex(/^\S*$/, "Whitespace is not allowed on Password")
      .regex(
        /^(?=.*[!@#$%^&*()])/,
        "Password must contain at least 1 Special Character"
      ),
  })
  .required();

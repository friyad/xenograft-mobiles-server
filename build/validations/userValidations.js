"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = exports.signInSchema = void 0;
const zod_1 = require("zod");
exports.signInSchema = zod_1.z
    .object({
    email: zod_1.z.string().email().toLowerCase(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(15, "Password can't be more than 15 characters")
        .regex(/^(?=.*[A-Z])(?=.*[a-z]).+$/, "Password must contain at least 1 Uppercase and 1 Lowercase")
        .regex(/^(?=.*\d)/, "Password must contain at least 1 number")
        .regex(/^\S*$/, "Whitespace is not allowed on Password")
        .regex(/^(?=.*[!@#$%^&*()])/, "Password must contain at least 1 Special Character"),
})
    .required();
exports.signUpSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(4, "Name must be at least 4 characters"),
    email: zod_1.z.string().email().toLowerCase(),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(15, "Password can't be more than 15 characters")
        .regex(/^(?=.*[A-Z])(?=.*[a-z]).+$/, "Password must contain at least 1 Uppercase and 1 Lowercase")
        .regex(/^(?=.*\d)/, "Password must contain at least 1 number")
        .regex(/^\S*$/, "Whitespace is not allowed on Password")
        .regex(/^(?=.*[!@#$%^&*()])/, "Password must contain at least 1 Special Character"),
})
    .required();

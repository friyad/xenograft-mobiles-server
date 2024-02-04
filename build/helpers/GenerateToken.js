"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userID, res) => {
    try {
        const payload = {
            _id: userID,
        };
        const secretKey = process.env.JWT_SECRET;
        // generate a token for user
        const token = jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn: "30d",
        });
        // Set the token to user's browser
        res.cookie("_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days validity
        });
        return token;
    }
    catch (error) {
        console.log("Failed to generate token: ", error);
        return false;
    }
};
exports.generateToken = generateToken;

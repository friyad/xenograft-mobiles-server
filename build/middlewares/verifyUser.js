"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies._token;
    if (!token) {
        res.status(401).json({
            status: false,
            message: "Unauthorized, invalid token",
        });
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        const result = jsonwebtoken_1.default.verify(token, secretKey);
        const user = yield userModel_1.UserModel.findById(result._id);
        if (!user) {
            res.status(401).clearCookie("_token").json({
                status: false,
                message: "Unauthorized",
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error.message);
        res.status(401).clearCookie("_token").json({
            status: false,
            message: "Unauthorized",
        });
    }
});
exports.default = verifyUser;

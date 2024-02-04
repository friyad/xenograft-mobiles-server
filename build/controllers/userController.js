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
exports.signOut = exports.getMe = exports.handleSignIn = exports.handleSignUP = void 0;
const GenerateToken_1 = require("../helpers/GenerateToken");
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const inventoryModels_1 = require("../models/inventoryModels");
const sellsModel_1 = require("../models/sellsModel");
const handleSignUP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        // const isValidate = signUpSchema.validate(req.body);
        // if (isValidate.error) {
        //   throw new Error(isValidate.error.message);
        // }
        const user = yield userModel_1.UserModel.findOne({ email: email });
        // If user already exist then return with message
        if (user === null || user === void 0 ? void 0 : user.email) {
            res.status(400).json({
                status: false,
                message: "A user already exist with this email",
            });
            return;
        }
        // If it is an new user
        const hashedPassword = yield bcrypt_1.default.hash(password, 10); // hash the plain text password
        const newUser = new userModel_1.UserModel({
            name,
            email,
            password: hashedPassword,
            refreshToken: "",
        });
        const token = (0, GenerateToken_1.generateToken)(newUser._id.toString(), res);
        // if token genereated successfully
        if (token) {
            // create an empty inventory for this user
            const inventoryCollection = new inventoryModels_1.InventoriesModel({
                userID: newUser._id.toString(),
                smartPhones: [],
            });
            // create an empty sells collection for this user
            const sellsCollection = new sellsModel_1.SellsModel({
                userID: newUser._id.toString(),
                sellsData: [],
            });
            // update the refreshToken to user data
            newUser.refreshToken = token;
            // save the user and user's empty collections to db at the same time
            yield Promise.all([
                inventoryCollection.save(),
                sellsCollection.save(),
                newUser.save(),
            ]);
            res.status(201).json({
                status: true,
                message: "Sign Up Successfull!",
            });
        }
        else {
            throw new Error("Sign Up Failed! Please try again later");
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
exports.handleSignUP = handleSignUP;
const handleSignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.UserModel.findOne({ email: email });
        // If NOT registered user
        if (!(user === null || user === void 0 ? void 0 : user.email)) {
            res.status(400).json({
                status: false,
                message: "Incorrect Email or Password",
            });
            return;
        }
        // Compare user's provided password with db hashed password
        const isPassCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!isPassCorrect) {
            res.status(400).json({
                status: false,
                message: "Incorrect Email or Password",
            });
            return;
        }
        // Generate a new token for looged is user
        const token = (0, GenerateToken_1.generateToken)(user._id.toString(), res);
        if (token) {
            res.status(200).json({
                status: true,
                message: "Sign In Successfully!",
            });
        }
        else {
            throw new Error("Sign In Failed! Please try again later");
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
exports.handleSignIn = handleSignIn;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    try {
        res.status(200).json({
            status: true,
            data: {
                _id: user === null || user === void 0 ? void 0 : user._id,
                email: user === null || user === void 0 ? void 0 : user.email,
                name: user === null || user === void 0 ? void 0 : user.name,
            },
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
exports.getMe = getMe;
const signOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = req.user;
    try {
        res.status(200).clearCookie("_token").json({
            status: false,
            message: "Sign Out Successfully!",
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: error.message,
        });
    }
});
exports.signOut = signOut;

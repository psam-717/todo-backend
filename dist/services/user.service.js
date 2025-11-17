"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserService = exports.loginService = exports.signupService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const error_util_1 = require("../utils/error.util");
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../config/env");
const signupService = async (fullName, email, password, confirmPassword) => {
    try {
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            throw (0, error_util_1.createError)(400, "User already exists");
        }
        if (password !== confirmPassword) {
            throw (0, error_util_1.createError)(400, "Passwords do not match");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await user_model_1.default.create({
            fullName,
            email,
            password: hashedPassword
        });
        return newUser;
    }
    catch (error) {
        throw (error);
    }
};
exports.signupService = signupService;
const loginService = async (email, password) => {
    try {
        // ensure the user already exists
        const existingUser = await user_model_1.default.findOne({ email }).select("+ password");
        if (!existingUser) {
            throw (0, error_util_1.createError)(404, "this user account does not exists");
        }
        const isPassword = await existingUser.comparePassword(password);
        if (!isPassword)
            throw (0, error_util_1.createError)(400, "Password is incorrect");
        const payload = { id: existingUser._id, email: existingUser.email };
        const token = jsonwebtoken_1.default.sign(payload, env_1.ENV.JWT_SECRET, { expiresIn: "5h" });
        return {
            user: existingUser.toObject(),
            token
        };
    }
    catch (error) {
        throw (error);
    }
};
exports.loginService = loginService;
const getUserService = async (id) => {
    try {
        const existingUser = await user_model_1.default.findById(id);
        if (!existingUser) {
            throw (0, error_util_1.createError)(404, "User does not exist");
        }
        return existingUser;
    }
    catch (error) {
        throw (error);
    }
};
exports.getUserService = getUserService;
//# sourceMappingURL=user.service.js.map
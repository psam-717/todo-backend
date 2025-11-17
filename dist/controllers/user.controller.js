"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = exports.logoutController = exports.loginController = exports.signupController = void 0;
const user_service_1 = require("../services/user.service");
const env_1 = require("../config/env");
const signupController = async (req, res, next) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;
        const result = await (0, user_service_1.signupService)(fullName, email, password, confirmPassword);
        if (!result) {
            res.status(400).json({ error: "Account creation unsuccessful" });
            return;
        }
        res.status(200).json({ message: "Account successfully created" });
    }
    catch (error) {
        console.log("Error caused by ", error.message);
        next(error);
    }
};
exports.signupController = signupController;
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await (0, user_service_1.loginService)(email, password);
        const isProduction = env_1.ENV.APP.NODE_ENV === "production";
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
            maxAge: 5 * 60 * 60 * 1000,
            path: "/"
        });
        const { password: _, ...safeUser } = user;
        res.status(200).json({ message: "Login successful", user: safeUser });
    }
    catch (error) {
        console.log("Error caused by ", error.message);
        next(error);
    }
};
exports.loginController = loginController;
const logoutController = async (req, res, next) => {
    try {
        const isProduction = env_1.ENV.APP.NODE_ENV === "production";
        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict" : "lax",
            path: "/"
        });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.log("Internal server error caused by ", error.message);
        next(error);
    }
};
exports.logoutController = logoutController;
const getUserController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await (0, user_service_1.getUserService)(userId);
        res.status(200).json({ message: "user data retrieved", result });
    }
    catch (error) {
        console.log("Error caused by ", error.message);
        next(error);
    }
};
exports.getUserController = getUserController;
//# sourceMappingURL=user.controller.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const env_1 = require("../config/env");
const user_model_1 = __importDefault(require("../models/user.model"));
const authenticate = async (req, res, next) => {
    const token = req.cookies?.auth_token;
    console.log("Cookies received ", token);
    if (!token) {
        return res.status(401).json({ error: "Token does not exist" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.ENV.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ error: "error while decoding the token" });
        }
        const jwtUser = await user_model_1.default.findById(decoded.id);
        if (!jwtUser) {
            return res.status(404).json({ error: "this authenticated user does not exist" });
        }
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        next();
    }
    catch (error) {
        console.log("Internal server error caused by ", error.message);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            res.status(401).json({ error: "Token has expired" });
            return;
        }
        else if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            res.status(401).json({ error: "Error with json web token" });
            return;
        }
        res.status(500).json({ error: "Internal server while authenticating token" });
        return;
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map
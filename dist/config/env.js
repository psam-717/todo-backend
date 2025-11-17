"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ENV = {
    APP: {
        NAME: process.env.APP_NAME,
        NODE_ENV: process.env.NODE_ENV,
        PORT: parseInt(process.env.PORT || "4000"),
    },
    JWT_SECRET: process.env.JWT_SECRET,
    DB: {
        URL: process.env.DB_URL
    }
};
//# sourceMappingURL=env.js.map
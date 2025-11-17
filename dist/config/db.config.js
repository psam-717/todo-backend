"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const env_1 = require("./env");
dotenv_1.default.config();
const connectDB = async () => {
    try {
        if (!process.env.DB_URL) {
            console.log('DB url not provided');
        }
        await mongoose_1.default.connect(env_1.ENV.DB.URL);
        console.log('Database connected');
    }
    catch (error) {
        console.log('MongDB connection:', error.message);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.config.js.map
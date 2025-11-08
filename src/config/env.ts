import dotenv from "dotenv";
import { IENV } from "../interfaces/env.interface";
dotenv.config();

export const ENV: IENV = {
    APP: {
        NAME: process.env.APP_NAME!,
        NODE_ENV: process.env.NODE_ENV!,
        PORT: parseInt(process.env.PORT || "4000"),
    }, 
    JWT_SECRET: process.env.JWT_SECRET!,
    DB: {
        URL: process.env.DB_URL!
    }
}
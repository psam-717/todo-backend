import mongoose from "mongoose";
import dotenv from 'dotenv'
import { ENV } from "./env";

dotenv.config()

export const connectDB = async(): Promise<void> => {
    try {
        if(!process.env.DB_URL){
            console.log('DB url not provided');
        }
        await mongoose.connect(ENV.DB.URL)
        console.log('Database connected');
    } catch (error) {
        console.log('MongDB connection:', (error as Error).message);
        process.exit(1);
    }
}
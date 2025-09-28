import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const connectDB = async(): Promise<void> => {
    try {
        if(!process.env.DB_URL){
            console.log('DB url not provided');
        }
        await mongoose.connect(process.env.DB_URL!)
        console.log('Database connected');
    } catch (error) {
        console.log('MongDB connection:', (error as Error).message);
        process.exit(1);
    }
}
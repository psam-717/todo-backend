import { NextFunction, Request, Response } from "express";
import { signupService } from "../services/user.service";


export const signupController = async(
    req:Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const {fullName, email, password, confirmPassword} = req.body;

        const result = await signupService(fullName, email, password, confirmPassword);
        if(!result){
            res.status(400).json({error:"Account creation unsuccessful"});
            return;
        }

        res.status(200).json({message: "Account successfully created"})

    } catch (error) {
        console.log("Error caused by ", (error as Error).message)
        next(error)
    }
}
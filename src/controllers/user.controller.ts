import { NextFunction, Request, Response } from "express";
import { getUserService, loginService, signupService } from "../services/user.service";
import { ENV } from "../config/env";

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


export const loginController = async(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {email, password} = req.body;
        const {user, token} = await loginService(email, password);

        const isProduction = ENV.APP.NODE_ENV === "production";

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "strict": "lax",
            maxAge: 5 * 60 * 60 * 1000,
            path: "/"
        });

        const {password: _, ...safeUser} = user;
        res.status(200).json({message: "Login successful", user: safeUser});
    } catch (error) {
        console.log("Error caused by ", (error as Error).message);
        next(error);
    }
}

export const logoutController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const isProduction = ENV.APP.NODE_ENV === "production"
        res.clearCookie(
            "auth_token", {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? "strict": "lax",
                path: "/"
            }
        );

        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.log("Internal server error caused by ", (error as Error).message);
        next(error);
    }
}

export const getUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise <void> => {
    try {
        const userId = (req as any).user.id;

        const result = await getUserService(userId);

        res.status(200).json({message: "user data retrieved", result});
        
    } catch (error) {
        console.log("Error caused by ", (error as Error).message);
        next(error);
    }
}
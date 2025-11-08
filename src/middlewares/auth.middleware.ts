import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env";
import User from "../models/user.model";

interface JWT_PAYLOAD {
    id: string,
    email: string
}

export const authenticate = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies?.auth_token;

    console.log("Cookies received ", token);
    if(!token){
        return res.status(401).json({error: "Token does not exist"});
    }

    try {
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as JWT_PAYLOAD;
        if(!decoded){
            return res.status(400).json({error: "error while decoding the token"});
            
        }

        const jwtUser = await User.findById(decoded.id);
        if(!jwtUser){
            return res.status(404).json({error: "this authenticated user does not exist"});
    
        }

        (req as any).user = {
            id: decoded.id,
            email: decoded.email
        }

        next();
        
    } catch (error) {
        console.log("Internal server error caused by ", (error as Error).message);
        if(error instanceof TokenExpiredError){
            res.status(401).json({error: "Token has expired"});
            return;
        }else if (error instanceof JsonWebTokenError){
            res.status(401).json({error: "Error with json web token"});
            return;
        }
        res.status(500).json({error: "Internal server while authenticating token"});
        return;
    }
}
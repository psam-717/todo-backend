import { Request, Response, NextFunction } from "express";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.errorMessage || 'hello there';
    res.status(statusCode).json({error: errorMessage});
    
}
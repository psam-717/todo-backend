import { Response, Request } from "express";

export const healthMessage = async (req: Request, res: Response) => {
    res.status(200).json({status: 'ok'});
}
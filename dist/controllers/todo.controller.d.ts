import { NextFunction, Request, Response } from "express";
export declare const welcome: (req: Request, res: Response) => Promise<void>;
export declare const createTodo: (req: Request, res: Response) => Promise<void>;
export declare const getAllTodosHandler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getBySingleId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const markAsDone: (req: Request, res: Response) => Promise<void>;
export declare const updateTodo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteToDo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=todo.controller.d.ts.map
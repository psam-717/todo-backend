import mongoose from "mongoose";
import { ITodo } from "../models/todo.model";
export declare const createTodoService: (task: string) => Promise<mongoose.Document<unknown, {}, ITodo, {}, {}> & ITodo & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const getAllTodosService: () => Promise<(mongoose.Document<unknown, {}, ITodo, {}, {}> & ITodo & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare const getTodoByIdService: (id: string) => Promise<mongoose.Document<unknown, {}, ITodo, {}, {}> & ITodo & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare const markAsDoneService: (id: string) => Promise<void>;
export declare const updateTodoService: (id: string, task: string) => Promise<(mongoose.Document<unknown, {}, ITodo, {}, {}> & ITodo & Required<{
    _id: unknown;
}> & {
    __v: number;
}) | null>;
export declare const deleteToDoService: (id: string) => Promise<void>;
//# sourceMappingURL=todo.service.d.ts.map
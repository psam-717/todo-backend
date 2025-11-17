import { Document } from "mongoose";
export interface ITodo extends Document {
    task: string;
    isCompleted: boolean;
    createdAt: Date;
}
declare const _default: import("mongoose").Model<ITodo, {}, {}, {}, Document<unknown, {}, ITodo, {}, {}> & ITodo & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=todo.model.d.ts.map
import { Schema, Document, model } from "mongoose";


export interface ITodo extends Document {
    task: string;
    isCompleted: boolean;
    createdAt: Date;
}

const toDoSchema = new Schema<ITodo>({
    task: {type: String, required: true},
    isCompleted: {type: Boolean, required: true, default: false},
    createdAt: {type: Date}
})

export default model<ITodo>('ToDo', toDoSchema);
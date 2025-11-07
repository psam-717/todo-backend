import mongoose, {Document, model, Schema} from "mongoose";

export interface IUser extends Document{
    _id: string;
    email: string;
    password: string;
    fullName: string;
    todos?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        todos: {
            type: [Schema.Types.ObjectId],
            ref: "ToDo"
        }

    }
);

export default model<IUser>("User", UserSchema);
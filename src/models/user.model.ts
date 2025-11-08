import mongoose, {Document, model, Schema} from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document{
    _id: string;
    email: string;
    password: string;
    fullName: string;
    todos?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    comparePassword(userPassword: string): Promise<boolean>;
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

UserSchema.methods.comparePassword = async function (
   candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
}
export default model<IUser>("User", UserSchema);
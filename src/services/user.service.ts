import User from "../models/user.model"
import { createError } from "../utils/error.util";
import bcrypt from "bcrypt"

export const signupService = async(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            throw createError(400, "User already exists")
        }

        if(password !== confirmPassword){
            throw createError(400, "Passwords do not match")
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        return newUser;

    } catch (error) {
        throw(error)
    }
}
import jwt from "jsonwebtoken";
import User from "../models/user.model"
import { createError } from "../utils/error.util";
import bcrypt from "bcrypt"
import { ENV } from "../config/env";

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

export const loginService = async(
    email: string, 
    password: string
) => {
    try {
        // ensure the user already exists
        const existingUser = await User.findOne({email}).select("+ password");

        if(!existingUser){
            throw createError(404, "this user account does not exists");
        }
        
        const isPassword = await existingUser.comparePassword(password);
        if(!isPassword) throw createError(400, "Password is incorrect");

        const payload = {id: existingUser._id, email: existingUser.email};
        const token = jwt.sign(payload, ENV.JWT_SECRET, {expiresIn: "5h"});

        return {
            user: existingUser.toObject(),
            token
        };

    } catch (error) {
        throw(error);
    }
}

export const getUserService = async(id: string) => {
    try {
        const existingUser = await User.findById(id);
        if(!existingUser){
            throw createError(404, "User does not exist");
        }

        return existingUser;

    } catch (error) {
        throw(error);
    }
}
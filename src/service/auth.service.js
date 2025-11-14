import bcrypt from "bcrypt"
import { ENV } from "../config/ENV.config.js"
import jwt from "jsonwebtoken"
import  AppError from "../utils/error/AppError.js"
import { StatusCodes } from "http-status-codes"
import { UserModel } from "../models/index.js"

export const signUpService = async (userName, email , password, role) => {
        const encryptedPassword = await bcrypt.hash(password,5)
        await UserModel.User.create({
            userName : userName,
            email : email,
            password : encryptedPassword,
            role : role
        })
}



export const signInService = async (email, password) => {
     const findUser = await UserModel.User.findOne({email})
     if(!findUser){
        throw  new AppError("user not found", StatusCodes.UNAUTHORIZED);
     } 
     const passwordMatched = await bcrypt.compare(password,findUser.password)
     if(passwordMatched){
        var token = jwt.sign({
            id: findUser._id
        },ENV.JWT_SECRET)
     } else {
         throw  new AppError("invalid credentials", StatusCodes.UNAUTHORIZED);
     }
   
     return token
}



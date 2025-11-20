import bcrypt from "bcrypt"
import { ENV } from "../config/ENV.config.js"
import jwt from "jsonwebtoken"
import  AppError from "../utils/error/AppError.js"
import { StatusCodes } from "http-status-codes"
import { UserModel } from "../models/index.js"
import { generateAccessToken, generateRefreshToken } from "../utils/common/generateToken.js"



export const signUpService = async (userName, email , password, role="user") => {
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
        throw  new AppError("user not found", StatusCodes.NOT_FOUND);
     } 

     const passwordMatched = await bcrypt.compare(password,findUser.password)
     if(passwordMatched){
        const accessToken = generateAccessToken({userId: findUser._id, userName:findUser.userName ,role: findUser.role}, ENV.JWT_SECRET)

        const refreshToken = generateRefreshToken({userId: findUser._id}, ENV.JWT_SECRET)
        
        return {accessToken,refreshToken}

     } else {
         throw  new AppError("invalid credentials", StatusCodes.UNAUTHORIZED);
     }
   
}



export const ResetPassword = async (userId,currentPass, newPass) => {
  const userInfo = await UserModel.User.findById(userId)
  if (!userInfo) {
    throw new AppError("User not found", StatusCodes.NOT_FOUND);
  }

  const passwordMatched = await bcrypt.compare(currentPass, userInfo.password)
  if(passwordMatched){
   await UserModel.User.findByIdAndUpdate(userId, {
      password: await bcrypt.hash(newPass, 5)
    })
  } else {
    throw new AppError("current password is incorrect", StatusCodes.UNAUTHORIZED);
  }
}

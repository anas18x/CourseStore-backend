import bcrypt from "bcrypt"
import { ENV } from "../config/ENV.config.js"
import jwt from "jsonwebtoken"
import  AppError from "../utils/error/AppError.js"
import { StatusCodes } from "http-status-codes"
import { UserModel } from "../models/index.js"
import { generateAccessToken, generateRefreshToken } from "../utils/common/generateToken.js"



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
        const accessToken = generateAccessToken({userId: findUser._id, userName:findUser.userName ,role: findUser.role}, ENV.JWT_SECRET)

        const refreshToken = generateRefreshToken({userId: findUser._id, role: findUser.role}, ENV.JWT_SECRET)
        findUser.refreshToken = refreshToken

        await findUser.save()
        return {accessToken,refreshToken}

     } else {
         throw  new AppError("invalid credentials", StatusCodes.UNAUTHORIZED);
     }
   
}




export const logOutService = async (userId) => {
    await UserModel.User.findByIdAndUpdate(userId, {refreshToken: null})  
}




export const refreshTokenService = async (refreshToken) => {
    const decoded = jwt.verify(refreshToken, ENV.JWT_SECRET)
    const user = await UserModel.User.findOne({ _id: decoded.userId})
    if(!user){
        throw new AppError("user does not exist", StatusCodes.UNAUTHORIZED);
    }

    if(user.refreshToken !== refreshToken){
        throw new AppError("invalid refresh token", StatusCodes.UNAUTHORIZED);
    }
    return decoded
}

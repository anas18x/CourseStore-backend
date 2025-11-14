import jwt from "jsonwebtoken"
import { ENV } from "../config/ENV.config.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/responseHandler.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/error/AppError.js";

const tokenIsValid = (req,res,next) => {
   const token = req.headers.token;
   if(!token) return res.status(401).json({msg:"no token provided"})
   
    try{
        const JWTverification = jwt.verify(token,ENV.JWT_SECRET) 
        req.token =  JWTverification.id
        next()
    } catch (error){
       throw new AppError("invalid token", StatusCodes.UNAUTHORIZED);
    }
}

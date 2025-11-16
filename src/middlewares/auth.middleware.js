import jwt from "jsonwebtoken"
import { ENV } from "../config/ENV.config.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/responseHandler.js";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/error/AppError.js";


export const verifyToken = (req,res,next) => {
   const accessToken = req.cookies.accessToken;
   if(!accessToken) ErrorResponse(res, "token missing", StatusCodes.UNAUTHORIZED);

    try{
       const JWTverification = jwt.verify(accessToken,ENV.JWT_SECRET) 
       req.token =  JWTverification
       next()
    } catch (error){
       throw new AppError("invalid token", StatusCodes.UNAUTHORIZED);
    }
}




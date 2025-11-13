import jwt from "jsonwebtoken"
import { ENV } from "../config/ENV.config";

const tokenIsValid = (req,res,next) => {
   const token = req.headers.token;
   if(!token) return res.status(401).json({msg:"no token provided"})
   
    try{
        const JWTverification = jwt.verify(token,ENV.JWT_SECRET) 
        req.token =  JWTverification.id
        next()
    } catch (error){
        return res.status(401).json({
            msg:"invalid credentials"
        })
    }
}
  
import jwt from "jsonwebtoken"; 
import { ENV } from "../../config/ENV.config.js";
import AppError from "../error/AppError.js";

export const getUserFromToken = (token) =>{
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
import { z } from 'zod';
import { ErrorResponse } from '../utils/common/responseHandler.js';
import { StatusCodes } from 'http-status-codes';


export const SignUpinputValidator = (req,res,next) => {

   const requiredBody = z.object({
    userName: z.string().min(3).max(100),
    email: z.string().min(3).max(100).email("Invalid email format"),
    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

    role: z.enum(["user","admin"])
  }) 

   const parsedData = requiredBody.safeParse(req.body)
   if(!parsedData.success){
   ErrorResponse(res, parsedData.error.format(), StatusCodes.NOT_ACCEPTABLE);
   } 

   req.validatedData = parsedData.data;
   next()
}



export const SignIninputValidator = (req,res,next) => {
   const requiredBody = z.object({
    email: z.string().min(3).max(100).email("Invalid email format"),
    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

   })

   const parsedData = requiredBody.safeParse(req.body)
   if(!parsedData.success){
    ErrorResponse(res, parsedData.error.format(), StatusCodes.NOT_ACCEPTABLE);
   }

   req.validatedData = parsedData.data;
   next()
}



export const validateCourseInput = (req,res,next) => {
   const requiredBody = z.object({
      title: z.string().min(3).max(100),
      description: z.string().min(10).max(1000),
      price: z.coerce.number().min(0)
   })

   const parsedData = requiredBody.safeParse(req.body)
   if(!parsedData.success){
    ErrorResponse(res, parsedData.error.format(), StatusCodes.NOT_ACCEPTABLE);
   }

   req.validatedData = parsedData.data
   next()
}


export const validateUpdateInput = (req,res,next) => {
   const requiredBody = z.object({
      title: z.string().min(3).max(100).optional(),
      description: z.string().min(10).max(1000).optional(),
      price: z.coerce.number().min(0).optional(),
   })

   const parsedData = requiredBody.safeParse(req.body)
   if(!parsedData.success){
    ErrorResponse(res, parsedData.error.format(), StatusCodes.NOT_ACCEPTABLE);
   }

   req.validatedData = parsedData.data
   next()
}



export const ResetPasswordInputValidator = (req,res,next) => {
   const requiredBody = z.object({
    CurrentPass: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
      
    NewPass: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
   })

   const parsedData = requiredBody.safeParse(req.body)
   if(!parsedData){
      ErrorResponse(res,parsedData.error.format(),StatusCodes.UNAUTHORIZED)
   }

   req.validatedData = parsedData.data;
   next()
}
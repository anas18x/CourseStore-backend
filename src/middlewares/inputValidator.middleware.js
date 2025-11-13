import { z } from 'zod';


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
    return res.status(400).json({
        error: parsedData.error.format()
    })
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
    return res.status(400).json({
        error:  parsedData.error.format()
    })
   }

   req.validatedData = parsedData.data;
   next()
}



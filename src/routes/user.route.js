import { Router } from "express";
const userRouter = Router()
import { User } from "../models/User.models.js";
import { UserSignUp } from "../controller/user.controller.js";
import { UserSignIn } from "../controller/user.controller.js";
import { SignUpinputValidator } from "../middlewares/inputValidator.middleware.js";
import { SignIninputValidator } from "../middlewares/inputValidator.middleware.js";


userRouter.post("/signup",SignUpinputValidator, UserSignUp)


userRouter.post("/signin",SignIninputValidator, UserSignIn)


export default userRouter
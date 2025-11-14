import { Router } from "express";
const userRouter = Router()

import { InputValidatorMiddleware } from "../../middlewares/index.js";
import { UserController } from "../../controller/index.js";



userRouter.post("/signup",InputValidatorMiddleware.SignUpinputValidator, UserController.UserSignUp)


userRouter.post("/signin",InputValidatorMiddleware.SignIninputValidator, UserController.UserSignIn)


export default userRouter
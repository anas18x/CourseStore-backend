import { Router } from "express";
const authRouter = Router()
import { AuthMiddleware, InputValidatorMiddleware } from "../../middlewares/index.js";
import { AuthController } from "../../controller/index.js";



authRouter.post("/register", InputValidatorMiddleware.SignUpinputValidator, AuthController.handleSignUp)

authRouter.post("/login", InputValidatorMiddleware.SignIninputValidator, AuthController.handleSignIn)

authRouter.post("/logout", AuthMiddleware.verifyToken, AuthController.handleLogOut)

authRouter.post("/refresh-token", AuthController.RefreshAccessToken)


export default authRouter


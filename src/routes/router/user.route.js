import {Router} from "express";
const userRouter = Router()
import { AuthMiddleware } from "../../middlewares/index.js";
import { UserController } from "../../controller/index.js";


userRouter.get("/my-courses",AuthMiddleware.verifyToken ,UserController.GetMyCourses)

userRouter.get("/get-all-courses", AuthMiddleware.verifyToken ,CourseController.GetAllCourses)

userRouter.get("/get-course/:courseId", AuthMiddleware.verifyToken ,CourseController.GetCourseById)

userRouter.get("/purchase-course/:courseId", AuthMiddleware.verifyToken ,UserController.PurchaseCourse)

userRouter.get("/cart", AuthMiddleware.verifyToken ,UserController.GetUserCart)

export default userRouter


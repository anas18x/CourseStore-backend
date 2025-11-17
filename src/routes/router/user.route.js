import Router from "express";
const userRouter = Router()



userRouter.get("/my-courses",)

userRouter.get("/get-all-courses", AuthMiddleware.verifyToken ,CourseController.GetAllCourses)

userRouter.get("/get-course/:courseId", AuthMiddleware.verifyToken ,CourseController.GetCourseById)

userRouter.get("/purchase-course/:courseId", AuthMiddleware.verifyToken ,UserController.PurchaseCourse)

userRouter.get("/cart", AuthMiddleware.verifyToken ,UserController.GetUserCart)

export default userRouter


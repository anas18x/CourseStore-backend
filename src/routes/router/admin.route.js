import Router from "express";
const adminRouter = Router()
import { AuthMiddleware, InputValidatorMiddleware } from "../../middlewares/index.js";
import { AdminController } from "../../controller/index.js";


adminRouter.get("/preview-all-courses", AuthMiddleware.verifyToken, AdminController.PreviewAllCourses)

adminRouter.get("/preview-course/:courseId", AuthMiddleware.verifyToken, AdminController.PreviewCourseById)

adminRouter.post("/add-course", AuthMiddleware.verifyToken, InputValidatorMiddleware.validateCourseInput, AdminController.AddCourse) 

adminRouter.put("/update-course/:courseId", AuthMiddleware.verifyToken, InputValidatorMiddleware.validateCourseInput, AdminController.UpdateCourse)

adminRouter.delete("/delete-course/:courseId", AuthMiddleware.verifyToken, AdminController.DeleteCourse)   

export default adminRouter

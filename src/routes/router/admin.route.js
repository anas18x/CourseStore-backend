import {Router} from "express";
const adminRouter = Router()
import { AuthMiddleware, InputValidatorMiddleware, MulterMiddleware , AdminMiddleware } from "../../middlewares/index.js";
import { AdminController } from "../../controller/index.js";



adminRouter.get("/preview-all-courses", 
    AuthMiddleware.verifyToken, 
    AdminMiddleware.checkAdmin,
    AdminController.PreviewAllCourses)

adminRouter.get("/preview-course/:courseId", 
    AuthMiddleware.verifyToken, 
    AdminMiddleware.checkAdmin, 
    AdminController.PreviewCourseById)

adminRouter.post( "/add-course",
   AuthMiddleware.verifyToken,
   AdminMiddleware.checkAdmin,
   MulterMiddleware.upload,                       // FIRST → parse form-data
   InputValidatorMiddleware.validateCourseInput,  // THEN validate req.body
   AdminController.AddCourse
);

adminRouter.put("/update-course/:courseId", 
   AuthMiddleware.verifyToken, 
   AdminMiddleware.checkAdmin,
   MulterMiddleware.upload, 
   InputValidatorMiddleware.validateUpdateInput, 
   AdminController.UpdateCourse)

adminRouter.delete("/delete-course/:courseId", 
   AuthMiddleware.verifyToken, 
   AdminMiddleware.checkAdmin, 
   AdminController.DeleteCourse)   

export default adminRouter

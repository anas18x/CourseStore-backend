import { ErrorResponse, SuccessResponse } from "../utils/common/responseHandler.js"
import { StatusCodes } from "http-status-codes"
import { CourseService } from "../service/index.js";
import AppError from "../utils/error/AppError.js";



export async function PreviewAllCourses(req,res){
    try {
    const courses = await CourseService.getAllCoursesService()
    SuccessResponse(res,{courses},"courses fetched successfully",StatusCodes.OK)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}



export async function PreviewCourseById(req,res){
    try {
    const courseId = req.params.courseId;
    const course = await CourseService.getCourseByIdService(courseId)
    SuccessResponse(res,{course},"course fetched successfully",StatusCodes.OK)
    } catch (error) {
      throw new AppError(error.message, error.statusCode)
    }
}



export async function AddCourse(req,res){
    try {
    const {userId} = req.userInfo
    const {title,imageURL,description,price} = req.validatedData
    await CourseService.addCourseService(title,imageURL,description,price,userId)
    SuccessResponse(res,null,"course added successfully",StatusCodes.CREATED)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}



export async function UpdateCourse(){
  try{
    const {userId} = req.userInfo
    const courseId = req.params.courseId
    const {title,imageURL,description,price} = req.validatedData
    await CourseService.updateCourseService(courseId,title,imageURL,description,price,userId)
    SuccessResponse(res,null,"course updated successfully",StatusCodes.OK)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}


export async function DeleteCourse(){
  try{
    const courseId = req.params.courseId
    await CourseService.deleteCourseService(courseId)
    SuccessResponse(res,null,"course deleted successfully",StatusCodes.OK)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}



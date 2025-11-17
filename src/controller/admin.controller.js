import { ErrorResponse, SuccessResponse } from "../utils/common/responseHandler.js"
import { StatusCodes } from "http-status-codes"
import * as CourseService from "../service/course.service.js"
import { getUserFromToken } from "../utils/common/getuserFromToken.js";
import AppError from "../utils/error/AppError.js";

export async function AddCourse(req,res){
    try {
    const token = req.headers["accessToken"];
    if(!token) ErrorResponse(res,"Access token is missing",StatusCodes.UNAUTHORIZED)

    const userId = getUserFromToken(token)
    const {title,imageURL,description,price} = req.validatedData
    await CourseService.addCourseService(title,imageURL,description,price,userId)
    SuccessResponse(res,null,"course added successfully",StatusCodes.CREATED)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}



export async function GetAllCourses(req,res){
    try {
    const courses = await CourseService.getAllCoursesService()
    SuccessResponse(res,{courses},"courses fetched successfully",StatusCodes.OK)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}



export async function GetCourseById(req,res){
    try {
    const courseId = req.params.courseId;
    const course = await CourseService.getCourseByIdService(courseId)
    SuccessResponse(res,{course},"course fetched successfully",StatusCodes.OK)
    } catch (error) {
      throw new AppError(error.message, error.statusCode)
    }
}



import { ErrorResponse, SuccessResponse } from "../utils/common/responseHandler.js"
import { StatusCodes } from "http-status-codes"
import { CourseService } from "../service/index.js";
import AppError from "../utils/error/AppError.js";
import { CloudnaryService } from "../service/index.js";
import { CourseModel } from "../models/index.js";

export async function PreviewAllCourses(req,res){
    const {userId} = req.userInfo
    try {
    const courses = await CourseService.getAllCoursesService(userId)
    if(!courses || courses.length === 0){
      throw new AppError("no courses available", StatusCodes.NOT_FOUND);
    }
    SuccessResponse(res,{courses},"courses fetched successfully",StatusCodes.OK)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}



export async function PreviewCourseById(req,res){
    try {
    const courseId = req.params.courseId;
    const course = await CourseService.getCourseByIdService(courseId)
    if(!course){
      throw new AppError("course not found", StatusCodes.NOT_FOUND);
    }
    SuccessResponse(res,{course},"course fetched successfully",StatusCodes.OK)
    } catch (error) {
      throw new AppError(error.message, error.statusCode)
    }
}



export async function AddCourse(req,res){
    try {
    const {userId} = req.userInfo
    const {title,description,price} = req.validatedData
    const imageFilePath = req.files?.image?.[0]?.path;
    if (imageFilePath) {
      const cloudnaryRes = await CloudnaryService.uploadImage(imageFilePath);
      var imageURL = cloudnaryRes.secure_url
      var publicId = cloudnaryRes.public_id;
    } else{
      throw new AppError("Image file is required", StatusCodes.BAD_REQUEST);
    }

    await CourseService.addCourseService(title,imageURL,description,price,userId)
    SuccessResponse(res,null,"course added successfully",StatusCodes.CREATED)
  } catch (error) {
    if (publicId) {
        try {
            const uploadResult = await CloudnaryService.uploader.destroy(publicId);
            console.log("Deleted from Cloudinary:", uploadResult);
        } catch (deleteErr) {
            console.log("Cloudinary deletion failed:", deleteErr);
        }
    }
    throw new AppError(error.message, error.statusCode)
  }
}



export async function UpdateCourse(req,res){
  try{
    const courseId = req.params.courseId
    const {userId} = req.userInfo
    const {title,description,price} = req.validatedData

     // Ensuring course belongs to same Admin
    const course = await CourseModel.Course.findOne({
      _id: courseId,
      creatorId: userId
    });

    if (!course) {
    throw new AppError("Course not found or unauthorized", StatusCodes.NOT_FOUND);
  }
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    
    const imageFilePath = req.files?.image?.[0]?.path;
    if (imageFilePath) {
      const cloudnaryRes = await CloudnaryService.uploadImage(imageFilePath);
      var imageURL = cloudnaryRes.secure_url
      var publicId = cloudnaryRes.public_id;
      updateData.imageURL = imageURL;
    }
    
    await CourseService.updateCourseService(courseId, updateData, userId)
    SuccessResponse(res,null,"course updated successfully",StatusCodes.OK)

  } catch (error) {
    if (publicId) {
        try {
            const uploadResult = await CloudnaryService.uploader.destroy(publicId);
            console.log("Deleted from Cloudinary:", uploadResult);
        } catch (deleteErr) {
            console.log("Cloudinary deletion failed:", deleteErr);
        }
    }
    throw new AppError(error.message, error.statusCode)
  }
}


export async function DeleteCourse(req,res,next){
  try{
    const courseId = req.params.courseId
    const {userId} = req.userInfo
    await CourseService.deleteCourseService(courseId, userId)
    SuccessResponse(res,null,"course deleted successfully",StatusCodes.OK)
  } catch (error) {
    throw new AppError(error.message, error.statusCode)
  }
}



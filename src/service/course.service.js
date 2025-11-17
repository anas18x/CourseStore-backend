import { Course } from "../models/course.model.js";
import { CourseModel } from "../models/index.js";

export const addCourseService = async (title,imageURL,description,price,creatorId) => { 
    await CourseModel.Course.create({
        title,
        imageURL,
        description,
        price,
        creatorId
    })
} 



export const getAllCoursesService = async () => {
    return await CourseModel.Course.find({})
}


export const getCourseByIdService = async (courseId) => {
    return await CourseModel.Course.findById(courseId)
}
import { CourseModel } from "../models/index.js";



export const getAllCoursesService = async () => {
    return await CourseModel.Course.find({})
}


export const getCourseByIdService = async (courseId) => {
    return await CourseModel.Course.findById(courseId)
}


export const addCourseService = async (title,imageURL,description,price,creatorId) => { 
    await CourseModel.Course.create({
        title,
        imageURL,
        description,
        price,
        creatorId
    })
} 


export const updateCourseService = async (courseId,title,imageURL,description,price,creatorId) => {
    await CourseModel.Course.findByIdAndUpdate(courseId,{
        title,
        imageURL,
        description,
        price,
        creatorId
    })
}


export const deleteCourseService = async (courseId) => {
    await CourseModel.Course.findByIdAndDelete(courseId)
}

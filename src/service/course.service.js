import { CourseModel } from "../models/index.js";



export const getAllCoursesService = async (userId) => {
    return await CourseModel.Course.find({ creatorId: userId })
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

export const updateCourseService = async (courseId, updateData, creatorId) => {
   await CourseModel.Course.findOneAndUpdate(
    { _id: courseId, creatorId: creatorId },  
    { $set: updateData },                     
    { new: true }                             // return updated doc
  );
};


export const deleteCourseService = async (courseId, creatorId) => {
    await CourseModel.Course.findOneAndDelete({ _id: courseId, creatorId: creatorId });
}

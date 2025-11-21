import { CourseModel } from "../models/index.js";
import { PurchaseModel } from "../models/index.js";


export const getAllCourses = async () => {
   return await CourseModel.Course.find({});

}


export const getCourseById = async (courseId) => {
    return await CourseModel.Course.findById(courseId);
}


export const getMyCourses = async (userId) => {
   return await PurchaseModel.Purchase.find({userId}).populate('courseId');
}


export const purchaseCourse = async (userId, courseId) => {
    await PurchaseModel.Purchase.create({
        userId,
        courseId
    })
}
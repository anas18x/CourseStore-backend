import { SuccessResponse } from "../utils/common/responseHandler.js";
import AppError from "../utils/error/AppError.js";
import { UserService } from "../service/index.js";
import { PurchaseModel } from "../models/index.js";
import { StatusCodes } from "http-status-codes";


/**
 * Get My Courses
 *
 * Returns the list of courses purchased/enrolled by the authenticated user.
 * - Requires authentication; expects `req.userInfo.userId`.
 * - Responds with 200 and a list of courses.
 *
 * @param {import('express').Request & { userInfo?: { userId: string } }} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export async function GetMyCourses(req, res) {
    try {
        const userId = req.userInfo.userId;
        const myCourses = await UserService.getMyCourses(userId);
        if(!myCourses || myCourses.length === 0){
            throw new AppError("no courses found", StatusCodes.NOT_FOUND);
        }
        SuccessResponse(res, { myCourses }, "successfully fetched my courses", StatusCodes.OK);
    } catch (error) {
        throw new AppError(error.message, error.statusCode);
    }
}


/**
 * Get All Courses
 *
 * Fetches all available courses for browsing.
 * - Responds with 200 on success.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export async function GetAllCourses(req, res) {
    try {
        const courses = await UserService.getAllCourses();
        if(!courses || courses.length === 0){
            throw new AppError("no courses available", StatusCodes.NOT_FOUND);
        }
        SuccessResponse(res, { courses }, "successfully fetched all courses", StatusCodes.OK);
    } catch (error) {
        throw new AppError(error.message, error.statusCode);
    }
}


/**
 * Get Course By Id
 *
 * Fetches details for a specific course by `:courseId`.
 * - Responds with 200 on success.
 *
 * @param {import('express').Request & { params: { courseId: string } }} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export async function GetCourseById(req, res) {
    try {
        const courseId = req.params.courseId;
        const course = await UserService.getCourseById(courseId);
        if(!course){
        throw new AppError("course not found", StatusCodes.NOT_FOUND);
        }
        SuccessResponse(res, { course }, " course fetched successfully", StatusCodes.OK);
    } catch (error) {
        throw new AppError(error.message, error.statusCode);
    }
}


/**
 * Purchase Course
 *
 * Initiates a purchase for the specified course for the authenticated user.
 * - Requires authentication; expects `req.userInfo.userId`.
 * - Typically should be a POST to avoid side-effects on GET.
 *
 * @param {import('express').Request & { userInfo?: { userId: string }, params?: { courseId?: string } }} req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 */
export async function PurchaseCourse(req, res ) {
    try {
        const userId = req.userInfo.userId;
        const courseId =  req.params.courseId;
        const alreadyPurchased = await PurchaseModel.Purchase.findOne({ userId, courseId });
        if (alreadyPurchased) {
          throw new AppError("You already purchased this course", StatusCodes.NOT_ACCEPTABLE);
        }

        const purchase = await UserService.purchaseCourse(userId, courseId);
        if(!purchase){
            throw new AppError("purchase failed", StatusCodes.INTERNAL_SERVER_ERROR);
        }
        SuccessResponse(res, null, "course purchased successfully", StatusCodes.OK);
    } catch (error) {
        throw new AppError(error.message, error.statusCode);
    }
}
import { get } from "mongoose";
import { getAllCoursesService } from "../service/course.service";
import { SuccessResponse } from "../utils/common/responseHandler";
import AppError from "../utils/error/AppError";
import { UserService } from "../service";


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
        await UserService.getAllCourses();
        SuccessResponse(res, null, "successfully fetched all courses", 200);
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
        await UserService.getCourseById(courseId);
        SuccessResponse(res, null, " course fetched successfully", 200);
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

}
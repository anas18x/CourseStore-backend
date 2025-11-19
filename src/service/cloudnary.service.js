import {v2 as cloudinary} from "cloudinary"
import { ENV } from "../config/ENV.config.js";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/error/AppError.js";


cloudinary.config({
    cloud_name : ENV.CLOUDINARY_CLOUD_NAME,
    api_key : ENV.CLOUDINARY_API_KEY,
    api_secret : ENV.CLOUDINARY_API_SECRET
})


export const uploadImage = async (filePath) => {
  try {
    if(!filePath) throw new AppError("File path is required", StatusCodes.BAD_REQUEST);

    const response = await cloudinary.uploader.upload(filePath, {
        folder: "course_images",         // specify a folder in Cloudinary
        resource_type: "auto"
    })

    fs.unlinkSync(filePath)
    return response;

  } catch (error) {
    fs.unlinkSync(filePath); // delete the file in case of error
    throw new AppError("Cloudinary upload failed", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

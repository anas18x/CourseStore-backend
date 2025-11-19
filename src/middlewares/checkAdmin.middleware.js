import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/responseHandler.js";

export const checkAdmin = (req, res, next) => {
  const { role } = req.userInfo;
  if (role !== "admin") {
   return ErrorResponse(res, "Access denied. Admins only.", StatusCodes.FORBIDDEN);
  }

  next();
};
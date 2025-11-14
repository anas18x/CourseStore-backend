import { StatusCodes,ReasonPhrases } from "http-status-codes"

/**
 * 
 * @param {Response Object} res 
 * @param {Actual Data} data 
 * @param {Sucess message} message 
 * @param {Startus Codes} statusCode 
 * @returns 
 */

export const SuccessResponse = (
  res,
  data,
  message = ReasonPhrases.OK,
  statusCode = StatusCodes.OK
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

/**
 * 
 * @param {Response Object} res 
 * @param {Error Message} message 
 * @param {StatusCodes} statusCode 
 * @returns 
 */

export const ErrorResponse = (
  res,
  message = ReasonPhrases.INTERNAL_SERVER_ERROR, 
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

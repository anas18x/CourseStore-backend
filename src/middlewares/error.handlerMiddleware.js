import { ErrorResponse } from "../utils/common/responseHandler.js";


  const  errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error'; 
    ErrorResponse(res, message, statusCode);
}

export default errorMiddleware
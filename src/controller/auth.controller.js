import { ErrorResponse, SuccessResponse } from "../utils/common/responseHandler.js"
import { StatusCodes } from "http-status-codes"
import  AppError from "../utils/error/AppError.js"
import { Auth } from "../service/index.js"
import { generateAccessToken } from "../utils/common/generateToken.js"
import { ENV } from "../config/ENV.config.js"
import jwt from "jsonwebtoken"

/**
 * User SignUp Controller
 *
 * Creates a new user in the database.
 * - Expects input pre-validated by middleware and available on `req.validatedData`.
 * - Hashes the provided password before persisting.
 * - Responds with 201 on success or 409 when the user already exists.
 *
 * Contract
 * - Input: req.validatedData = { userName: string, email: string, password: string, role?: string }
 * - Output: writes HTTP response via `res` (no body returned on success in current implementation)
 * - Errors: returns 409 when user already exists (caught database/unique constraint error)
 *
 * @param {import('express').Request & { validatedData: { userName: string, email: string, password: string, role?: string } }} req - Express request with validatedData
 * @param {import('express').Response} res - Express response
 * @returns {Promise<void>} resolves after sending an HTTP response (or no response on current success path)
 *
 * @example
 * // req.validatedData set by validation middleware
 * req.validatedData = { userName: 'alice', email: 'alice@example.com', password: 's3cret', role: 'student' }
 */

export async function handleSignUp(req, res) {
  const { userName, email, password, role } = req.validatedData

  try {
    await Auth.signUpService(userName,email,password,role)
    SuccessResponse(res, null, "SignedUp successfully", StatusCodes.CREATED)
  } catch (error) {
    throw new AppError("user already exists", StatusCodes.CONFLICT);
  }
}



/**
 * User SignIn Controller
 *
 * Authenticates a user using pre-validated credentials found on `req.validatedData`.
 * Current implementation is partial: it prepares to locate the user but does not complete
 * password verification or token generation. The JSDoc documents expected behavior and
 * how to finish the implementation.
 *
 * Expected Contract
 * - Input: req.validatedData = { email: string, password: string, role?: string }
 * - Behavior (intended):
 *   1. Find user by email (and optionally role).
 *   2. If user not found -> respond 401 Unauthorized.
 *   3. Compare supplied password with stored hash using `bcrypt.compare`.
 *   4. On success -> issue session/token and respond 200 with user info / token.
 *   5. On failure -> respond 401 Unauthorized.
 *
 * Notes: implementers should ensure timing-safe comparisons and avoid leaking whether
 * the email exists in the system (to reduce enumeration attacks).
 *
 * @param {import('express').Request & { validatedData: { email: string, password: string, role?: string } }} req - Express request with validatedData
 * @param {import('express').Response} res - Express response
 * @returns {Promise<void>} resolves after sending an HTTP response; current function is incomplete
 *
 * @example
 * // Minimal intended flow (to be implemented):
 * const user = await User.findOne({ email: req.validatedData.email })
 * if (!user) return res.status(401).json({ msg: 'invalid credentials' })
 * const ok = await bcrypt.compare(req.validatedData.password, user.password)
 * if (!ok) return res.status(401).json({ msg: 'invalid credentials' })
 * // generate token and respond
 */

export async function handleSignIn(req, res) {
  const { email, password} = req.validatedData

  try{
    const tokens = await Auth.signInService(email,password)
    const{accessToken, refreshToken} = tokens
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    SuccessResponse(res,null,"logged in successfully",StatusCodes.OK)

  } catch (error) {
     throw new AppError(error.message, error.statusCode);  
  }  
}



/**
 * Log Out
 *
 * Clears authentication cookies to terminate the session.
 * - Requires the user to be authenticated (middleware adds cookies to clear).
 * - Responds with 200 on success.
 *
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @returns {Promise<void>}
 */
export async function handleLogOut(req,res){
  try {
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    SuccessResponse(res,null,"logged out successfully",StatusCodes.OK)
  } catch (error) {
    throw new AppError("could not logout", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}



/**
 * Refresh Access Token
 *
 * Issues a new short-lived access token using a valid refresh token found in cookies.
 * - Expects cookie `refreshToken` to be present.
 * - Responds with 200 and sets a new `accessToken` cookie.
 * - Responds with 401 if refresh token is missing or invalid.
 *
 * @param {import('express').Request} req - Express request with cookies
 * @param {import('express').Response} res - Express response
 * @returns {Promise<void>}
 */
export async function Refresh_AccessToken(req,res){
  const refreshToken = req.cookies.refreshToken;
  if(!refreshToken){
    return ErrorResponse(res, "refresh token missing", StatusCodes.UNAUTHORIZED);
  }
  const decoded = jwt.verify(refreshToken, ENV.JWT_SECRET);
  if(!decoded){
    return ErrorResponse(res, "invalid refresh token", StatusCodes.UNAUTHORIZED);
  }

  try {
    const newAccessToken = generateAccessToken({userId: decoded.userId}, ENV.JWT_SECRET)
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    SuccessResponse(res,null, "new access token generated", StatusCodes.OK)
  } catch (error) {
    ErrorResponse(res, error.message, error.statusCode);
  }
}



/**
 * Reset Password
 *
 * Resets the authenticated user's password.
 * - Requires valid auth middleware to populate `req.userInfo.userId`.
 * - Expects body fields `{ CurrentPass: string, NewPass: string }`.
 * - Responds with 200 on successful reset.
 *
 * @param {import('express').Request & { userInfo: { userId: string } }} req - Request with authenticated user info
 * @param {import('express').Response} res - Express response
 * @returns {Promise<void>}
 */
export async function ResetPassword(req,res){
 try {
   const userId = req.userInfo.userId; 
   const {CurrentPass , NewPass} = req.body;
   await Auth.ResetPassword(userId,CurrentPass,NewPass)
   SuccessResponse(res,null,"password reset successful",StatusCodes.OK)
 } catch (error) {
    throw new AppError(error.message, error.statusCode);
 }
}
import { User } from "../models/User.models.js"
import bcrypt from "bcrypt"
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

export async function UserSignUp(req, res) {
  const { userName, email, password, role } = req.validatedData

  try {
    const encryptedPassword = await bcrypt.hash(password, 5)
    await User.create({
      userName: userName,
      email: email,
      password: encryptedPassword,
      role: role,
    })
    res.status(200).json({
        msg:"Signed up"
    })
  } catch (error) {
    res.status(409).json({
      msg: "user already exists",
    })
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

export async function UserSignIn(req, res) {
  const { email, password} = req.validatedData

  try{

    const findUser = await User.findOne({email})
    if(!findUser){
    return res.status(403).json({msg:"user doesnt exists"})
  }

  const passwordMatched = await bcrypt.compare(password,findUser.password)

  if(passwordMatched){
    const token =  jwt.sign({
        id: findUser._id,
    },ENV.JWT_SECRET)
    console.log(token)
    res.status(200).json({
       token
    })
  } else {
    res.status(401).json({
        msg:"invaid credentials"
    })
  }

  } catch (error) {
    return res.status(401).json({
        msg:"something went wrong"
    })
  }
  
}

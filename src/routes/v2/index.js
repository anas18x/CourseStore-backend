import { Router } from "express";
const router = Router()
import authRouter from "../router/auth.route.js";


router.use("/auth",authRouter)


export default router
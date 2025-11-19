import { Router } from "express";
const router = Router()
import authRouter from "../router/auth.route.js";
// import userRouter from "../router/user.route.js";
import adminRouter from "../router/admin.route.js";

router.use("/auth",authRouter)
router.use("/admin",adminRouter)
// router.use("/user",userRouter)

export default router
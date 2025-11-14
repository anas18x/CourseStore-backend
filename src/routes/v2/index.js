import { Router } from "express";
const router = Router()
import userRouter from "../router/user.route.js";

router.use("/user",userRouter)


export default router
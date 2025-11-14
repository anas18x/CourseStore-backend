import { Router } from "express";
const router = Router()
import V1Routes from "./v1/index.js";
import V2Routes from "./v2/index.js";

router.use("/v1",V1Routes)
router.use("/v2",V2Routes)


export default router
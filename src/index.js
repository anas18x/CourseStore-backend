import express from "express";
const app = express()
import { ENV } from "./config/ENV.config.js";
import _ from "./db.js"
import { ErrorMiddleware } from "./middlewares/index.js";
import APIRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";


const limiter = rateLimit({
    windowMs: 1000, 
    max: 10, 
    message: "Too many requests from this IP, please try again after 1 sec",
})

app.use(express.json())
app.use(cookieParser())
app.use(limiter)


app.use("/api", APIRoutes)



// GLOBAL CATCH
app.use(ErrorMiddleware.default)
app.listen(ENV.PORT, ()=> console.log("running on port",ENV.PORT))
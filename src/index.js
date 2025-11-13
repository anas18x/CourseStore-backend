import express from "express";
const app = express()
import { ENV } from "./config/ENV.config.js";
import _ from "./db.js"
import userRouter from "./routes/user.route.js"


app.use(express.json())

app.use("/api/v1/user", userRouter)



app.listen(ENV.PORT, ()=> console.log("running on port",ENV.PORT))
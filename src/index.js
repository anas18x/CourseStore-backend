import express from "express";
const app = express()
import { ENV } from "./config/ENV.config.js";
import _ from "./db.js"
import { ErrorMiddleware } from "./middlewares/index.js";
import APIRoutes from "./routes/index.js";


app.use(express.json())

app.use("/api", APIRoutes)




//Dont Write any routes below this line
// GLOBAL CATCH
app.use(ErrorMiddleware.default)
app.listen(ENV.PORT, ()=> console.log("running on port",ENV.PORT))